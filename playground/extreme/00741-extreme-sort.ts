/*
  741 - Sort
  -------
  by Sg (@suica) #extreme #infer #array

  ### Question

  In this challenge, you are required to sort natural number arrays in either ascend order or descent order.

  Ascend order examples:
  ```ts
  Sort<[]> // []
  Sort<[1]> // [1]
  Sort<[2, 4, 7, 6, 6, 6, 5, 8, 9]> //  [2, 4, 5, 6, 6, 6, 7, 8, 9]
  ```

  The `Sort` type should also accept a boolean type. When it is `true`, the sorted result should be in descent order. Some examples:

  ```ts
  Sort<[3, 2, 1], true> // [3, 2, 1]
  Sort<[3, 2, 0, 1, 0, 0, 0], true> // [3, 2, 1, 0, 0, 0, 0]
  ```

  Extra challenges:
  1. Support natural numbers with 15+ digits.
  2. Support float numbers.

  > View on GitHub: https://tsch.js.org/741
*/

/* _____________ Your Code Here _____________ */
type NumToTuple<N, A extends any[] = []> = A['length'] extends N ? A : NumToTuple<N, [...A, 1]>;
type Greater<A, B> = NumToTuple<A> extends [...NumToTuple<B>, ...any[]] ? true : false;

type Bubble<A, Desc> = A extends [infer F, infer S, ...infer R]
   ? Greater<F, S> extends Desc
      ? [F, ...Bubble<[S, ...R], Desc>]
      : [S, ...Bubble<[F, ...R], Desc>]
   : A;

type Sort<A, Desc = false> = Bubble<A, Desc> extends [...infer F, infer L]
   ? [...Sort<F, Desc>, L]
   : A;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

type cases = [
   Expect<Equal<Sort<[]>, []>>,
   Expect<Equal<Sort<[1]>, [1]>>,
   Expect<Equal<Sort<[2, 1]>, [1, 2]>>,
   Expect<Equal<Sort<[0, 0, 0]>, [0, 0, 0]>>,
   Expect<Equal<Sort<[1, 2, 3]>, [1, 2, 3]>>,
   Expect<Equal<Sort<[3, 2, 1]>, [1, 2, 3]>>,
   Expect<Equal<Sort<[3, 2, 1, 2]>, [1, 2, 2, 3]>>,
   Expect<Equal<Sort<[3, 2, 0, 1, 0, 0, 0]>, [0, 0, 0, 0, 1, 2, 3]>>,
   Expect<Equal<Sort<[2, 4, 7, 6, 6, 6, 5, 8, 9]>, [2, 4, 5, 6, 6, 6, 7, 8, 9]>>,
   Expect<Equal<Sort<[1, 1, 2, 1, 1, 1, 1, 1, 1]>, [1, 1, 1, 1, 1, 1, 1, 1, 2]>>,
   Expect<Equal<Sort<[], true>, []>>,
   Expect<Equal<Sort<[1], true>, [1]>>,
   Expect<Equal<Sort<[2, 1], true>, [2, 1]>>,
   Expect<Equal<Sort<[0, 0, 0], true>, [0, 0, 0]>>,
   Expect<Equal<Sort<[1, 2, 3], true>, [3, 2, 1]>>,
   Expect<Equal<Sort<[3, 2, 1], true>, [3, 2, 1]>>,
   Expect<Equal<Sort<[3, 2, 1, 2], true>, [3, 2, 2, 1]>>,
   Expect<Equal<Sort<[3, 2, 0, 1, 0, 0, 0], true>, [3, 2, 1, 0, 0, 0, 0]>>,
   Expect<Equal<Sort<[2, 4, 7, 6, 6, 6, 5, 8, 9], true>, [9, 8, 7, 6, 6, 6, 5, 4, 2]>>
];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/741/answer
  > View solutions: https://tsch.js.org/741/solutions
  > More Challenges: https://tsch.js.org
*/
