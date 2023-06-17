import { exec } from "node:child_process"
import { glob } from "glob"

type Challenge = { challenge: string; index: number }
function defineResults<T extends Record<string, Challenge[]>>(
  results: T
): { [K in keyof T]: Challenge[] } {
  return results
}
const results = defineResults({
  warm: [],
  easy: [],
  medium: [],
  hard: [],
  extreme: [],
})
type Diffculty = keyof typeof results
const selectedDifficulty = process.argv[2] as Diffculty | undefined

glob(`./playground/${selectedDifficulty ?? "**"}/*.ts`).then(async files => {
  await Promise.all(
    files
      .map(file => `./${file.replaceAll("\\", "/")}`)
      .map(async file => {
        const [difficulty, challenge, index] = getFileMeta(file)
        await new Promise(resolve => {
          exec(
            `tsc ${file} --noEmit --strict --skipLibCheck --incremental --tsBuildInfoFile "./.tsbuildcache"`,
            e => {
              if (e?.code) results[difficulty].push({ challenge, index })

              resolve(undefined)
            }
          )
        })
      })
  )

  Object.entries(results).forEach(([, result]) => {
    result.sort((a, b) => b.index - a.index)
  })
  console.log(results)
})

function getFileMeta(file: string): [difficulty: Diffculty, challenge: string, no: number] {
  const [, , diffculty, name] = file.split("/")
  return [
    diffculty as Diffculty,
    name.split(".")[0].match(/(?<=.+\-.+\-).+/)?.[0] ?? "Couldn't parse name",
    +(name.split(".")[0].match(/(.+?)\-/)?.[1] ?? Infinity) || Infinity,
  ]
}
