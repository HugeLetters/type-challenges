/*
  9989 - CountElementNumberToObject
  -------
  by 凤之兮原 (@kongmingLatern) #medium

  ### Question

  With type ``CountElementNumberToObject``, get the number of occurrences of every item from an array and return them in an object. For example:

  ~~~ts
  type Simple1 = CountElementNumberToObject<[]> // return {}
  type Simple2 = CountElementNumberToObject<[1,2,3,4,5]>
  /*
   return {
    1: 1,
    2: 1,
    3: 1,
    4: 1,
    5: 1
  }
  */
type Simple3 = CountElementNumberToObject<[1, 2, 3, 4, 5, [1, 2, 3]]>;
/*
 return {
   1: 2,
   2: 2,
   3: 2,
   4: 1,
   5: 1
  } 
  ~~~
  
  > View on GitHub: https://tsch.js.org/9989
*/

/* _____________ Your Code Here _____________ */

type TupleElementNumberToObject<T, O extends Record<PropertyKey, any[]> = {}> = T extends [
   infer F,
   ...infer R
]
   ? TupleElementNumberToObject<
        R,
        [F] extends [PropertyKey]
           ? Omit<O, F> & { [K in F]: K extends keyof O ? [...O[K], F] : [F] }
           : TupleElementNumberToObject<F, O>
     >
   : O;

type CountElementNumberToObject<
   T,
   O extends Record<PropertyKey, any[]> = TupleElementNumberToObject<T>
> = {
   [K in keyof O]: O[K]['length'];
};

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils';
type cases = [
   Expect<
      Equal<
         CountElementNumberToObject<[1, 2, 3, 4, 5]>,
         {
            1: 1;
            2: 1;
            3: 1;
            4: 1;
            5: 1;
         }
      >
   >,
   Expect<
      Equal<
         CountElementNumberToObject<[1, 2, 3, 4, 5, [1, 2, 3]]>,
         {
            1: 2;
            2: 2;
            3: 2;
            4: 1;
            5: 1;
         }
      >
   >,
   Expect<
      Equal<
         CountElementNumberToObject<[1, 2, 3, 4, 5, [1, 2, 3, [4, 4, 1, 2]]]>,
         {
            1: 3;
            2: 3;
            3: 2;
            4: 3;
            5: 1;
         }
      >
   >,
   Expect<Equal<CountElementNumberToObject<[never]>, {}>>,
   Expect<
      Equal<
         CountElementNumberToObject<['1', '2', '0']>,
         {
            0: 1;
            1: 1;
            2: 1;
         }
      >
   >
];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/9989/answer
  > View solutions: https://tsch.js.org/9989/solutions
  > More Challenges: https://tsch.js.org
*/
