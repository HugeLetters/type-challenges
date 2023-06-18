/*
  2257 - MinusOne
  -------
  by Mustafo Faiz (@fayzzzm) #medium #math

  ### Question

  Given a number (always positive) as a type. Your type should return the number decreased by one.

  For example:

  ```ts
  type Zero = MinusOne<1> // 0
  type FiftyFour = MinusOne<55> // 54
  ```

  > View on GitHub: https://tsch.js.org/2257
*/

/* _____________ Your Code Here _____________ */

// fyi - I heavily looked into other's solutions to implement this, I did not come up with this from scratch
type ReverseString<S extends string> = S extends `${infer F}${infer R}`
  ? `${ReverseString<R>}${F}`
  : S

type StringToNum<S extends string> = S extends `${"0"}${infer L extends number}`
  ? L
  : S extends `${infer L extends number}`
  ? L
  : never

type MinusOneLastDigit<S extends string> =
  ReverseString<S> extends `${infer Digit extends number}${infer Rest}`
    ? `${[9, 0, 1, 2, 3, 4, 5, 6, 7, 8][Digit]}${Digit extends 0
        ? MinusOneLastDigit<ReverseString<Rest>>
        : Rest}`
    : never

type MinusOne<T extends number> = T extends 0
  ? -1
  : StringToNum<ReverseString<MinusOneLastDigit<`${T}`>>>

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from "@type-challenges/utils"

type cases = [
  Expect<Equal<MinusOne<1>, 0>>,
  Expect<Equal<MinusOne<55>, 54>>,
  Expect<Equal<MinusOne<3>, 2>>,
  Expect<Equal<MinusOne<100>, 99>>,
  Expect<Equal<MinusOne<1101>, 1100>>,
  Expect<Equal<MinusOne<0>, -1>>,
  Expect<Equal<MinusOne<9_007_199_254_740_992>, 9_007_199_254_740_991>>
]

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/2257/answer
  > View solutions: https://tsch.js.org/2257/solutions
  > More Challenges: https://tsch.js.org
*/
