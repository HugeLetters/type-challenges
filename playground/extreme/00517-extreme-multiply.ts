/*
  517 - Multiply
  -------
  by null (@uid11) #extreme #math #template-literal

  ### Question

  **This challenge continues from [476 - Sum](https://tsch.js.org/476), it is recommended that you finish that one first, and modify your code based on it to start this challenge.**

  Implement a type `Multiply<A, B>` that multiplies two non-negative integers and returns their product as a string. Numbers can be specified as string, number, or bigint.

  For example,

  ```ts
  type T0 = Multiply<2, 3> // '6'
  type T1 = Multiply<3, '5'> // '15'
  type T2 = Multiply<'4', 10> // '40'
  type T3 = Multiply<0, 16> // '0'
  type T4 = Multiply<'13', '21'> // '273'
  type T5 = Multiply<'43423', 321543n> // '13962361689'
  ```

  > View on GitHub: https://tsch.js.org/517
*/

/* _____________ Your Code Here _____________ */
type Numerish = string | number | bigint
type TupleOFLength<N, T extends any[] = []> = `${T["length"]}` extends N
  ? T
  : TupleOFLength<N, [1, ...T]>
type SumSmall<A, B> = `${[...TupleOFLength<A>, ...TupleOFLength<B>]["length"] & number}`
type SplitDigits<T extends Numerish> = `${T}` extends `${infer F}${infer R}`
  ? [F, ...SplitDigits<R>]
  : []
type SumTuples<A, B> = A extends [...infer AR, infer AL]
  ? B extends [...infer BR, infer BL]
    ? [...SumTuples<AR, BR>, SumSmall<AL, BL>]
    : A
  : B
type TupleCarryOver<T> = T extends [...infer R, infer P, infer L]
  ? L extends `1${infer D extends number}`
    ? [...TupleCarryOver<[...R, SumSmall<P, `1`>]>, `${D}`]
    : [...TupleCarryOver<[...R, P]>, L]
  : T
type Join<T> = T extends [infer F, ...infer R] ? `${F & string}${Join<R>}` : ""
type Sum<A extends Numerish, B extends Numerish> = Join<
  TupleCarryOver<SumTuples<SplitDigits<A>, SplitDigits<B>>>
>
type AccumTuple<T> = T extends [infer F extends Numerish, ...infer R] ? Sum<F, AccumTuple<R>> : 0

type TrailZeroes<N extends string, T extends any[] = TupleOFLength<N>> = T extends [any, ...infer R]
  ? `0${TrailZeroes<N, R>}`
  : ""
type MultiplySmall<
  A extends string,
  B extends string,
  T extends any[] = [],
  I extends any[][] = [],
  L extends any[] = TupleOFLength<A>
> = `${T["length"]}` extends B ? `${I["length"]}` : MultiplySmall<A, B, [...T, 1], [...I, ...L], L>
type MultiplyTuples<A extends string[], B extends string[]> = AccumTuple<{
  [KA in keyof A]: AccumTuple<{
    [KB in keyof B]: "0" extends B[KB] | A[KA]
      ? "0"
      : `${MultiplySmall<A[KA], B[KB]>}${TrailZeroes<`${KB}`>}${TrailZeroes<`${KA}`>}`
  }>
}>
type SplitDigitsReversed<T extends Numerish> = `${T}` extends `${infer F}${infer R}`
  ? [...SplitDigitsReversed<R>, F]
  : []

type Multiply<A extends Numerish, B extends Numerish> = MultiplyTuples<
  SplitDigitsReversed<A>,
  SplitDigitsReversed<B>
>

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from "@type-challenges/utils"

type cases = [
  Expect<Equal<Multiply<2, 3>, "6">>,
  Expect<Equal<Multiply<3, "5">, "15">>,
  Expect<Equal<Multiply<"4", 10>, "40">>,
  Expect<Equal<Multiply<0, 16>, "0">>,
  Expect<Equal<Multiply<"13", "21">, "273">>,
  Expect<Equal<Multiply<"43423", 321543n>, "13962361689">>,
  Expect<Equal<Multiply<9999, 1>, "9999">>,
  Expect<Equal<Multiply<4325234, "39532">, "170985150488">>,
  Expect<Equal<Multiply<100_000n, "1">, "100000">>,
  Expect<Equal<Multiply<259, 9125385>, "2363474715">>,
  Expect<Equal<Multiply<9, 99>, "891">>,
  Expect<Equal<Multiply<315, "100">, "31500">>,
  Expect<Equal<Multiply<11n, 13n>, "143">>,
  Expect<Equal<Multiply<728, 0>, "0">>,
  Expect<Equal<Multiply<"0", 213>, "0">>,
  Expect<Equal<Multiply<0, "0">, "0">>
]

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/517/answer
  > View solutions: https://tsch.js.org/517/solutions
  > More Challenges: https://tsch.js.org
*/
