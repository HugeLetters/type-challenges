/*
  9286 - FirstUniqueCharIndex
  -------
  by jiangshan (@jiangshanmeta) #medium #string

  ### Question

  Given a string s, find the first non-repeating character in it and return its index. If it does not exist, return -1. (Inspired by [leetcode 387](https://leetcode.com/problems/first-unique-character-in-a-string/))

  > View on GitHub: https://tsch.js.org/9286
*/

/* _____________ Your Code Here _____________ */

type StringtoTuple<S extends string> = S extends `${infer F}${infer R}`
   ? [F, ...StringtoTuple<R>]
   : [];

type FirstUniqueCharIndex<
   S extends string,
   T extends unknown[] = StringtoTuple<S>,
   P = never
> = T extends [infer F, ...infer R]
   ? F extends P | R[number]
      ? FirstUniqueCharIndex<S, R, P | F>
      : StringtoTuple<S> extends [...infer F, any, ...R]
      ? F['length']
      : -1
   : -1;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

type cases = [
   Expect<Equal<FirstUniqueCharIndex<'leetcode'>, 0>>,
   Expect<Equal<FirstUniqueCharIndex<'loveleetcode'>, 2>>,
   Expect<Equal<FirstUniqueCharIndex<'aabb'>, -1>>,
   Expect<Equal<FirstUniqueCharIndex<''>, -1>>,
   Expect<Equal<FirstUniqueCharIndex<'aaa'>, -1>>
];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/9286/answer
  > View solutions: https://tsch.js.org/9286/solutions
  > More Challenges: https://tsch.js.org
*/
