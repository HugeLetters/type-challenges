/*
  476 - Sum
  -------
  by null (@uid11) #extreme #math #template-literal

  ### Question

  Implement a type `Sum<A, B>` that summing two non-negative integers and returns the sum as a string. Numbers can be specified as a string, number, or bigint.

  For example,

  ```ts
  type T0 = Sum<2, 3> // '5'
  type T1 = Sum<'13', '21'> // '34'
  type T2 = Sum<'328', 7> // '335'
  type T3 = Sum<1_000_000_000_000n, '123'> // '1000000000123'
  ```

  > View on GitHub: https://tsch.js.org/476
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

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from "@type-challenges/utils"

type cases = [
  Expect<Equal<Sum<2, 3>, "5">>,
  Expect<Equal<Sum<"13", "21">, "34">>,
  Expect<Equal<Sum<"328", 7>, "335">>,
  Expect<Equal<Sum<1_000_000_000_000n, "123">, "1000000000123">>,
  Expect<Equal<Sum<9999, 1>, "10000">>,
  Expect<Equal<Sum<4325234, "39532">, "4364766">>,
  Expect<Equal<Sum<728, 0>, "728">>,
  Expect<Equal<Sum<"0", 213>, "213">>,
  Expect<Equal<Sum<0, "0">, "0">>
]

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/476/answer
  > View solutions: https://tsch.js.org/476/solutions
  > More Challenges: https://tsch.js.org
*/
