/*
  462 - Currying 2
  -------
  by Kim (@hubvue) #extreme

  ### Question

  [Currying](https://en.wikipedia.org/wiki/Currying) is the technique of converting a function that takes multiple arguments into a sequence of functions that each take a single argument.

  But in our daily life, currying dynamic arguments is also commonly used, for example, the `Function.bind(this, [...params])` API.

  ```ts
  const func = (a: number, b: number, c: number) => {
    return a + b + c
  }

  const bindFunc = func(null, 1, 2)

  const result = bindFunc(3) // result: 6
  ```

  Thus, based on `Currying 1`, we would need to have the dynamic argument version:

  ```ts
  const add = (a: number, b: number, c: number) => a + b + c
  const three = add(1, 1, 1)

  const curriedAdd = DynamicParamsCurrying(add)
  const six = curriedAdd(1, 2, 3)
  const seven = curriedAdd(1, 2)(4)
  const nine = curriedAdd(2)(3)(4)
  ```

  In this challenge, `DynamicParamsCurrying` may take a function with zero to multiple arguments, you need to correctly type it. The returned function may accept at least one argument. When all the arguments as satisfied, it should yield the return type of the original function correctly.

  > View on GitHub: https://tsch.js.org/462
*/

/* _____________ Your Code Here _____________ */

type ArraySplits<A extends any[], B extends any[] = []> = A extends [infer F, ...infer R]
   ? [[...B, F], R] | ArraySplits<R, [...B, F]>
   : never;
type Curryify<P extends any[], R, S extends [any[], any[]] = ArraySplits<P>> = (
   S extends S ? (a: (...x: S[0]) => S[1] extends [] ? R : Curryify<S[1], R>) => any : never
) extends (x: infer I) => any
   ? I
   : never;

declare function DynamicParamsCurrying<P extends any[], R>(fn: (...x: P) => R): Curryify<P, R>;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

const curried1 = DynamicParamsCurrying((_a: string, _b: number, _c: boolean) => true);
const curried2 = DynamicParamsCurrying(
   (_a: string, _b: number, _c: boolean, _d: boolean, _e: boolean, _f: string, _g: boolean) => true
);

const curried1Return1 = curried1('123')(123)(true);
const curried1Return2 = curried1('123', 123)(false);
const curried1Return3 = curried1('123', 123, true);

const curried2Return1 = curried2('123')(123)(true)(false)(true)('123')(false);
const curried2Return2 = curried2('123', 123)(true, false)(true, '123')(false);
const curried2Return3 = curried2('123', 123)(true)(false)(true, '123', false);
const curried2Return4 = curried2('123', 123, true)(false, true, '123')(false);
const curried2Return5 = curried2('123', 123, true)(false)(true)('123')(false);
const curried2Return6 = curried2('123', 123, true, false)(true, '123', false);
const curried2Return7 = curried2('123', 123, true, false, true)('123', false);
const curried2Return8 = curried2('123', 123, true, false, true)('123')(false);
const curried2Return9 = curried2('123', 123, true, false, true, '123')(false);
const curried2Return10 = curried2('123', 123, true, false, true, '123', false);

type cases = [
   Expect<Equal<typeof curried1Return1, boolean>>,
   Expect<Equal<typeof curried1Return2, boolean>>,
   Expect<Equal<typeof curried1Return3, boolean>>,

   Expect<Equal<typeof curried2Return1, boolean>>,
   Expect<Equal<typeof curried2Return2, boolean>>,
   Expect<Equal<typeof curried2Return3, boolean>>,
   Expect<Equal<typeof curried2Return4, boolean>>,
   Expect<Equal<typeof curried2Return5, boolean>>,
   Expect<Equal<typeof curried2Return6, boolean>>,
   Expect<Equal<typeof curried2Return7, boolean>>,
   Expect<Equal<typeof curried2Return8, boolean>>,
   Expect<Equal<typeof curried2Return9, boolean>>,
   Expect<Equal<typeof curried2Return10, boolean>>
];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/462/answer
  > View solutions: https://tsch.js.org/462/solutions
  > More Challenges: https://tsch.js.org
*/
