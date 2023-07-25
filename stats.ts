import checkbox from '@inquirer/checkbox';
import { glob } from 'glob';
import { exec } from 'node:child_process';
import fs from 'node:fs/promises';
import task from 'tasuku';
import { type Difficulty as NativeDifficulty } from './scripts/types';

type Difficulty = Exclude<NativeDifficulty, 'pending'>;
type Challenge = { challenge: string; index: number };
const results: Record<Difficulty, Challenge[]> = {
  warm: [],
  easy: [],
  medium: [],
  hard: [],
  extreme: [],
};

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
};

async function main() {
  const selectedDifficulties = await checkbox({
    choices: Object.keys(results).map(difficulty => ({
      value: difficulty as Difficulty,
      name: ` ${capitalize(difficulty)}`,
    })),
    message: 'Which difficulties would you like to check?',
  }).then(selection => (selection.length ? selection : (Object.keys(results) as Difficulty[])));

  const { result: TSCStdout } = await task('Checking challenges', async ({ task }) => {
    await task(`Creating temporary tsconfig file at ${tempTSConfigPath}`, async () =>
      fs.writeFile(
        tempTSConfigPath,
        JSON.stringify(
          Object.assign(TSConfig, {
            include: selectedDifficulties.map(difficulty => `./playground/${difficulty}/*.ts`),
          })
        )
      )
    );

    return task('Type-checking the files', async () => checkChallenges())
      .then(({ result }) => result)
      .finally(() =>
        task('Deleting temporary tsconfig file', async () => fs.unlink(tempTSConfigPath))
      );
  });

  await task('Parsing the results', async () => {
    const unsolvedChallenges = parseTSCStdout(TSCStdout);
    for (const [difficulty, challenge, index] of unsolvedChallenges) {
      results[difficulty].push({ challenge, index });
    }
  });

  const output = formatResults(selectedDifficulties);
  task.group(task =>
    output.map(([difficulty, challenges, count]) =>
      task(`${capitalize(difficulty)} challenges progress`, async ({ setOutput, setStatus }) => {
        setOutput(challenges);
        const challengeCount = (await glob(`./playground/${difficulty}/*.ts`)).length;
        setStatus(`${(100 * (1 - count / challengeCount)).toFixed(2)}%`);
      })
    )
  );
}

function formatResults(selectetedDifficulties: Difficulty[]) {
  return Object.entries(results)
    .filter(([diffculty]) => selectetedDifficulties.includes(diffculty as Difficulty))
    .map(
      ([diffculty, result]) =>
        [
          diffculty,
          result
            .sort((a, b) => b.index - a.index)
            .reduce((output, result) => `${output}\n${result.challenge} - ${result.index}`, ''),
          result.length,
        ] as const
    );
}

function parseTSCStdout(stdout: string) {
  return [...new Set(stdout.match(/.+\.ts/g))].map(getFileMeta);
}

function getFileMeta(file: string): [difficulty: Difficulty, challenge: string, no: number] {
  const [, diffculty, name] = file.split('/');
  return [
    diffculty as Difficulty,
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

function capitalize(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

main();
