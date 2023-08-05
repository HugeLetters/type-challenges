/*
  9155 - ValidDate
  -------
  by ch3cknull (@ch3cknull) #hard

  ### Question

  Implement a type `ValidDate`, which takes an input type T and returns whether T is a valid date.

  **Leap year is not considered**

  Good Luck!

  ```ts
  ValidDate<'0102'> // true
  ValidDate<'0131'> // true
  ValidDate<'1231'> // true
  ValidDate<'0229'> // false
  ValidDate<'0100'> // false
  ValidDate<'0132'> // false
  ValidDate<'1301'> // false
  ```

  > View on GitHub: https://tsch.js.org/9155
*/

/* _____________ Your Code Here _____________ */

type Num = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
type Month = `0${Num}` | `1${0 | 1 | 2}`;
type Date =
   | `${Month}${`0${Num}` | `1${0 | Num}` | `2${0 | Exclude<Num, 9>}`}`
   | `${Exclude<Month, '02'>}${29 | 30}`
   | `${Exclude<Month, `0${4 | 6 | 9}` | '11'>}31`;

type ValidDate<T extends string> = T extends Date ? true : false;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

type cases = [
   Expect<Equal<ValidDate<'0102'>, true>>,
   Expect<Equal<ValidDate<'0131'>, true>>,
   Expect<Equal<ValidDate<'1231'>, true>>,
   Expect<Equal<ValidDate<'0229'>, false>>,
   Expect<Equal<ValidDate<'0100'>, false>>,
   Expect<Equal<ValidDate<'0132'>, false>>,
   Expect<Equal<ValidDate<'1301'>, false>>,
   Expect<Equal<ValidDate<'0123'>, true>>,
   Expect<Equal<ValidDate<'01234'>, false>>,
   Expect<Equal<ValidDate<''>, false>>
];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/9155/answer
  > View solutions: https://tsch.js.org/9155/solutions
  > More Challenges: https://tsch.js.org
*/
