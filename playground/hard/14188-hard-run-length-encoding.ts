/*
  14188 - Run-length encoding
  -------
  by Hen Hedymdeith (@alfaproxima) #hard

  ### Question

  Given a `string` sequence of a letters f.e. `AAABCCXXXXXXY`. Return run-length encoded string `3AB2C6XY`.
  Also make a decoder for that string.

  > View on GitHub: https://tsch.js.org/14188
*/

/* _____________ Your Code Here _____________ */

namespace RLE {
   type innerEncode<
      S extends string,
      N extends string,
      C extends any[] = [1]
   > = S extends `${infer F}${infer R}`
      ? F extends N
         ? innerEncode<R, F, [1, ...C]>
         : `${C extends [1] ? '' : C['length']}${N}${Encode<S>}`
      : N;

   export type Encode<S extends string> = S extends `${infer F}${infer R}` ? innerEncode<R, F> : S;

   type RepeatChar<
      C extends string,
      N extends string,
      A extends any[] = [],
      R extends string = ''
   > = `${A['length']}` extends N ? R : RepeatChar<C, N, [1, ...A], `${C}${R}`>;

   export type Decode<S extends string, N extends string = ''> = S extends `${infer F}${infer R}`
      ? F extends `${number}`
         ? Decode<R, `${N}${F}`>
         : `${N extends '' ? F : RepeatChar<F, N>}${Decode<R>}`
      : S;
}

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

type cases = [
   // Raw string -> encoded string
   Expect<Equal<RLE.Encode<'AAABCCXXXXXXY'>, '3AB2C6XY'>>,

   // Encoded string -> decoded string
   Expect<Equal<RLE.Decode<'3AB2C6XY'>, 'AAABCCXXXXXXY'>>
];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/14188/answer
  > View solutions: https://tsch.js.org/14188/solutions
  > More Challenges: https://tsch.js.org
*/
