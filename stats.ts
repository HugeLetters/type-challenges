import { exec } from "node:child_process"
import { glob } from "glob"

const results = {
  warm: new Set<string>(),
  easy: new Set<string>(),
  medium: new Set<string>(),
  hard: new Set<string>(),
  extreme: new Set<string>(),
}
type Diffculty = keyof typeof results
const selectedDifficulty = process.argv[2] as Diffculty | undefined

glob(`./playground/${selectedDifficulty ?? "**"}/*.ts`).then(async files => {
  await Promise.all(
    files
      .map(file => `./${file.replaceAll("\\", "/")}`)
      .map(async file => {
        const [difficulty, challenge] = getFileMeta(file)
        await new Promise(resolve => {
          exec(
            `tsc ${file} --noEmit --strict --skipLibCheck --incremental --tsBuildInfoFile "./.tsbuildcache"`,
            e => {
              if (e?.code) results[difficulty].add(challenge)

              resolve(undefined)
            }
          )
        })  
      })
  )
  console.log(selectedDifficulty ? results[selectedDifficulty] : results)
})

function getFileMeta(file: string): [difficulty: Diffculty, challenge: string] {
  const [, , diffculty, name] = file.split("/")
  return [
    diffculty as Diffculty,
    name.split(".")[0].match(/(?<=.+\-.+\-).+/)?.[0] ?? "Couldn't parse name",
  ]
}
