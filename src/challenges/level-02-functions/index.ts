// ============================================================
// TSchool - Level 2: Functions
// Master TypeScript function signatures, parameters, overloads,
// and higher-order patterns.
// ============================================================

import { LevelDefinition } from '../../engine/types';

export const level02: LevelDefinition = {
  number: 2,
  title: 'Functions',
  description:
    'Functions are the building blocks of any program. In this level you will learn how TypeScript supercharges functions with typed parameters, return types, optional and default values, rest parameters, overloads, and typed callbacks. By the end you will be able to write bullet-proof function APIs that catch mistakes before they ever run.',
  challenges: [
    // -------------------------------------------------------
    // Challenge 1 - Function Signatures
    // -------------------------------------------------------
    {
      id: 'L2-C1',
      level: 2,
      number: 1,
      title: 'Function Signatures',
      difficulty: 'easy',
      xp: 10,

      description: `In JavaScript you can call a function with any arguments and hope for the best. TypeScript changes the game by letting you annotate **parameter types** and **return types** so the compiler catches mistakes before your code ever runs.

A typed function looks like this:

\`\`\`ts
function greet(name: string): string {
  return "Hello, " + name;
}
\`\`\`

- Each parameter gets a type annotation after a colon.
- The return type goes after the closing parenthesis.
- If you try to pass a number where a string is expected, TypeScript will refuse to compile.

Return type annotations are technically optional (TypeScript can infer them), but adding them explicitly is a great habit -- it documents your intent and catches bugs where you accidentally return the wrong type.`,

      mission:
        'Write three functions with fully typed signatures: `add` takes two numbers and returns their sum, `isEven` takes a number and returns a boolean, and `shout` takes a string and returns it in uppercase.',

      scaffold: `// === Challenge L2-C1: Function Signatures ===

// TODO: Write a function "add" that takes two numbers and returns their sum.


// TODO: Write a function "isEven" that takes a number and returns true if it is even.


// TODO: Write a function "shout" that takes a string and returns it in UPPERCASE.

`,

      solution: `// === Challenge L2-C1: Function Signatures ===

function add(a: number, b: number): number {
  return a + b;
}

function isEven(n: number): boolean {
  return n % 2 === 0;
}

function shout(text: string): string {
  return text.toUpperCase();
}
`,

      hints: [
        'Remember to annotate both the parameter types AND the return type: `function name(param: Type): ReturnType`.',
        'For `isEven`, the modulo operator `%` gives the remainder. `n % 2 === 0` is `true` when n is even.',
        '`String.prototype.toUpperCase()` returns a new string in all caps -- exactly what `shout` needs.',
      ],

      tests: [
        {
          description: 'add(2, 3) returns 5',
          test: 'add(2, 3) === 5',
          errorHint: 'Make sure `add` returns the sum of its two number parameters.',
        },
        {
          description: 'add(-1, 1) returns 0',
          test: 'add(-1, 1) === 0',
          errorHint: '`add` should handle negative numbers correctly.',
        },
        {
          description: 'isEven(4) returns true',
          test: 'isEven(4) === true',
          errorHint: '4 is even -- `isEven` should return `true`.',
        },
        {
          description: 'isEven(7) returns false',
          test: 'isEven(7) === false',
          errorHint: '7 is odd -- `isEven` should return `false`.',
        },
        {
          description: 'shout("hello") returns "HELLO"',
          test: 'shout("hello") === "HELLO"',
          errorHint: '`shout` should return the input string converted to uppercase.',
        },
      ],
    },

    // -------------------------------------------------------
    // Challenge 2 - Optional & Default Parameters
    // -------------------------------------------------------
    {
      id: 'L2-C2',
      level: 2,
      number: 2,
      title: 'Optional & Default Parameters',
      difficulty: 'easy',
      xp: 10,

      description: `Not every argument is required every time. TypeScript gives you two elegant tools for this:

**Optional parameters** use a \`?\` after the parameter name. When omitted the value is \`undefined\`:

\`\`\`ts
function greet(name: string, greeting?: string): string {
  return (greeting ?? "Hello") + ", " + name;
}
greet("Ada");            // "Hello, Ada"
greet("Ada", "Welcome"); // "Welcome, Ada"
\`\`\`

**Default parameters** use \`=\` to provide a fallback value. The type is inferred from the default:

\`\`\`ts
function greet(name: string, greeting: string = "Hello"): string {
  return greeting + ", " + name;
}
\`\`\`

Rules to remember:
- Optional and default parameters must come **after** all required parameters.
- You cannot mark a parameter as both optional (\`?\`) and have a default (\`=\`) -- pick one.
- Inside the function, an optional parameter has type \`T | undefined\`.`,

      mission:
        'Write a function `buildGreeting` that takes a required `name: string`, an optional `greeting: string` (defaults to `"Hello"` if not provided), and an optional `punctuation: string` (defaults to `"!"`). It should return a string like `"Hello, Ada!"`. Also write a function `repeat` that takes a required `text: string` and a parameter `times` with a default value of `2`, and returns the text repeated that many times (concatenated).',

      scaffold: `// === Challenge L2-C2: Optional & Default Parameters ===

// TODO: Write "buildGreeting(name, greeting?, punctuation?)" that
// returns "\${greeting}, \${name}\${punctuation}".
// greeting defaults to "Hello", punctuation defaults to "!".


// TODO: Write "repeat(text, times)" where times defaults to 2.
// Return the text repeated \`times\` times (concatenated).
// e.g. repeat("ha", 3) => "hahaha"

`,

      solution: `// === Challenge L2-C2: Optional & Default Parameters ===

function buildGreeting(name: string, greeting: string = "Hello", punctuation: string = "!"): string {
  return \`\${greeting}, \${name}\${punctuation}\`;
}

function repeat(text: string, times: number = 2): string {
  let result = "";
  for (let i = 0; i < times; i++) {
    result += text;
  }
  return result;
}
`,

      hints: [
        'Use default parameter syntax: `param: Type = defaultValue`. This way the caller can omit the argument.',
        'For `buildGreeting`, template literals make it easy: `` `${greeting}, ${name}${punctuation}` ``.',
        'For `repeat`, you can use a simple for-loop or `text.repeat(times)` -- both work!',
      ],

      tests: [
        {
          description: 'buildGreeting("Ada") returns "Hello, Ada!"',
          test: 'buildGreeting("Ada") === "Hello, Ada!"',
          errorHint: 'When called with just a name, the defaults "Hello" and "!" should kick in.',
        },
        {
          description: 'buildGreeting("Ada", "Welcome") returns "Welcome, Ada!"',
          test: 'buildGreeting("Ada", "Welcome") === "Welcome, Ada!"',
          errorHint: 'The custom greeting should replace "Hello" but punctuation should still default to "!".',
        },
        {
          description: 'buildGreeting("Ada", "Hi", ".") returns "Hi, Ada."',
          test: 'buildGreeting("Ada", "Hi", ".") === "Hi, Ada."',
          errorHint: 'When all three arguments are provided, none of the defaults should be used.',
        },
        {
          description: 'repeat("ha") returns "haha" (default times = 2)',
          test: 'repeat("ha") === "haha"',
          errorHint: '`repeat` with default `times` of 2 should return the text twice.',
        },
        {
          description: 'repeat("ho", 3) returns "hohoho"',
          test: 'repeat("ho", 3) === "hohoho"',
          errorHint: '`repeat("ho", 3)` should concatenate "ho" three times.',
        },
      ],
    },

    // -------------------------------------------------------
    // Challenge 3 - Rest Parameters
    // -------------------------------------------------------
    {
      id: 'L2-C3',
      level: 2,
      number: 3,
      title: 'Rest Parameters',
      difficulty: 'medium',
      xp: 25,

      description: `Sometimes a function needs to accept a variable number of arguments. That is where **rest parameters** shine. A rest parameter uses the \`...\` syntax and collects all remaining arguments into a typed array:

\`\`\`ts
function sum(...numbers: number[]): number {
  return numbers.reduce((total, n) => total + n, 0);
}
sum(1, 2, 3);       // 6
sum(10, 20, 30, 40); // 100
\`\`\`

Key rules:
- A function can have **at most one** rest parameter.
- The rest parameter must be the **last** parameter.
- Its type is always an array (e.g. \`number[]\`, \`string[]\`).

You can also **spread** an array into a function call:

\`\`\`ts
const nums = [1, 2, 3];
sum(...nums); // 6
\`\`\`

Rest parameters pair beautifully with array methods like \`reduce\`, \`map\`, and \`filter\`.`,

      mission:
        'Write three functions:\n1. `sumAll(...numbers: number[]): number` -- returns the sum of all arguments.\n2. `joinWithSeparator(separator: string, ...parts: string[]): string` -- joins all parts with the given separator.\n3. `firstAndLast<T>(...items: T[]): [T, T]` -- returns a tuple of the first and last item. You may assume at least one item is passed (if only one item, first and last are the same).',

      scaffold: `// === Challenge L2-C3: Rest Parameters ===

// TODO: Write "sumAll" that takes any number of numbers and returns their sum.


// TODO: Write "joinWithSeparator" that takes a separator string followed
// by any number of string parts, and joins them with the separator.
// e.g. joinWithSeparator("-", "a", "b", "c") => "a-b-c"


// TODO: Write "firstAndLast" that takes any number of items and returns
// a tuple [first, last]. If only one item, return [item, item].

`,

      solution: `// === Challenge L2-C3: Rest Parameters ===

function sumAll(...numbers: number[]): number {
  return numbers.reduce((total, n) => total + n, 0);
}

function joinWithSeparator(separator: string, ...parts: string[]): string {
  return parts.join(separator);
}

function firstAndLast<T>(...items: T[]): [T, T] {
  return [items[0], items[items.length - 1]];
}
`,

      hints: [
        'Rest parameters use `...name: Type[]` syntax and must be the last parameter in the list.',
        '`Array.prototype.reduce` is perfect for summing: `.reduce((acc, n) => acc + n, 0)`.',
        'For `firstAndLast`, `items[0]` is the first element and `items[items.length - 1]` is the last. Return them as a tuple `[first, last]`.',
      ],

      tests: [
        {
          description: 'sumAll(1, 2, 3) returns 6',
          test: 'sumAll(1, 2, 3) === 6',
          errorHint: '`sumAll` should add up all the numbers passed to it.',
        },
        {
          description: 'sumAll() returns 0 with no arguments',
          test: 'sumAll() === 0',
          errorHint: '`sumAll` with no arguments should return 0 (the empty sum).',
        },
        {
          description: 'sumAll(10) returns 10 with a single argument',
          test: 'sumAll(10) === 10',
          errorHint: '`sumAll` with a single argument should return that argument.',
        },
        {
          description: 'joinWithSeparator("-", "a", "b", "c") returns "a-b-c"',
          test: 'joinWithSeparator("-", "a", "b", "c") === "a-b-c"',
          errorHint: 'The separator is the first argument; the rest are the parts to join.',
        },
        {
          description: 'joinWithSeparator(", ", "hello") returns "hello"',
          test: 'joinWithSeparator(", ", "hello") === "hello"',
          errorHint: 'A single part should be returned as-is, with no separator.',
        },
        {
          description: 'firstAndLast(1, 2, 3) returns [1, 3]',
          test: '(() => { const r = firstAndLast(1, 2, 3); return r[0] === 1 && r[1] === 3; })()',
          errorHint: '`firstAndLast` should return a tuple of the first and last elements.',
        },
        {
          description: 'firstAndLast("only") returns ["only", "only"]',
          test: '(() => { const r = firstAndLast("only"); return r[0] === "only" && r[1] === "only"; })()',
          errorHint: 'With a single argument, first and last are the same item.',
        },
      ],
    },

    // -------------------------------------------------------
    // Challenge 4 - Function Overloads
    // -------------------------------------------------------
    {
      id: 'L2-C4',
      level: 2,
      number: 4,
      title: 'Function Overloads',
      difficulty: 'hard',
      xp: 50,

      description: `Sometimes a single function behaves differently based on the types of its arguments. TypeScript handles this with **function overloads** -- multiple signature declarations followed by a single implementation:

\`\`\`ts
function format(value: string): string;
function format(value: number): string;
function format(value: string | number): string {
  if (typeof value === "string") {
    return value.trim();
  }
  return value.toFixed(2);
}
\`\`\`

How it works:
1. The **overload signatures** (the first two lines) define the public API. Callers only see these.
2. The **implementation signature** (the last line) must be compatible with ALL overloads but is **not** directly callable by users.
3. Inside the body you use type narrowing (\`typeof\`, \`instanceof\`, etc.) to handle each case.

Why bother? Overloads give callers precise return-type information. Without them, the return type would be a union, losing specificity.`,

      mission:
        'Write an overloaded function `parse` with these signatures:\n- `parse(value: string): number` -- parses the string to a number using `parseFloat`.\n- `parse(value: number): string` -- converts the number to a string using `String()`.\n- `parse(value: boolean): number` -- returns `1` for `true`, `0` for `false`.\n\nAlso write an overloaded function `createId`:\n- `createId(prefix: string, id: number): string` -- returns `"${prefix}-${id}"`.\n- `createId(id: number): string` -- returns `"ID-${id}"`.',

      scaffold: `// === Challenge L2-C4: Function Overloads ===

// TODO: Write overloaded function "parse" with three signatures:
//   parse(value: string): number
//   parse(value: number): string
//   parse(value: boolean): number
// Then write the implementation.


// TODO: Write overloaded function "createId":
//   createId(prefix: string, id: number): string  -> "\${prefix}-\${id}"
//   createId(id: number): string                   -> "ID-\${id}"
// Then write the implementation.

`,

      solution: `// === Challenge L2-C4: Function Overloads ===

function parse(value: string): number;
function parse(value: number): string;
function parse(value: boolean): number;
function parse(value: string | number | boolean): number | string {
  if (typeof value === "string") {
    return parseFloat(value);
  }
  if (typeof value === "boolean") {
    return value ? 1 : 0;
  }
  return String(value);
}

function createId(prefix: string, id: number): string;
function createId(id: number): string;
function createId(prefixOrId: string | number, id?: number): string {
  if (typeof prefixOrId === "string" && id !== undefined) {
    return \`\${prefixOrId}-\${id}\`;
  }
  return \`ID-\${prefixOrId}\`;
}
`,

      hints: [
        'Declare overload signatures first (without a body), then write one implementation signature with a union type that covers all overloads.',
        'Use `typeof` checks inside the implementation to narrow the type and handle each case.',
        'For `createId`, the implementation signature can be `(prefixOrId: string | number, id?: number): string`. Check `typeof prefixOrId` to decide which overload was called.',
      ],

      tests: [
        {
          description: 'parse("3.14") returns 3.14',
          test: 'parse("3.14") === 3.14',
          errorHint: '`parse` should use `parseFloat` when given a string.',
        },
        {
          description: 'parse(42) returns "42"',
          test: 'parse(42) === "42"',
          errorHint: '`parse` should use `String()` when given a number.',
        },
        {
          description: 'parse(true) returns 1',
          test: 'parse(true) === 1',
          errorHint: '`parse(true)` should return `1`.',
        },
        {
          description: 'parse(false) returns 0',
          test: 'parse(false) === 0',
          errorHint: '`parse(false)` should return `0`.',
        },
        {
          description: 'createId("USER", 42) returns "USER-42"',
          test: 'createId("USER", 42) === "USER-42"',
          errorHint: '`createId` with a prefix and id should return `"prefix-id"`.',
        },
        {
          description: 'createId(7) returns "ID-7"',
          test: 'createId(7) === "ID-7"',
          errorHint: '`createId` with just a number should return `"ID-number"`.',
        },
      ],
    },

    // -------------------------------------------------------
    // Challenge 5 - Arrow Functions & Callbacks
    // -------------------------------------------------------
    {
      id: 'L2-C5',
      level: 2,
      number: 5,
      title: 'Arrow Functions & Callbacks',
      difficulty: 'medium',
      xp: 25,

      description: `Arrow functions (\`=>\`) are a concise syntax for writing functions, and they are everywhere in modern TypeScript:

\`\`\`ts
const double = (n: number): number => n * 2;
\`\`\`

They really shine when used as **callbacks** -- functions passed as arguments to other functions. Typing callbacks makes your higher-order functions rock-solid:

\`\`\`ts
function applyToEach(
  items: number[],
  fn: (item: number) => number
): number[] {
  return items.map(fn);
}
applyToEach([1, 2, 3], n => n * 10); // [10, 20, 30]
\`\`\`

You can also define reusable **function types** with type aliases:

\`\`\`ts
type Predicate<T> = (item: T) => boolean;
\`\`\`

Key differences from regular functions:
- Arrow functions do **not** have their own \`this\` (they inherit it from the enclosing scope).
- Single-expression arrow functions have an implicit return (no braces needed).
- They cannot be used as constructors.`,

      mission:
        'Complete the following:\n1. Write a type alias `MathOp` for a function that takes two numbers and returns a number.\n2. Write a function `applyOp(a: number, b: number, op: MathOp): number` that applies the operation.\n3. Write a function `filterArray<T>(items: T[], predicate: (item: T) => boolean): T[]` that returns a new array with only the items where the predicate returns true.\n4. Write a `const multiplyBy` arrow function that takes a `factor: number` and returns a new arrow function `(n: number) => number` that multiplies `n` by the factor (a closure).',

      scaffold: `// === Challenge L2-C5: Arrow Functions & Callbacks ===

// TODO: Define a type alias "MathOp" for (a: number, b: number) => number.


// TODO: Write "applyOp(a, b, op)" that calls op(a, b) and returns the result.


// TODO: Write "filterArray<T>(items, predicate)" that returns items for which
// predicate returns true. Do NOT use Array.prototype.filter -- write a loop!


// TODO: Write a const "multiplyBy" arrow function.
// multiplyBy(factor) returns a new function (n) => n * factor.
// e.g. const triple = multiplyBy(3); triple(5) => 15

`,

      solution: `// === Challenge L2-C5: Arrow Functions & Callbacks ===

type MathOp = (a: number, b: number) => number;

function applyOp(a: number, b: number, op: MathOp): number {
  return op(a, b);
}

function filterArray<T>(items: T[], predicate: (item: T) => boolean): T[] {
  const result: T[] = [];
  for (const item of items) {
    if (predicate(item)) {
      result.push(item);
    }
  }
  return result;
}

const multiplyBy = (factor: number): ((n: number) => number) => {
  return (n: number): number => n * factor;
};
`,

      hints: [
        'A type alias for a function: `type MathOp = (a: number, b: number) => number;`',
        'For `filterArray`, iterate over items with a for-of loop, call `predicate(item)`, and push matching items into a result array.',
        '`multiplyBy` is a function that returns a function: `const multiplyBy = (factor: number) => (n: number) => n * factor;`',
      ],

      tests: [
        {
          description: 'applyOp(3, 4, (a, b) => a + b) returns 7',
          test: 'applyOp(3, 4, (a: number, b: number) => a + b) === 7',
          errorHint: '`applyOp` should call the provided function with `a` and `b` and return the result.',
        },
        {
          description: 'applyOp(10, 3, (a, b) => a - b) returns 7',
          test: 'applyOp(10, 3, (a: number, b: number) => a - b) === 7',
          errorHint: '`applyOp` should work with any operation, including subtraction.',
        },
        {
          description: 'filterArray([1,2,3,4,5], n => n > 3) returns [4, 5]',
          test: '(() => { const r = filterArray([1,2,3,4,5], (n: number) => n > 3); return r.length === 2 && r[0] === 4 && r[1] === 5; })()',
          errorHint: '`filterArray` should return only the elements for which the predicate returns `true`.',
        },
        {
          description: 'filterArray(["a","bb","ccc"], s => s.length > 1) returns ["bb","ccc"]',
          test: '(() => { const r = filterArray(["a","bb","ccc"], (s: string) => s.length > 1); return r.length === 2 && r[0] === "bb" && r[1] === "ccc"; })()',
          errorHint: '`filterArray` should be generic and work with strings too.',
        },
        {
          description: 'multiplyBy(3)(5) returns 15',
          test: 'multiplyBy(3)(5) === 15',
          errorHint: '`multiplyBy(3)` should return a function that multiplies its argument by 3.',
        },
        {
          description: 'multiplyBy(0)(100) returns 0',
          test: 'multiplyBy(0)(100) === 0',
          errorHint: '`multiplyBy(0)` should return a function that always returns 0.',
        },
        {
          description: 'multiplyBy returns a new function each time',
          test: 'multiplyBy(2) !== multiplyBy(2)',
          errorHint: 'Each call to `multiplyBy` should create and return a brand new function instance.',
        },
      ],
    },

    // -------------------------------------------------------
    // Challenge 6 (BOSS) - The Function Factory
    // -------------------------------------------------------
    {
      id: 'L2-C6',
      level: 2,
      number: 6,
      title: 'BOSS: The Function Factory',
      difficulty: 'boss',
      xp: 200,

      description: `It is time to prove your mastery of TypeScript functions. In this boss challenge you will build a small utility function library from scratch, combining every concept from this level: typed signatures, optional/default parameters, rest parameters, overloads, arrow functions, and callbacks.

Your library will include:
- A **pipe** function that chains operations together.
- A **memoize** higher-order function that caches results.
- An **overloaded** \`createValidator\` that builds validator functions for different types.
- A **compose** function that combines multiple single-argument functions right to left.

Think of this as your TypeScript function toolkit -- the kind of utilities real-world libraries are built from.

Good luck, boss fighter!`,

      mission: `Build the following four utilities:

1. **pipe(value, ...fns)**: Takes an initial value and any number of functions. Applies them left-to-right, passing each result to the next function. Returns the final result.
   \`\`\`ts
   pipe(5, n => n * 2, n => n + 1) // 11
   \`\`\`

2. **memoize(fn)**: Takes a single-argument function and returns a new function that caches results. If the same argument is passed again, return the cached result instead of calling \`fn\`. Use a Map internally.

3. **createValidator** (overloaded):
   - \`createValidator("string")\` returns \`(v: unknown) => v is string\`
   - \`createValidator("number")\` returns \`(v: unknown) => v is number\`
   - \`createValidator("boolean")\` returns \`(v: unknown) => v is boolean\`

4. **compose(...fns)**: Takes any number of single-argument functions and returns a new function that applies them **right-to-left**.
   \`\`\`ts
   const fn = compose(n => n + 1, n => n * 2);
   fn(3) // 7  (first multiply: 3*2=6, then add: 6+1=7)
   \`\`\``,

      scaffold: `// === BOSS Challenge L2-C6: The Function Factory ===

// TODO 1: Write "pipe" - takes a value and any number of transform functions.
// Applies functions left-to-right. Return the final transformed value.
// Signature: pipe(value: any, ...fns: Array<(arg: any) => any>): any


// TODO 2: Write "memoize" - takes a single-argument function and returns
// a memoized version. Use a Map to cache argument -> result pairs.
// Signature: memoize<T, R>(fn: (arg: T) => R): (arg: T) => R


// TODO 3: Write overloaded "createValidator":
//   createValidator(type: "string"): (v: unknown) => v is string
//   createValidator(type: "number"): (v: unknown) => v is number
//   createValidator(type: "boolean"): (v: unknown) => v is boolean


// TODO 4: Write "compose" - takes any number of single-argument functions
// and returns a new function that applies them right-to-left.
// Signature: compose(...fns: Array<(arg: any) => any>): (arg: any) => any

`,

      solution: `// === BOSS Challenge L2-C6: The Function Factory ===

function pipe(value: any, ...fns: Array<(arg: any) => any>): any {
  return fns.reduce((acc, fn) => fn(acc), value);
}

function memoize<T, R>(fn: (arg: T) => R): (arg: T) => R {
  const cache = new Map<T, R>();
  return (arg: T): R => {
    if (cache.has(arg)) {
      return cache.get(arg)!;
    }
    const result = fn(arg);
    cache.set(arg, result);
    return result;
  };
}

function createValidator(type: "string"): (v: unknown) => v is string;
function createValidator(type: "number"): (v: unknown) => v is number;
function createValidator(type: "boolean"): (v: unknown) => v is boolean;
function createValidator(type: "string" | "number" | "boolean"): (v: unknown) => boolean {
  return (v: unknown): boolean => typeof v === type;
}

function compose(...fns: Array<(arg: any) => any>): (arg: any) => any {
  return (arg: any): any => fns.reduceRight((acc, fn) => fn(acc), arg);
}
`,

      hints: [
        '`pipe` is a left fold: use `fns.reduce((acc, fn) => fn(acc), value)` to apply each function in sequence.',
        '`memoize` needs a `Map` as a closure variable. Check `cache.has(arg)` before calling the original function. If cached, return `cache.get(arg)!`.',
        'For `createValidator`, write three overload signatures, then one implementation: `function createValidator(type: string) { return (v: unknown) => typeof v === type; }`.',
      ],

      tests: [
        // pipe tests
        {
          description: 'pipe(5, n => n * 2, n => n + 1) returns 11',
          test: 'pipe(5, (n: any) => n * 2, (n: any) => n + 1) === 11',
          errorHint: '`pipe` should apply functions left-to-right: 5 -> 10 -> 11.',
        },
        {
          description: 'pipe("hello", s => s.toUpperCase()) returns "HELLO"',
          test: 'pipe("hello", (s: any) => s.toUpperCase()) === "HELLO"',
          errorHint: '`pipe` should work with string transforms too.',
        },
        {
          description: 'pipe(1) returns 1 when no functions are provided',
          test: 'pipe(1) === 1',
          errorHint: '`pipe` with no transform functions should return the original value.',
        },
        {
          description: 'pipe chains three functions correctly',
          test: 'pipe(2, (n: any) => n + 3, (n: any) => n * 10, (n: any) => n - 1) === 49',
          errorHint: '2 + 3 = 5, * 10 = 50, - 1 = 49. Check your left-to-right application.',
        },

        // memoize tests
        {
          description: 'memoize returns correct results',
          test: '(() => { const mFn = memoize((n: number) => n * 2); return mFn(5) === 10 && mFn(3) === 6; })()',
          errorHint: 'The memoized function should still return correct results.',
        },
        {
          description: 'memoize caches and avoids re-computation',
          test: '(() => { let calls = 0; const mFn = memoize((n: number) => { calls++; return n * 2; }); mFn(5); mFn(5); mFn(5); return calls === 1; })()',
          errorHint: 'After the first call with a given argument, subsequent calls should use the cache. The original function should only be called once per unique argument.',
        },
        {
          description: 'memoize caches per-argument (different args = different calls)',
          test: '(() => { let calls = 0; const mFn = memoize((n: number) => { calls++; return n; }); mFn(1); mFn(2); mFn(1); return calls === 2; })()',
          errorHint: 'Different arguments should each trigger the original function once.',
        },

        // createValidator tests
        {
          description: 'createValidator("string") validates strings',
          test: '(() => { const isStr = createValidator("string"); return isStr("hello") === true && isStr(42) === false; })()',
          errorHint: '`createValidator("string")` should return a function that returns `true` for strings and `false` for non-strings.',
        },
        {
          description: 'createValidator("number") validates numbers',
          test: '(() => { const isNum = createValidator("number"); return isNum(42) === true && isNum("42") === false; })()',
          errorHint: '`createValidator("number")` should return `true` for numbers, `false` otherwise.',
        },
        {
          description: 'createValidator("boolean") validates booleans',
          test: '(() => { const isBool = createValidator("boolean"); return isBool(true) === true && isBool(1) === false; })()',
          errorHint: '`createValidator("boolean")` should return `true` for booleans, `false` otherwise.',
        },

        // compose tests
        {
          description: 'compose applies functions right-to-left',
          test: 'compose((n: any) => n + 1, (n: any) => n * 2)(3) === 7',
          errorHint: '`compose(f, g)(3)` should compute `f(g(3))`: first g (3*2=6), then f (6+1=7).',
        },
        {
          description: 'compose with single function acts as identity wrapper',
          test: 'compose((n: any) => n * 5)(4) === 20',
          errorHint: 'A single function in `compose` should just apply that function.',
        },
        {
          description: 'compose with three functions applies right-to-left',
          test: 'compose((n: any) => n - 1, (n: any) => n * 3, (n: any) => n + 2)(1) === 8',
          errorHint: 'Right-to-left: 1+2=3, 3*3=9, 9-1=8.',
        },
      ],
    },
  ],
};
