### What is this fork for?

This is my personal fork to keep track of progress.

### Scripts

`npm run stats` or `pnpm stats` is a simple(and quite slow) script which shows uncompleted challenges.
It also accepts difficulty string to filter out challenges.

<p align='center'>
  <img src='./screenshots/logo.svg' width='400'/>
</p>

<p align='center'>Collection of TypeScript type challenges</p>

<p align='center'>
  <a href='https://discord.gg/UgKBCq9'>
    <img src='https://img.shields.io/badge/-Discord-yellowgreen?logo=discord&logoColor=white&color=7289da'/>
  </a>
  <a href='https://www.typescriptlang.org/play?install-plugin=%40type-challenges%2Fplayground-plugin'>
    <img src='https://img.shields.io/badge/Playground-143?logo=typescript&color=3178C6&logoColor=fff' />
  </a>
</p>

<br>

<p align='center'>
  English | <a href='./README.zh-CN.md'>简体中文</a> | <a href='./README.ja.md'>日本語</a> | <a href='./README.ko.md'>한국어</a>
</p>

## Intro

<p align='center'>
  <del><em>by the power of TypeScript's well-known <a href="https://github.com/microsoft/TypeScript/issues/14833">Turing Completed</a> type system</em></del>
</p>

High-quality types can help improve projects' maintainability while avoiding potential bugs.

There are a bunch of awesome type utility libraries that may boost your works on types, like [ts-toolbelt](https://github.com/millsp/ts-toolbelt), [utility-types](https://github.com/piotrwitek/utility-types), [SimplyTyped](https://github.com/andnp/SimplyTyped), etc., which you can already use.

This project is aimed at helping you better understand how the type system works, writing your own utilities, or just having fun with the challenges. We are also trying to form a community where you can ask questions and get answers you have faced in the real world - they may become part of the challenges!

## Challenges

> Click the following badges to see details of the challenges.

> **Note**: Challenges work in the [strict mode](https://www.typescriptlang.org/tsconfig#strict).

<br>

<!--challenges-start-->
<img src="https://img.shields.io/badge/medium-3-d9901a" alt="3"/><br><a href="./questions/08640-medium-number-range/README.md" target="_blank"><img src="https://img.shields.io/badge/-8640%E3%83%BBundefined-d9901a" alt="8640・undefined"/></a> <a href="./questions/09989-medium-tong-ji-shu-zu-zhong-de-yuan-su-ge-shu/README.md" target="_blank"><img src="https://img.shields.io/badge/-9989%E3%83%BBCount%20Element%20Number%20To%20Object-d9901a" alt="9989・Count Element Number To Object"/></a> <a href="./questions/28333-medium-public-type/README.md" target="_blank"><img src="https://img.shields.io/badge/-28333%E3%83%BBPublic%20Type-d9901a" alt="28333・Public Type"/></a> <br><br><img src="https://img.shields.io/badge/hard-1-de3d37" alt="1"/><br><a href="./questions/02857-hard-isrequiredkey/README.md" target="_blank"><img src="https://img.shields.io/badge/-2857%E3%83%BBundefined-de3d37" alt="2857・undefined"/></a> <br><details><summary>By Tags</summary><br><table><tbody><tr><td><img src="https://img.shields.io/badge/-%23object--keys-999" alt="#object-keys"/></td><td><a href="./questions/28333-medium-public-type/README.md" target="_blank"><img src="https://img.shields.io/badge/-28333%E3%83%BBPublic%20Type-d9901a" alt="28333・Public Type"/></a> </td></tr><tr><td><code>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</code></td><td></td></tr></tbody></table></details><br><details><summary>By Plain Text</summary><br><h3>medium (3)</h3><ul><li><a href="./questions/08640-medium-number-range/README.md" target="_blank">8640・undefined</a> </li><li><a href="./questions/09989-medium-tong-ji-shu-zu-zhong-de-yuan-su-ge-shu/README.md" target="_blank">9989・Count Element Number To Object</a> </li><li><a href="./questions/28333-medium-public-type/README.md" target="_blank">28333・Public Type</a> </li></ul><h3>hard (1)</h3><ul><li><a href="./questions/02857-hard-isrequiredkey/README.md" target="_blank">2857・undefined</a> </li></ul></details><br>
<!--challenges-end-->

> ✨ [Upcoming challenges](https://github.com/type-challenges/type-challenges/issues?q=is%3Aissue+is%3Aopen+label%3Anew-challenge)

> 🔥 Start the challenge in [TypeScript Playground](https://www.typescriptlang.org/play?install-plugin=%40type-challenges%2Fplayground-plugin)

> 🚀 Start the challenge locally in [your IDE or text editor with TypeScript language support](#play-locally)

> ⚡️ Start the challenge in [VS Code Extension](https://marketplace.visualstudio.com/items?itemName=YRM.type-challenges)

## Recommended Readings

### Official

- [The TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)

  - [Unions and Intersection Types](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#union-types)
  - [Literal Types](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#literal-types)
  - [Utility Types](https://www.typescriptlang.org/docs/handbook/utility-types.html)
  - [Advanced Types](https://www.typescriptlang.org/docs/handbook/2/types-from-types.html)

- [The New Handbook](https://github.com/microsoft/TypeScript-Website/tree/v2/packages/documentation/copy/en/handbook-v2)

### Articles

- [Learn Advanced TypeScript Types](https://medium.com/free-code-camp/typescript-curry-ramda-types-f747e99744ab)
- [The Art of Type Programming](https://mistlog.medium.com/the-art-of-type-programming-cfd933bdfff7)
- [Type Query: jQuery Style Type Manipulation](https://mistlog.medium.com/type-query-jquery-style-type-manipulation-497ce26d93f)
- [TypeScript Deep Dive](https://basarat.gitbook.io/typescript/)

### Talks

- [Type Level Programming in Typescript](https://www.youtube.com/watch?reload=9&v=vGVvJuazs84)

### Projects / Solutions

- [Type Gymnastics](https://github.com/g-plane/type-gymnastics)
- [Type Challenges Solutions](https://github.com/ghaiklor/type-challenges-solutions)
- [TypeType Examples](https://github.com/mistlog/typetype-examples)

### Books

- [Effective TypeScript](https://effectivetypescript.com/)
- [Learning TypeScript](https://www.learningtypescript.com/)

## How to Contribute

There are several ways you can contribute to this project

- Share your answers / solutions
- Propose new challenges
- Add more test cases to the existing challenges
- Provide learning resources or ideas of how to solve challenges
- Share the problems you have faced in real-world projects, regardless you having the solution or not - the community would help you as well
- Help with others by discussion in issues
- Contribute the infra of this project [TODOs.md](./TODOs.md)

Just [open an issue](https://github.com/type-challenges/type-challenges/issues/new/choose) and choose the corresponding template. Thanks!

## Play Locally

You can build the challenges and play locally using your preferred IDE or text editor with TypeScript language support.

To do that, you will need the latest version of [Node.js](https://nodejs.org/) and [pnpm](https://pnpm.io/) installed.

After cloning the repo, installed the dependencies by:

```bash
pnpm install
```

Then and run the `generate` script:

```bash
pnpm generate
```

It will prompt you to select the desired language, then you can find the generated challenges in the `./playground` folder.

Later if you want to update playground while keeping your changes:

```bash
pnpm generate --keep-changes
```

OR

```bash
pnpm generate -K
```

## Thanks

This project was born from solving real-world types problem with [@hardfist](https://github.com/hardfist) and [@MeCKodo](https://github.com/MeCKodo). And great thanks to [@sinoon](https://github.com/sinoon) who contributed a lot while giving early feedback on this project.

### Inspired by

- [piotrwitek/utility-types](https://github.com/piotrwitek/utility-types)
- [psmyrdek/typescript-challenges](https://github.com/psmyrdek/typescript-challenges)
- [andnp/SimplyTyped](https://github.com/andnp/SimplyTyped)

### [Contributors](https://github.com/type-challenges/type-challenges/graphs/contributors)

![Contributors](https://contrib.rocks/image?repo=type-challenges/type-challenges)

## License

MIT
