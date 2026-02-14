import { LevelDefinition } from '../../engine/types';

export const level06: LevelDefinition = {
  number: 6,
  title: 'Generics',
  description:
    'Generics let you write flexible, reusable code that works with any type while keeping full type safety. Think of them as "type variables" — placeholders that get filled in when you actually use the function, class, or interface.',
  challenges: [
    // -------------------------------------------------------
    // 6-1  Generic Functions
    // -------------------------------------------------------
    {
      id: 'generics-functions',
      level: 6,
      number: 1,
      title: 'Generic Functions',
      description: `A generic function uses a **type parameter** (conventionally called \`T\`) so it can work with many types at once:

\`\`\`ts
function identity<T>(value: T): T {
  return value;
}

const num = identity(42);       // type: number
const str = identity("hello");  // type: string
\`\`\`

TypeScript *infers* \`T\` from the argument, so callers rarely need to specify it manually.`,
      mission:
        'Write a generic function `wrapInArray` that takes a single value of any type `T` and returns an array containing just that value. Then write a generic function `getFirst` that takes an array of type `T[]` and returns the first element (or `undefined` if the array is empty).',
      difficulty: 'easy',
      xp: 10,
      scaffold: `// Write a generic function that wraps any value in an array
// TODO: implement wrapInArray

// Write a generic function that returns the first element of an array
// TODO: implement getFirst
`,
      solution: `function wrapInArray<T>(value: T): T[] {
  return [value];
}

function getFirst<T>(arr: T[]): T | undefined {
  return arr[0];
}
`,
      hints: [
        'Use angle brackets after the function name: `function wrapInArray<T>(...)`.',
        'The return type of `wrapInArray` should be `T[]`. Just return `[value]`.',
        '`getFirst` should accept `arr: T[]` and return `T | undefined`. Use `arr[0]`.',
      ],
      tests: [
        {
          description: 'wrapInArray wraps a number in an array',
          test: `(() => { const result = wrapInArray(42); return Array.isArray(result) && result.length === 1 && result[0] === 42; })()`,
          errorHint: '`wrapInArray(42)` should return `[42]`.',
        },
        {
          description: 'wrapInArray wraps a string in an array',
          test: `(() => { const result = wrapInArray("hello"); return Array.isArray(result) && result[0] === "hello"; })()`,
          errorHint: '`wrapInArray("hello")` should return `["hello"]`.',
        },
        {
          description: 'getFirst returns the first element',
          test: `(() => { return getFirst([10, 20, 30]) === 10; })()`,
          errorHint: '`getFirst([10, 20, 30])` should return `10`.',
        },
        {
          description: 'getFirst returns undefined for an empty array',
          test: `(() => { return getFirst([]) === undefined; })()`,
          errorHint: '`getFirst([])` should return `undefined`.',
        },
      ],
    },

    // -------------------------------------------------------
    // 6-2  Generic Constraints
    // -------------------------------------------------------
    {
      id: 'generics-constraints',
      level: 6,
      number: 2,
      title: 'Generic Constraints',
      description: `Sometimes you need to *restrict* what types \`T\` can be. Use the \`extends\` keyword:

\`\`\`ts
function getLength<T extends { length: number }>(item: T): number {
  return item.length;   // TS knows T has .length
}

getLength("hello");   // OK — strings have length
getLength([1, 2, 3]); // OK — arrays have length
getLength(42);        // Error — number has no length
\`\`\`

Constraints tell TypeScript "T must at least have these properties."`,
      mission:
        'Write a generic function `longest` that takes two arguments of the same type `T` (where `T` must have a numeric `length` property) and returns whichever argument is longer. Then write a function `getProperty` that takes an object of type `T` and a key of type `K extends keyof T`, and returns `obj[key]`.',
      difficulty: 'medium',
      xp: 25,
      scaffold: `// Return whichever argument has a greater length
// TODO: implement longest

// Safely access a property on an object using keyof
// TODO: implement getProperty
`,
      solution: `function longest<T extends { length: number }>(a: T, b: T): T {
  return a.length >= b.length ? a : b;
}

function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}
`,
      hints: [
        'For `longest`, constrain T: `<T extends { length: number }>`. Both parameters and the return type are `T`.',
        'Compare `a.length >= b.length` and return the winner.',
        'For `getProperty`, use two type params: `<T, K extends keyof T>`. The return type is `T[K]`.',
      ],
      tests: [
        {
          description: 'longest returns the longer string',
          test: `(() => { return longest("ab", "abc") === "abc"; })()`,
          errorHint: '`longest("ab", "abc")` should return `"abc"`.',
        },
        {
          description: 'longest returns the longer array',
          test: `(() => { const result = longest([1], [1, 2, 3]); return Array.isArray(result) && result.length === 3; })()`,
          errorHint: '`longest([1], [1,2,3])` should return the 3-element array.',
        },
        {
          description: 'longest returns first when lengths are equal',
          test: `(() => { return longest("aa", "bb") === "aa"; })()`,
          errorHint: 'When lengths are equal, return the first argument.',
        },
        {
          description: 'getProperty retrieves a property value',
          test: `(() => { return getProperty({ name: "Alice", age: 30 }, "name") === "Alice"; })()`,
          errorHint: '`getProperty({ name: "Alice" }, "name")` should return `"Alice"`.',
        },
        {
          description: 'getProperty works with numeric values',
          test: `(() => { return getProperty({ x: 10, y: 20 }, "y") === 20; })()`,
          errorHint: '`getProperty({ x: 10, y: 20 }, "y")` should return `20`.',
        },
      ],
    },

    // -------------------------------------------------------
    // 6-3  Generic Interfaces & Types
    // -------------------------------------------------------
    {
      id: 'generics-interfaces',
      level: 6,
      number: 3,
      title: 'Generic Interfaces & Types',
      description: `You can parameterize interfaces and type aliases just like functions:

\`\`\`ts
interface Box<T> {
  value: T;
}

type Pair<A, B> = { first: A; second: B };

const numBox: Box<number> = { value: 42 };
const pair: Pair<string, boolean> = { first: "ok", second: true };
\`\`\`

This keeps your data structures flexible yet type-safe.`,
      mission:
        'Define a generic interface `Result<T>` that represents an operation outcome — it should have a boolean `success` property, an optional `data` property of type `T`, and an optional `error` property of type `string`. Then write two helper functions: `ok<T>(data: T): Result<T>` that creates a successful result, and `fail<T>(error: string): Result<T>` that creates a failed result.',
      difficulty: 'medium',
      xp: 25,
      scaffold: `// Define a generic Result interface
// TODO: define Result<T>

// Create a success result
// TODO: implement ok

// Create a failure result
// TODO: implement fail
`,
      solution: `interface Result<T> {
  success: boolean;
  data?: T;
  error?: string;
}

function ok<T>(data: T): Result<T> {
  return { success: true, data };
}

function fail<T>(error: string): Result<T> {
  return { success: false, error };
}
`,
      hints: [
        'Use `interface Result<T> { success: boolean; data?: T; error?: string; }`.',
        '`ok` should return `{ success: true, data }`.',
        '`fail` should return `{ success: false, error }`. It still needs `<T>` so the return type is `Result<T>`.',
      ],
      tests: [
        {
          description: 'ok() creates a successful result with data',
          test: `(() => { const r = ok(42); return r.success === true && r.data === 42; })()`,
          errorHint: '`ok(42)` should return `{ success: true, data: 42 }`.',
        },
        {
          description: 'ok() result has no error property set',
          test: `(() => { const r = ok("hello"); return r.success === true && r.error === undefined; })()`,
          errorHint: 'A successful result should not have an `error` property.',
        },
        {
          description: 'fail() creates a failed result with error message',
          test: `(() => { const r = fail<number>("oops"); return r.success === false && r.error === "oops"; })()`,
          errorHint: '`fail("oops")` should return `{ success: false, error: "oops" }`.',
        },
        {
          description: 'fail() result has no data property set',
          test: `(() => { const r = fail<string>("bad"); return r.data === undefined; })()`,
          errorHint: 'A failed result should not have a `data` property.',
        },
      ],
    },

    // -------------------------------------------------------
    // 6-4  Multiple Type Parameters
    // -------------------------------------------------------
    {
      id: 'generics-multiple-params',
      level: 6,
      number: 4,
      title: 'Multiple Type Parameters',
      description: `Functions and types can have multiple type parameters:

\`\`\`ts
function swap<T, U>(pair: [T, U]): [U, T] {
  return [pair[1], pair[0]];
}

const result = swap(["hello", 42]); // type: [number, string]
\`\`\`

This is powerful for expressing relationships between different types in a single signature.`,
      mission:
        'Write a generic function `mapPair` that takes a pair `[T, U]` and two mapper functions (`(t: T) => V` and `(u: U) => W`), and returns a new pair `[V, W]` with both values transformed. Then write a function `zip` that takes two arrays (`T[]` and `U[]`) and returns an array of pairs `[T, U][]`. It should stop at the length of the shorter array.',
      difficulty: 'hard',
      xp: 50,
      scaffold: `// Transform both elements of a pair using mapper functions
// TODO: implement mapPair

// Combine two arrays into an array of pairs
// TODO: implement zip
`,
      solution: `function mapPair<T, U, V, W>(
  pair: [T, U],
  mapFirst: (t: T) => V,
  mapSecond: (u: U) => W
): [V, W] {
  return [mapFirst(pair[0]), mapSecond(pair[1])];
}

function zip<T, U>(arr1: T[], arr2: U[]): [T, U][] {
  const length = Math.min(arr1.length, arr2.length);
  const result: [T, U][] = [];
  for (let i = 0; i < length; i++) {
    result.push([arr1[i], arr2[i]]);
  }
  return result;
}
`,
      hints: [
        '`mapPair` needs four type params: `<T, U, V, W>`. The mappers are `(t: T) => V` and `(u: U) => W`.',
        'Return `[mapFirst(pair[0]), mapSecond(pair[1])]` from `mapPair`.',
        'For `zip`, use `Math.min(arr1.length, arr2.length)` and loop to build pairs.',
      ],
      tests: [
        {
          description: 'mapPair transforms both elements',
          test: `(() => { const result = mapPair(["hello", 3], s => s.length, n => n * 2); return result[0] === 5 && result[1] === 6; })()`,
          errorHint: '`mapPair(["hello", 3], s => s.length, n => n * 2)` should return `[5, 6]`.',
        },
        {
          description: 'mapPair works with different type combinations',
          test: `(() => { const result = mapPair([42, true], n => String(n), b => !b); return result[0] === "42" && result[1] === false; })()`,
          errorHint: '`mapPair([42, true], n => String(n), b => !b)` should return `["42", false]`.',
        },
        {
          description: 'zip combines two arrays into pairs',
          test: `(() => { const result = zip([1, 2, 3], ["a", "b", "c"]); return result.length === 3 && result[0][0] === 1 && result[0][1] === "a" && result[2][0] === 3 && result[2][1] === "c"; })()`,
          errorHint: '`zip([1,2,3], ["a","b","c"])` should return `[[1,"a"],[2,"b"],[3,"c"]]`.',
        },
        {
          description: 'zip stops at the shorter array',
          test: `(() => { const result = zip([1, 2], ["a", "b", "c", "d"]); return result.length === 2 && result[1][0] === 2 && result[1][1] === "b"; })()`,
          errorHint: '`zip([1,2], ["a","b","c","d"])` should return only 2 pairs.',
        },
        {
          description: 'zip returns empty array when one input is empty',
          test: `(() => { return zip([], [1, 2, 3]).length === 0; })()`,
          errorHint: '`zip([], [1,2,3])` should return `[]`.',
        },
      ],
    },

    // -------------------------------------------------------
    // 6-5  Generic Defaults
    // -------------------------------------------------------
    {
      id: 'generics-defaults',
      level: 6,
      number: 5,
      title: 'Generic Defaults',
      description: `Like function parameters, type parameters can have **defaults**:

\`\`\`ts
interface ApiResponse<T = unknown> {
  status: number;
  data: T;
}

// No need to specify T when unknown is fine:
const raw: ApiResponse = { status: 200, data: "anything" };

// Or be explicit:
const typed: ApiResponse<User> = { status: 200, data: user };
\`\`\`

Defaults reduce boilerplate when a common type covers most use-cases.`,
      mission:
        'Create a generic interface `Stack<T = number>` with methods `push(item: T): void`, `pop(): T | undefined`, and a readonly `size: number` property. Then write a function `createStack<T = number>()` that returns an object implementing `Stack<T>` using an internal array.',
      difficulty: 'medium',
      xp: 25,
      scaffold: `// Define a generic Stack interface with a default type of number
// TODO: define Stack<T = number>

// Factory function to create a stack
// TODO: implement createStack
`,
      solution: `interface Stack<T = number> {
  push(item: T): void;
  pop(): T | undefined;
  readonly size: number;
}

function createStack<T = number>(): Stack<T> {
  const items: T[] = [];
  return {
    push(item: T): void {
      items.push(item);
    },
    pop(): T | undefined {
      return items.pop();
    },
    get size(): number {
      return items.length;
    },
  };
}
`,
      hints: [
        'Set a default with `<T = number>`: `interface Stack<T = number> { ... }`.',
        '`createStack` should also use `<T = number>` and return `Stack<T>`.',
        'Use a closure over a `T[]` array. Implement `size` as a getter: `get size() { return items.length; }`.',
      ],
      tests: [
        {
          description: 'createStack creates an empty stack with size 0',
          test: `(() => { const s = createStack(); return s.size === 0; })()`,
          errorHint: 'A new stack should have `size === 0`.',
        },
        {
          description: 'push adds items and increases size',
          test: `(() => { const s = createStack(); s.push(10); s.push(20); return s.size === 2; })()`,
          errorHint: 'After two pushes, `size` should be `2`.',
        },
        {
          description: 'pop returns items in LIFO order',
          test: `(() => { const s = createStack(); s.push(1); s.push(2); s.push(3); return s.pop() === 3 && s.pop() === 2 && s.pop() === 1; })()`,
          errorHint: '`pop()` should return items in last-in-first-out order.',
        },
        {
          description: 'pop returns undefined on empty stack',
          test: `(() => { const s = createStack(); return s.pop() === undefined; })()`,
          errorHint: '`pop()` on an empty stack should return `undefined`.',
        },
        {
          description: 'createStack works with string type',
          test: `(() => { const s = createStack<string>(); s.push("hello"); return s.pop() === "hello" && s.size === 0; })()`,
          errorHint: '`createStack<string>()` should work with string values.',
        },
      ],
    },

    // -------------------------------------------------------
    // 6-6  BOSS: The Collection Master
    // -------------------------------------------------------
    {
      id: 'generics-boss',
      level: 6,
      number: 6,
      title: 'BOSS: The Collection Master',
      description: `Time to combine everything you've learned about generics!

You'll build a type-safe **TypedMap** — a wrapper around a plain object that provides safe get/set/delete operations with full generic support, including iteration helpers and a transform method.

This is a real-world pattern used in state management libraries, caches, and ORMs.`,
      mission: `Build a \`TypedMap<K extends string, V>\` class (or factory function returning an object) with these methods:

- \`set(key: K, value: V): void\` — store a value
- \`get(key: K): V | undefined\` — retrieve a value
- \`has(key: K): boolean\` — check existence
- \`delete(key: K): boolean\` — remove a key, return true if it existed
- \`keys(): K[]\` — return all keys
- \`values(): V[]\` — return all values
- \`entries(): [K, V][]\` — return all key-value pairs
- \`size: number\` (readonly) — number of stored entries
- \`map<U>(fn: (value: V, key: K) => U): TypedMap<K, U>\` — transform all values into a new TypedMap

You may implement this as a class or a factory function — your choice!`,
      difficulty: 'boss',
      xp: 200,
      scaffold: `// Build a type-safe TypedMap<K extends string, V>
// It should support: set, get, has, delete, keys, values, entries, size, and map.

// TODO: implement TypedMap

// TODO: implement createTypedMap<K extends string, V>() that returns a TypedMap<K, V>
`,
      solution: `interface TypedMap<K extends string, V> {
  set(key: K, value: V): void;
  get(key: K): V | undefined;
  has(key: K): boolean;
  delete(key: K): boolean;
  keys(): K[];
  values(): V[];
  entries(): [K, V][];
  readonly size: number;
  map<U>(fn: (value: V, key: K) => U): TypedMap<K, U>;
}

function createTypedMap<K extends string, V>(): TypedMap<K, V> {
  const store: Partial<Record<K, V>> = {};

  const self: TypedMap<K, V> = {
    set(key: K, value: V): void {
      store[key] = value;
    },
    get(key: K): V | undefined {
      return store[key];
    },
    has(key: K): boolean {
      return key in store;
    },
    delete(key: K): boolean {
      if (key in store) {
        delete store[key];
        return true;
      }
      return false;
    },
    keys(): K[] {
      return Object.keys(store) as K[];
    },
    values(): V[] {
      return Object.values(store) as V[];
    },
    entries(): [K, V][] {
      return Object.entries(store) as [K, V][];
    },
    get size(): number {
      return Object.keys(store).length;
    },
    map<U>(fn: (value: V, key: K) => U): TypedMap<K, U> {
      const result = createTypedMap<K, U>();
      for (const [k, v] of self.entries()) {
        result.set(k, fn(v, k));
      }
      return result;
    },
  };

  return self;
}
`,
      hints: [
        'Start with a `Partial<Record<K, V>>` as your internal storage object.',
        'For `keys()`, `values()`, and `entries()`, use `Object.keys/values/entries` and cast appropriately.',
        '`map` should create a *new* `TypedMap<K, U>` via `createTypedMap<K, U>()` and populate it by iterating `entries()`.',
      ],
      tests: [
        {
          description: 'set and get store and retrieve values',
          test: `(() => { const m = createTypedMap<string, number>(); m.set("a", 1); m.set("b", 2); return m.get("a") === 1 && m.get("b") === 2; })()`,
          errorHint: '`set("a", 1)` then `get("a")` should return `1`.',
        },
        {
          description: 'get returns undefined for missing keys',
          test: `(() => { const m = createTypedMap<string, number>(); return m.get("missing") === undefined; })()`,
          errorHint: '`get` on a missing key should return `undefined`.',
        },
        {
          description: 'has reports key existence correctly',
          test: `(() => { const m = createTypedMap<string, number>(); m.set("x", 10); return m.has("x") === true && m.has("y") === false; })()`,
          errorHint: '`has` should return `true` for existing keys and `false` otherwise.',
        },
        {
          description: 'delete removes keys and returns correct boolean',
          test: `(() => { const m = createTypedMap<string, number>(); m.set("a", 1); const removed = m.delete("a"); const removedAgain = m.delete("a"); return removed === true && removedAgain === false && m.has("a") === false; })()`,
          errorHint: '`delete` should return `true` if the key existed, `false` otherwise.',
        },
        {
          description: 'size tracks the number of entries',
          test: `(() => { const m = createTypedMap<string, string>(); m.set("a", "1"); m.set("b", "2"); m.set("c", "3"); m.delete("b"); return m.size === 2; })()`,
          errorHint: 'After 3 sets and 1 delete, `size` should be `2`.',
        },
        {
          description: 'keys, values, and entries return correct data',
          test: `(() => { const m = createTypedMap<string, number>(); m.set("x", 10); m.set("y", 20); const k = m.keys().sort(); const v = m.values().sort(); const e = m.entries().sort(); return k[0] === "x" && k[1] === "y" && v[0] === 10 && v[1] === 20 && e[0][0] === "x" && e[1][1] === 20; })()`,
          errorHint: '`keys()`, `values()`, and `entries()` should reflect all stored data.',
        },
        {
          description: 'map transforms values into a new TypedMap',
          test: `(() => { const m = createTypedMap<string, number>(); m.set("a", 1); m.set("b", 2); const doubled = m.map((v) => v * 2); return doubled.get("a") === 2 && doubled.get("b") === 4 && doubled.size === 2 && m.get("a") === 1; })()`,
          errorHint: '`map(v => v * 2)` should return a new TypedMap with doubled values without mutating the original.',
        },
      ],
    },
  ],
};
