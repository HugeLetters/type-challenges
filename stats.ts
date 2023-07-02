import { exec } from "node:child_process"
import { glob } from "glob"
import task from "tasuku"

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
const concurrentChecks = 9 // change this depending on the height of your terminal window if you want it to look pretty

async function main() {
  const { files, fileCount } = await getFiles()

  await task("Checking challenges", async ({ setStatus }) => {
    let progress = -1
    function incProgress() {
      setStatus(`${((100 * ++progress) / fileCount).toFixed(2)}%`)
    }
    incProgress()

    for (const filesChunk of files) {
      await task
        .group(
          task =>
            filesChunk.map(file => {
              const [difficulty, challenge, index] = getFileMeta(file)

              return task(
                `Checking challenge ${challenge}(${index})${
                  !selectedDifficulty ? ` of diffculty ${difficulty}` : ""
                }`,
                async ({ setError }) => {
                  const isSolved = await checkChallenge(file)
                  incProgress()
                  if (isSolved) return

                  results[difficulty].push({ challenge, index })
                  return setError()
                }
              )
            }),
          { stopOnError: false, concurrency: concurrentChecks }
        )
        .then(({ clear }) => clear())
    }
  })

  outputResults()
}

function getFiles() {
  return task(
    `Getting challenge list${selectedDifficulty ? ` of difficulty ${selectedDifficulty}` : ""}`,
    async () => glob(`./playground/${selectedDifficulty ?? "**"}/*.ts`)
  ).then(({ result: files }) => ({
    files: chunk(
      files.map(file => `./${file.replaceAll("\\", "/")}`),
      concurrentChecks
    ),
    fileCount: files.length,
  }))
}

function outputResults() {
  task("Showing results", async () => {
    Object.values(results).forEach(result => {
      result.sort((a, b) => b.index - a.index)
    })
    task.group(task =>
      Object.entries(results)
        .filter(([diffculty]) => !selectedDifficulty || diffculty === selectedDifficulty)
        .map(([difficulty, results]) => {
          return task(difficulty, async ({ setOutput, setStatus }) => {
            setOutput(
              results.reduce((output, result) => {
                return `${output}\n${result.challenge} - ${result.index}`
              }, "")
            )

            const challengeCount = (await glob(`./playground/${difficulty}/*.ts`)).length
            setStatus(`${(100 * (1 - results.length / challengeCount)).toFixed(2)}%`)
          })
        })
    )
  })
}

function getFileMeta(file: string): [difficulty: Diffculty, challenge: string, no: number] {
  const [, , diffculty, name] = file.split("/")
  return [
    diffculty as Diffculty,
    name.split(".")[0].match(/(?<=.+\-.+\-).+/)?.[0] ?? "Couldn't parse name",
    +(name.split(".")[0].match(/(.+?)\-/)?.[1] ?? Infinity) || Infinity,
  ]
}

async function checkChallenge(file: string) {
  return await new Promise<boolean>(resolve => {
    exec(
      `tsc ${file} --noEmit --strict --skipLibCheck --incremental --tsBuildInfoFile "./.tsbuildcache"`,
      e => resolve(!e || !e.code)
    )
  })
}

function chunk<T>(array: T[], size: number) {
  const chunks: T[][] = []
  for (let i = 0; i < array.length; i += size) chunks.push(array.slice(i, i + size))
  return chunks
}

main()
