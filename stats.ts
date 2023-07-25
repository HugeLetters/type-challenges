import { exec } from 'node:child_process';
import fs from 'node:fs/promises';
import { glob } from 'glob';
import task from 'tasuku';

type Challenge = { challenge: string; index: number };
function defineResults<T extends Record<string, Challenge[]>>(
  results: T
): { [K in keyof T]: Challenge[] } {
  return results;
}
const results = defineResults({
  warm: [],
  easy: [],
  medium: [],
  hard: [],
  extreme: [],
});

type Diffculty = keyof typeof results;
const selectedDifficulty = process.argv[2] as Diffculty | undefined;

const tempTSConfigPath = 'tsconfig.stats.json';
const TSConfig = {
  extends: './tsconfig.json',
  compilerOptions: {
    noEmit: true,
    strict: true,
    skipLibCheck: true,
    incremental: true,
    tsBuildInfoFile: '.tsbuildcache',
    noUnusedParameters: false,
  },
  include: [`./playground/${selectedDifficulty ?? '**'}/*.ts`],
};

async function main() {
  const { result: TSCStdout } = await task(
    `Checking challenges${selectedDifficulty ? ` of difficulty ${selectedDifficulty}` : ''}`,
    async ({ task }) => {
      await task('Creating temporary tsconfig file', async ({ setTitle }) => {
        await fs.writeFile(tempTSConfigPath, JSON.stringify(TSConfig));
        setTitle(`Temporary config created at ${tempTSConfigPath}`);
      });

      return task('Checking challenges', async () => checkChallenges())
        .then(({ result }) => result)
        .finally(() =>
          task('Deleting temporary tsconfig file', async () => fs.unlink(tempTSConfigPath))
        );
    }
  );

  await task('Parsing the results', async () => {
    const unsolvedChallenges = parseTSCStdout(TSCStdout);
    for (const [difficulty, challenge, index] of unsolvedChallenges) {
      results[difficulty].push({ challenge, index });
    }
  });

  outputResults();
}

function outputResults() {
  task('Showing results', async () => {
    Object.values(results).forEach(result => {
      result.sort((a, b) => b.index - a.index);
    });
    task.group(task =>
      Object.entries(results)
        .filter(([diffculty]) => !selectedDifficulty || diffculty === selectedDifficulty)
        .map(([difficulty, results]) => {
          return task(difficulty, async ({ setOutput, setStatus }) => {
            setOutput(
              results.reduce((output, result) => {
                return `${output}\n${result.challenge} - ${result.index}`;
              }, '')
            );

            const challengeCount = (await glob(`./playground/${difficulty}/*.ts`)).length;
            setStatus(`${(100 * (1 - results.length / challengeCount)).toFixed(2)}%`);
          });
        })
    );
  });
}

function getFileMeta(file: string): [difficulty: Diffculty, challenge: string, no: number] {
  const [, diffculty, name] = file.split('/');
  return [
    diffculty as Diffculty,
    name.split('.')[0].match(/(?<=.+\-.+\-).+/)?.[0] ?? "Couldn't parse name",
    +(name.split('.')[0].match(/(.+?)\-/)?.[1] ?? Infinity) || Infinity,
  ];
}

function checkChallenges() {
  return new Promise<string>(resolve => {
    const command = `tsc --project ${tempTSConfigPath}`;
    exec(command, (_, stdout) => resolve(stdout));
  });
}

function parseTSCStdout(stdout: string) {
  return [...new Set(stdout.match(/.+\.ts/g))].map(getFileMeta);
}

main();
