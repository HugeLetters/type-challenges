/*
  13580 - Replace Union
  -------
  by Konstantin Barabanov (@crutch12) #hard

  ### Question

  Given an `union of types` and `array of type pairs` to replace (`[[string, number], [Date, null]]`), return a new union replaced with the `type pairs`.

  > View on GitHub: https://tsch.js.org/13580
*/

/* _____________ Your Code Here _____________ */

type UnionReplace<T, U extends [any, any][], V extends U[number] = U[number]> = V extends V
   ? T extends U[number][0]
      ? T extends V[0]
         ? V[1]
         : never
      : T
   : never;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils';
import { ExpectFalse, NotEqual } from '@type-challenges/utils';

type cases = [
   // string -> null
   Expect<Equal<UnionReplace<number | string, [[string, null]]>, number | null>>,

   // Date -> string; Function -> undefined
   Expect<
      Equal<
         UnionReplace<Function | Date | object, [[Date, string], [Function, undefined]]>,
         undefined | string | object
      >
   >
];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/13580/answer
  > View solutions: https://tsch.js.org/13580/solutions
  > More Challenges: https://tsch.js.org
*/
