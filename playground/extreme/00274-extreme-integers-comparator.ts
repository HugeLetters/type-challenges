/*
  274 - Integers Comparator
  -------
  by Pig Fang (@g-plane) #extreme #template-literal #math

  ### Question

  Implement a type-level integers comparator. We've provided an enum for indicating the comparison result, like this:

  - If `a` is greater than `b`, type should be `Comparison.Greater`.
  - If `a` and `b` are equal, type should be `Comparison.Equal`.
  - If `a` is lower than `b`, type should be `Comparison.Lower`.

  **Note that `a` and `b` can be positive integers or negative integers or zero, even one is positive while another one is negative.**

  > View on GitHub: https://tsch.js.org/274
*/

/* _____________ Your Code Here _____________ */

enum Comparison {
   Greater,
   Equal,
   Lower,
}

type NumString = `${number}`;
type Extracted = ['+' | '-', NumString];
type ExtractSign<A extends number> = `${A}` extends `-${infer B extends number}`
   ? ['-', `${B}`]
   : ['+', `${A}`];
type SplitNumString<S extends NumString> = S extends `${infer F}${infer R extends NumString}`
   ? [F, ...SplitNumString<R>]
   : [S];

type DigitToArray<A extends NumString, Arr extends any[] = []> = `${Arr['length']}` extends A
   ? Arr
   : DigitToArray<A, [1, ...Arr]>;
type CompareDigit<A extends NumString, B extends NumString> = DigitToArray<A> extends [
   ...DigitToArray<B>,
   ...infer R
]
   ? R extends []
      ? Comparison.Equal
      : Comparison.Greater
   : Comparison.Lower;
type SameSizeComparator<A extends NumString[], B extends NumString[]> = [A, B] extends [
   [infer FA extends NumString, ...infer RA extends NumString[]],
   [infer FB extends NumString, ...infer RB extends NumString[]]
]
   ? CompareDigit<FA, FB> extends infer CompareResult
      ? CompareResult extends Comparison.Equal
         ? SameSizeComparator<RA, RB>
         : CompareResult
      : never
   : Comparison.Equal;
type SameSignComparator<
   A extends NumString[],
   B extends NumString[]
> = A['length'] extends B['length']
   ? SameSizeComparator<A, B>
   : SameSignComparator<SplitNumString<`${A['length']}`>, SplitNumString<`${B['length']}`>>;
type ParsedComparator<A extends Extracted, B extends Extracted> = A[0] extends B[0]
   ? A[0] extends '-'
      ? SameSignComparator<SplitNumString<B[1]>, SplitNumString<A[1]>>
      : SameSignComparator<SplitNumString<A[1]>, SplitNumString<B[1]>>
   : A[0] extends '-'
   ? Comparison.Lower
   : Comparison.Greater;

type Comparator<A extends number, B extends number> = A extends B
   ? Comparison.Equal
   : ParsedComparator<ExtractSign<A>, ExtractSign<B>>;

type c = Comparator<673, 656>;
//   ^?

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

type cases = [
   Expect<Equal<Comparator<5, 5>, Comparison.Equal>>,
   Expect<Equal<Comparator<5, 6>, Comparison.Lower>>,
   Expect<Equal<Comparator<5, 8>, Comparison.Lower>>,
   Expect<Equal<Comparator<5, 0>, Comparison.Greater>>,
   Expect<Equal<Comparator<-5, 0>, Comparison.Lower>>,
   Expect<Equal<Comparator<0, 0>, Comparison.Equal>>,
   Expect<Equal<Comparator<0, -5>, Comparison.Greater>>,
   Expect<Equal<Comparator<5, -3>, Comparison.Greater>>,
   Expect<Equal<Comparator<5, -7>, Comparison.Greater>>,
   Expect<Equal<Comparator<-5, -7>, Comparison.Greater>>,
   Expect<Equal<Comparator<-5, -3>, Comparison.Lower>>,
   Expect<Equal<Comparator<-25, -30>, Comparison.Greater>>,
   Expect<Equal<Comparator<15, -23>, Comparison.Greater>>,
   Expect<Equal<Comparator<40, 37>, Comparison.Greater>>,
   Expect<Equal<Comparator<-36, 36>, Comparison.Lower>>,
   Expect<Equal<Comparator<27, 27>, Comparison.Equal>>,
   Expect<Equal<Comparator<-38, -38>, Comparison.Equal>>,

   Expect<Equal<Comparator<1, 100>, Comparison.Lower>>,
   Expect<Equal<Comparator<100, 1>, Comparison.Greater>>,
   Expect<Equal<Comparator<-100, 1>, Comparison.Lower>>,
   Expect<Equal<Comparator<1, -100>, Comparison.Greater>>,
   Expect<Equal<Comparator<-100, -1>, Comparison.Lower>>,
   Expect<Equal<Comparator<-1, -100>, Comparison.Greater>>,

   // Extra tests if you like to challenge yourself!
   Expect<Equal<Comparator<9007199254740992, 9007199254740992>, Comparison.Equal>>,
   Expect<Equal<Comparator<-9007199254740992, -9007199254740992>, Comparison.Equal>>,
   Expect<Equal<Comparator<9007199254740991, 9007199254740992>, Comparison.Lower>>,
   Expect<Equal<Comparator<9007199254740992, 9007199254740991>, Comparison.Greater>>,
   Expect<Equal<Comparator<-9007199254740992, -9007199254740991>, Comparison.Lower>>,
   Expect<Equal<Comparator<-9007199254740991, -9007199254740992>, Comparison.Greater>>
];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/274/answer
  > View solutions: https://tsch.js.org/274/solutions
  > More Challenges: https://tsch.js.org
*/
