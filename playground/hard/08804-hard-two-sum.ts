/*
  8804 - Two Sum
  -------
  by PsiloLau (@Psilocine) #hard #array #math

  ### Question

  Given an array of integers `nums` and an integer `target`, return true if two numbers such that they add up to `target`.

  For example

  ```ts
  type sum1 = TwoSum<[3, 2, 4], 6> // true
  type sum2 = TwoSum<[2, 7, 11, 15], 15> // false
  ```

  > View on GitHub: https://tsch.js.org/8804
*/

/* _____________ Your Code Here _____________ */

type NumToTuple<N extends number, T extends any[] = []> = N extends N
   ? T['length'] extends N
      ? T
      : NumToTuple<N, [...T, 1]>
   : never;

type DoSum<T extends [number, number], U extends number> = NumToTuple<U> extends [
   ...NumToTuple<T[0]>,
   ...NumToTuple<T[1]>
]
   ? true
   : false;

type TwoSum<T extends number[], U extends number> = T extends [
   infer F extends number,
   ...infer R extends number[]
]
   ? DoSum<[F, R[number]], U> extends true
      ? true
      : TwoSum<R, U>
   : false;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

type cases = [
   Expect<Equal<TwoSum<[3, 3], 6>, true>>,
   Expect<Equal<TwoSum<[3, 2, 4], 6>, true>>,
   Expect<Equal<TwoSum<[2, 7, 11, 15], 15>, false>>,
   Expect<Equal<TwoSum<[2, 7, 11, 15], 9>, true>>,
   Expect<Equal<TwoSum<[1, 2, 3], 0>, false>>,
   Expect<Equal<TwoSum<[1, 2, 3], 1>, false>>,
   Expect<Equal<TwoSum<[1, 2, 3], 2>, false>>,
   Expect<Equal<TwoSum<[1, 2, 3], 3>, true>>,
   Expect<Equal<TwoSum<[1, 2, 3], 4>, true>>,
   Expect<Equal<TwoSum<[1, 2, 3], 5>, true>>,
   Expect<Equal<TwoSum<[1, 2, 3], 6>, false>>,
   Expect<Equal<TwoSum<[3, 2, 0], 2>, true>>
];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/8804/answer
  > View solutions: https://tsch.js.org/8804/solutions
  > More Challenges: https://tsch.js.org
*/
