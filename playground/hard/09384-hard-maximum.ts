/*
  9384 - Maximum
  -------
  by ch3cknull (@ch3cknull) #hard #array

  ### Question

  ### Description

  Implement the type `Maximum`, which takes an input type `T`, and returns the maximum value in `T`.

  If `T` is an empty array, it returns `never`. **Negative numbers** are not considered.

  For example:

  ```ts
  Maximum<[]> // never
  Maximum<[0, 2, 1]> // 2
  Maximum<[1, 20, 200, 150]> // 200
  ```

  ### Advanced

  Can you implement type `Minimum` inspired by `Maximum`?

  > View on GitHub: https://tsch.js.org/9384
*/

/* _____________ Your Code Here _____________ */

type Tuple<N extends number, T extends any[] = []> = T['length'] extends N
   ? T
   : Tuple<N, [...T, 1]>;
type Max<T extends any[], TM extends any[] = []> = T extends [infer F extends number, ...infer R]
   ? Max<R, Tuple<F> extends [...TM, ...any[]] ? Tuple<F> : TM>
   : TM['length'];
type Maximum<T extends any[]> = T extends [] ? never : Max<T>;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

type cases = [
   Expect<Equal<Maximum<[]>, never>>,
   Expect<Equal<Maximum<[0, 2, 1]>, 2>>,
   Expect<Equal<Maximum<[1, 20, 200, 150]>, 200>>
];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/9384/answer
  > View solutions: https://tsch.js.org/9384/solutions
  > More Challenges: https://tsch.js.org
*/
