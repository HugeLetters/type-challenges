/*
  4425 - Greater Than
  -------
  by ch3cknull (@ch3cknull) #medium #array

  ### Question

  In This Challenge, You should implement a type `GreaterThan<T, U>` like `T > U`

  Negative numbers do not need to be considered.

  For example

  ```ts
  GreaterThan<2, 1> //should be true
  GreaterThan<1, 1> //should be false
  GreaterThan<10, 100> //should be false
  GreaterThan<111, 11> //should be true
  ```

  Good Luck!

  > View on GitHub: https://tsch.js.org/4425
*/

/* _____________ Your Code Here _____________ */

type NumberToTuple<N extends number, T extends readonly 1[] = []> = T["length"] extends N
  ? T
  : NumberToTuple<N, [...T, 1]>
type GreaterThan_Tuple<T extends number, U extends number> = NumberToTuple<T> extends [
  1,
  ...any[],
  ...NumberToTuple<U>
]
  ? true
  : false

type _SplitNumber<S extends string> = `${S}` extends `${infer F extends number}${infer R}`
  ? [F, ..._SplitNumber<R>]
  : []
type SplitNumber<T extends number> = _SplitNumber<`${T}`>

type GreaterThan_Digits<T extends number[], U extends number[]> = [T, U] extends [
  [infer FT extends number, ...infer RT extends number[]],
  [infer FU extends number, ...infer RU extends number[]]
]
  ? GreaterThan_Tuple<FT, FU> extends true
    ? true
    : GreaterThan_Digits<RT, RU>
  : false

type GreaterThan<
  T extends number,
  U extends number,
  ST extends SplitNumber<T> = SplitNumber<T>,
  SU extends SplitNumber<U> = SplitNumber<U>
> = ST["length"] extends SU["length"]
  ? GreaterThan_Digits<ST, SU>
  : GreaterThan_Tuple<ST["length"], SU["length"]>

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from "@type-challenges/utils"

type cases = [
  Expect<Equal<GreaterThan<1, 0>, true>>,
  Expect<Equal<GreaterThan<5, 4>, true>>,
  Expect<Equal<GreaterThan<4, 5>, false>>,
  Expect<Equal<GreaterThan<0, 0>, false>>,
  Expect<Equal<GreaterThan<10, 9>, true>>,
  Expect<Equal<GreaterThan<20, 20>, false>>,
  Expect<Equal<GreaterThan<10, 100>, false>>,
  Expect<Equal<GreaterThan<111, 11>, true>>,
  Expect<Equal<GreaterThan<1234567891011, 1234567891010>, true>>
]

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/4425/answer
  > View solutions: https://tsch.js.org/4425/solutions
  > More Challenges: https://tsch.js.org
*/
