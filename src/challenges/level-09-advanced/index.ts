import { LevelDefinition } from '../../engine/types';

export const level09: LevelDefinition = {
  number: 9,
  title: 'Advanced Types',
  description:
    'Dive into the TypeScript type system\'s most powerful features: mapped types, conditional types, the infer keyword, utility types, and recursive types.',
  challenges: [
    // ── Challenge 1: Mapped Types ──────────────────────────────
    {
      id: 'L9-C1',
      level: 9,
      number: 1,
      title: 'Mapped Types',
      difficulty: 'medium',
      xp: 25,
      description: `
Mapped types let you transform every property of an existing type
into a new type using the \`{ [K in keyof T]: ... }\` syntax:

\`\`\`typescript
type Readonly<T> = { readonly [K in keyof T]: T[K] };
type Optional<T> = { [K in keyof T]?: T[K] };
type Nullable<T> = { [K in keyof T]: T[K] | null };
\`\`\`

You can also **add** or **remove** modifiers with \`+\` and \`-\`:

\`\`\`typescript
type Mutable<T> = { -readonly [K in keyof T]: T[K] };
type Required<T> = { [K in keyof T]-?: T[K] };
\`\`\`

And remap keys using \`as\`:

\`\`\`typescript
type Getters<T> = {
  [K in keyof T as \`get\${Capitalize<string & K>}\`]: () => T[K];
};
\`\`\`
`,
      mission:
        'Create three mapped types: `Stringify<T>` that converts all property values to `string`, `Getters<T>` that creates getter methods (e.g., `getName(): string` for property `name: string`), and `Mutable<T>` that removes `readonly` from all properties.',
      scaffold: `// 1. type Stringify<T> — maps every property of T to string
//    Example: Stringify<{ a: number; b: boolean }> → { a: string; b: string }

// 2. type Getters<T> — for each key K, create getK(): T[K]
//    Example: Getters<{ name: string }> → { getName(): string }
//    Hint: use \`as \\\`get\${Capitalize<string & K>}\\\`\`

// 3. type Mutable<T> — removes readonly from all properties
//    Example: Mutable<{ readonly x: number }> → { x: number }

// TODO: implement Stringify, Getters, and Mutable
`,
      solution: `type Stringify<T> = { [K in keyof T]: string };

type Getters<T> = {
  [K in keyof T as \`get\${Capitalize<string & K>}\`]: () => T[K];
};

type Mutable<T> = { -readonly [K in keyof T]: T[K] };
`,
      hints: [
        'Stringify is straightforward: `{ [K in keyof T]: string }`.',
        'For Getters, use key remapping: `[K in keyof T as \\`get\\${Capitalize<string & K>}\\`]: () => T[K]`.',
        'Mutable uses the `-readonly` modifier: `{ -readonly [K in keyof T]: T[K] }`.',
      ],
      tests: [
        {
          description: 'Stringify converts all property types to string',
          test: `type S = Stringify<{ a: number; b: boolean }>; const test: S = { a: 'hello', b: 'world' }; test.a === 'hello' && test.b === 'world';`,
          errorHint: 'Stringify<T> should map all values to string: { [K in keyof T]: string }.',
        },
        {
          description: 'Getters creates getter methods with correct names',
          test: `type G = Getters<{ name: string; age: number }>; const obj: G = { getName: () => 'Alice', getAge: () => 30 }; obj.getName() === 'Alice' && obj.getAge() === 30;`,
          errorHint: 'Use key remapping with Capitalize: `[K in keyof T as \\`get\\${Capitalize<string & K>}\\`]`.',
        },
        {
          description: 'Mutable removes readonly from properties',
          test: `type Orig = { readonly x: number; readonly y: string }; type M = Mutable<Orig>; const m: M = { x: 1, y: 'a' }; m.x = 2; m.x === 2;`,
          errorHint: 'Use `-readonly` modifier: `{ -readonly [K in keyof T]: T[K] }`.',
        },
      ],
    },

    // ── Challenge 2: Conditional Types ─────────────────────────
    {
      id: 'L9-C2',
      level: 9,
      number: 2,
      title: 'Conditional Types',
      difficulty: 'hard',
      xp: 50,
      description: `
Conditional types select one of two types based on a condition:

\`\`\`typescript
type IsString<T> = T extends string ? true : false;
// IsString<"hello"> → true
// IsString<42> → false
\`\`\`

When used with **union types**, conditional types are **distributive** —
they apply to each member individually:

\`\`\`typescript
type NonNullable<T> = T extends null | undefined ? never : T;
// NonNullable<string | null> → string
\`\`\`

You can build powerful type-level logic this way:

\`\`\`typescript
type TypeName<T> =
  T extends string ? "string" :
  T extends number ? "number" :
  T extends boolean ? "boolean" :
  "other";
\`\`\`
`,
      mission:
        'Create four conditional types: `IsArray<T>` (returns `true` or `false` literal types), `UnwrapPromise<T>` (extracts the inner type of a Promise, or returns T), `FunctionReturnType<T>` (extracts return type of a function, or `never`), and `ExcludeType<T, U>` (removes members of U from union T).',
      scaffold: `// 1. type IsArray<T> → true if T extends any[], false otherwise

// 2. type UnwrapPromise<T> → if T extends Promise<infer U>, return U; else T

// 3. type FunctionReturnType<T> → if T extends (...args: any[]) => infer R, return R; else never

// 4. type ExcludeType<T, U> → if T extends U, return never; else T
//    (This is how the built-in Exclude works)

// TODO: implement all four conditional types
`,
      solution: `type IsArray<T> = T extends any[] ? true : false;

type UnwrapPromise<T> = T extends Promise<infer U> ? U : T;

type FunctionReturnType<T> = T extends (...args: any[]) => infer R ? R : never;

type ExcludeType<T, U> = T extends U ? never : T;
`,
      hints: [
        'IsArray: `T extends any[] ? true : false` — the literal types `true` and `false`, not `boolean`.',
        'UnwrapPromise uses `infer`: `T extends Promise<infer U> ? U : T`.',
        'ExcludeType is distributive: for each member of union T, if it extends U, replace with `never`.',
      ],
      tests: [
        {
          description: 'IsArray correctly identifies arrays',
          test: `const a: IsArray<number[]> = true; const b: IsArray<string> = false; a === true && b === false;`,
          errorHint: 'IsArray<T> should return literal `true` for arrays, `false` otherwise.',
        },
        {
          description: 'UnwrapPromise extracts inner type',
          test: `const val: UnwrapPromise<Promise<string>> = 'hello'; const passthrough: UnwrapPromise<number> = 42; val === 'hello' && passthrough === 42;`,
          errorHint: 'Use `T extends Promise<infer U> ? U : T`.',
        },
        {
          description: 'FunctionReturnType extracts return type',
          test: `const r: FunctionReturnType<() => number> = 42; const r2: FunctionReturnType<(x: string) => boolean> = true; r === 42 && r2 === true;`,
          errorHint: 'Pattern: `T extends (...args: any[]) => infer R ? R : never`.',
        },
        {
          description: 'ExcludeType removes specified members from union',
          test: `const val: ExcludeType<'a' | 'b' | 'c', 'a'> = 'b'; const val2: ExcludeType<string | number | boolean, boolean> = 'test'; val === 'b' && val2 === 'test';`,
          errorHint: 'ExcludeType should be: `T extends U ? never : T`.',
        },
      ],
    },

    // ── Challenge 3: Infer Keyword ─────────────────────────────
    {
      id: 'L9-C3',
      level: 9,
      number: 3,
      title: 'Infer Keyword',
      difficulty: 'hard',
      xp: 50,
      description: `
The \`infer\` keyword lets you **extract** types from within other
types inside conditional type clauses:

\`\`\`typescript
// Extract the element type of an array
type ElementOf<T> = T extends (infer E)[] ? E : never;
// ElementOf<string[]> → string

// Extract the first argument of a function
type FirstArg<T> = T extends (first: infer A, ...rest: any[]) => any ? A : never;
// FirstArg<(x: number, y: string) => void> → number
\`\`\`

You can \`infer\` in any position: array elements, function parameters,
return types, promise results, template literal pieces, and more.

\`\`\`typescript
type GetValue<T> = T extends Map<any, infer V> ? V : never;
// GetValue<Map<string, number>> → number
\`\`\`
`,
      mission:
        'Create these inference types: `Head<T>` (first element of a tuple), `Tail<T>` (all but first), `LastArg<T>` (last parameter of a function), and `AwaitedReturn<T>` (return type of async function, unwrapping the Promise).',
      scaffold: `// 1. type Head<T extends any[]>
//    Head<[1, 2, 3]> → 1
//    Head<[]> → never

// 2. type Tail<T extends any[]>
//    Tail<[1, 2, 3]> → [2, 3]
//    Tail<[]> → []

// 3. type LastArg<T extends (...args: any[]) => any>
//    LastArg<(a: string, b: number) => void> → number
//    LastArg<() => void> → never

// 4. type AwaitedReturn<T extends (...args: any[]) => any>
//    AwaitedReturn<() => Promise<string>> → string
//    AwaitedReturn<() => number> → number

// TODO: implement Head, Tail, LastArg, and AwaitedReturn
`,
      solution: `type Head<T extends any[]> = T extends [infer H, ...any[]] ? H : never;

type Tail<T extends any[]> = T extends [any, ...infer R] ? R : [];

type LastArg<T extends (...args: any[]) => any> =
  T extends (...args: [...any[], infer L]) => any ? L : never;

type AwaitedReturn<T extends (...args: any[]) => any> =
  T extends (...args: any[]) => Promise<infer U> ? U :
  T extends (...args: any[]) => infer R ? R : never;
`,
      hints: [
        'Head: `T extends [infer H, ...any[]] ? H : never` — infer the first element with rest syntax.',
        'Tail: `T extends [any, ...infer R] ? R : []` — skip the first, infer the rest.',
        'AwaitedReturn: check `Promise<infer U>` first, then fall back to `infer R` for non-async returns.',
      ],
      tests: [
        {
          description: 'Head extracts the first tuple element',
          test: `const h: Head<[string, number, boolean]> = 'hello'; const n: Head<[42]> = 42; h === 'hello' && n === 42;`,
          errorHint: 'Use `T extends [infer H, ...any[]] ? H : never`.',
        },
        {
          description: 'Tail returns all elements after the first',
          test: `const t: Tail<[1, 2, 3]> = [2, 3]; t[0] === 2 && t[1] === 3 && t.length === 2;`,
          errorHint: 'Use `T extends [any, ...infer R] ? R : []`.',
        },
        {
          description: 'LastArg extracts the last function parameter',
          test: `const fn = (a: string, b: number, c: boolean): void => {}; type L = LastArg<typeof fn>; const val: L = true; val === true;`,
          errorHint: 'Use `T extends (...args: [...any[], infer L]) => any ? L : never`.',
        },
        {
          description: 'AwaitedReturn unwraps async return types',
          test: `type AR = AwaitedReturn<() => Promise<string>>; const val: AR = 'resolved'; val === 'resolved';`,
          errorHint: 'Check for Promise<infer U> in the return position first.',
        },
        {
          description: 'AwaitedReturn works with non-async functions too',
          test: `type R = AwaitedReturn<(x: number) => boolean>; const val: R = true; val === true;`,
          errorHint: 'Fall back to extracting the plain return type if it\'s not a Promise.',
        },
      ],
    },

    // ── Challenge 4: Utility Types ─────────────────────────────
    {
      id: 'L9-C4',
      level: 9,
      number: 4,
      title: 'Utility Types',
      difficulty: 'medium',
      xp: 25,
      description: `
TypeScript includes many **built-in utility types**. Here are the key ones:

\`\`\`typescript
Partial<T>     // All properties optional
Required<T>    // All properties required
Readonly<T>    // All properties readonly
Pick<T, K>     // Select specific properties
Omit<T, K>     // Remove specific properties
Record<K, V>   // Object type with keys K and values V
Extract<T, U>  // Keep union members assignable to U
Exclude<T, U>  // Remove union members assignable to U
NonNullable<T> // Remove null & undefined from union
ReturnType<T>  // Return type of a function type
Parameters<T>  // Tuple of function parameter types
\`\`\`

These are essential for everyday TypeScript and compose well together.
`,
      mission:
        'Using ONLY built-in utility types (no manual mapped types), create: `UpdatePayload<T>` (all fields optional — Partial), `UserPreview` (Pick id and name from a User type you define), `CreateDTO<T>` (Omit id and createdAt from T), and `StrictConfig<T>` (Required and Readonly combined).',
      scaffold: `// First, define this base type to work with:
// interface User {
//   id: number;
//   name: string;
//   email: string;
//   createdAt: Date;
// }

// 1. type UpdatePayload<T> — Partial<T>
// 2. type UserPreview — Pick<User, 'id' | 'name'>
// 3. type CreateDTO<T> — Omit<T, 'id' | 'createdAt'>
// 4. type StrictConfig<T> — Readonly<Required<T>>

// TODO: implement User interface and all four utility types
`,
      solution: `interface User {
  id: number;
  name: string;
  email: string;
  createdAt: Date;
}

type UpdatePayload<T> = Partial<T>;

type UserPreview = Pick<User, 'id' | 'name'>;

type CreateDTO<T> = Omit<T, 'id' | 'createdAt'>;

type StrictConfig<T> = Readonly<Required<T>>;
`,
      hints: [
        'UpdatePayload is simply `Partial<T>` — it makes all properties optional.',
        'UserPreview uses `Pick<User, \'id\' | \'name\'>` to select only those two fields.',
        'StrictConfig composes two utilities: `Readonly<Required<T>>` — required first, then readonly.',
      ],
      tests: [
        {
          description: 'UpdatePayload makes all fields optional',
          test: `const update: UpdatePayload<User> = { name: 'Bob' }; update.name === 'Bob' && update.email === undefined;`,
          errorHint: 'UpdatePayload<T> should be Partial<T>.',
        },
        {
          description: 'UserPreview only has id and name',
          test: `const preview: UserPreview = { id: 1, name: 'Alice' }; preview.id === 1 && preview.name === 'Alice' && !('email' in preview);`,
          errorHint: 'UserPreview should be Pick<User, \'id\' | \'name\'>.',
        },
        {
          description: 'CreateDTO omits id and createdAt',
          test: `const dto: CreateDTO<User> = { name: 'Bob', email: 'bob@x.com' }; dto.name === 'Bob' && dto.email === 'bob@x.com' && !('id' in dto);`,
          errorHint: 'CreateDTO<T> should be Omit<T, \'id\' | \'createdAt\'>.',
        },
        {
          description: 'StrictConfig makes all props required and readonly',
          test: `type Cfg = { host?: string; port?: number }; const strict: StrictConfig<Cfg> = { host: 'localhost', port: 3000 }; strict.host === 'localhost' && strict.port === 3000;`,
          errorHint: 'StrictConfig<T> should be Readonly<Required<T>>.',
        },
      ],
    },

    // ── Challenge 5: Recursive Types ───────────────────────────
    {
      id: 'L9-C5',
      level: 9,
      number: 5,
      title: 'Recursive Types',
      difficulty: 'hard',
      xp: 50,
      description: `
TypeScript types can **reference themselves**, enabling modeling of
nested or tree-like structures:

\`\`\`typescript
// A JSON-compatible type
type Json =
  | string
  | number
  | boolean
  | null
  | Json[]
  | { [key: string]: Json };

// Binary tree
type TreeNode<T> = {
  value: T;
  left: TreeNode<T> | null;
  right: TreeNode<T> | null;
};
\`\`\`

You can also build recursive **utility types**:

\`\`\`typescript
type DeepReadonly<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly<T[K]> : T[K];
};
\`\`\`

This recurses into nested objects, making everything readonly at all levels.
`,
      mission:
        'Create three recursive types: `DeepPartial<T>` (like Partial but works on nested objects), `NestedKeyOf<T>` (union of all nested key paths as dot-separated strings), and a `FileSystem` type that models files and folders (a folder contains an array of FileSystem entries).',
      scaffold: `// 1. type DeepPartial<T> — like Partial, but recursively
//    makes nested object properties optional too
//    Hint: if T[K] extends object, recurse; otherwise just T[K]

// 2. type NestedKeyOf<T extends object> — produces dot-separated key paths
//    Example: NestedKeyOf<{ a: { b: { c: string } } }> → "a" | "a.b" | "a.b.c"
//    Hint: use template literal types with recursion

// 3. type FileSystemEntry = ... (a union of File and Folder)
//    interface File { type: 'file'; name: string; size: number; }
//    interface Folder { type: 'folder'; name: string; children: FileSystemEntry[]; }

// TODO: implement DeepPartial, NestedKeyOf, and FileSystemEntry (with File and Folder)
`,
      solution: `type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

type NestedKeyOf<T extends object> = {
  [K in keyof T & string]: T[K] extends object
    ? K | \`\${K}.\${NestedKeyOf<T[K]>}\`
    : K;
}[keyof T & string];

interface File {
  type: 'file';
  name: string;
  size: number;
}

interface Folder {
  type: 'folder';
  name: string;
  children: FileSystemEntry[];
}

type FileSystemEntry = File | Folder;
`,
      hints: [
        'DeepPartial: `{ [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K] }` — add `?` and recurse.',
        'NestedKeyOf: for each key K, if the value is an object, produce `K | \\`\\${K}.\\${NestedKeyOf<...>}\\``. Index into the mapped type with `[keyof T & string]`.',
        'FileSystemEntry is a union: `File | Folder`. Folder.children is `FileSystemEntry[]` — that\'s the recursion.',
      ],
      tests: [
        {
          description: 'DeepPartial makes nested properties optional',
          test: `type Nested = { a: { b: { c: number } } }; const dp: DeepPartial<Nested> = { a: { b: {} } }; dp.a !== undefined;`,
          errorHint: 'DeepPartial should recursively apply Partial to nested objects.',
        },
        {
          description: 'DeepPartial allows fully empty objects',
          test: `type Nested = { x: { y: number }; z: string }; const dp: DeepPartial<Nested> = {}; dp.x === undefined;`,
          errorHint: 'All properties at every level should be optional.',
        },
        {
          description: 'NestedKeyOf produces all key paths',
          test: `type Obj = { a: { b: { c: string } } }; const k1: NestedKeyOf<Obj> = 'a'; const k2: NestedKeyOf<Obj> = 'a.b'; const k3: NestedKeyOf<Obj> = 'a.b.c'; k1 === 'a' && k2 === 'a.b' && k3 === 'a.b.c';`,
          errorHint: 'NestedKeyOf should produce "a" | "a.b" | "a.b.c" for nested objects.',
        },
        {
          description: 'FileSystemEntry models files correctly',
          test: `const f: FileSystemEntry = { type: 'file', name: 'readme.md', size: 1024 }; f.type === 'file' && f.name === 'readme.md';`,
          errorHint: 'Define a File interface with type: "file", name: string, size: number.',
        },
        {
          description: 'FileSystemEntry models nested folders',
          test: `const tree: FileSystemEntry = { type: 'folder', name: 'src', children: [{ type: 'file', name: 'index.ts', size: 256 }, { type: 'folder', name: 'utils', children: [] }] }; tree.type === 'folder' && tree.children.length === 2;`,
          errorHint: 'Folder.children should be FileSystemEntry[], allowing nested folders and files.',
        },
      ],
    },

    // ── Challenge 6: BOSS — The Type Wizard ────────────────────
    {
      id: 'L9-C6',
      level: 9,
      number: 6,
      title: 'BOSS: The Type Wizard',
      difficulty: 'boss',
      xp: 200,
      description: `
**BOSS BATTLE!** You've learned mapped types, conditional types,
infer, and recursion. Now combine them all.

In this challenge, you'll implement custom utility types that
go beyond what TypeScript provides built-in. These are the kinds
of types you'd find in libraries like \`type-fest\` or \`ts-toolbelt\`.

You'll need to use every trick you've learned:
- Mapped types with key remapping
- Conditional types with infer
- Recursive type definitions
- Template literal types
`,
      mission: `Implement these advanced utility types:
1. \`PickByValue<T, V>\` — pick only properties whose value type extends V
2. \`DeepRequired<T>\` — like Required but recursive into nested objects
3. \`TupleToUnion<T>\` — convert a tuple type to a union of its elements
4. \`Flatten<T>\` — flatten a nested object into dot-separated keys (values only, no intermediate objects)
5. \`Merge<A, B>\` — merge two types where B's properties override A's`,
      scaffold: `// 1. type PickByValue<T, V>
//    PickByValue<{ a: string; b: number; c: string }, string> → { a: string; c: string }

// 2. type DeepRequired<T>
//    Makes ALL nested properties required (recursive Required)

// 3. type TupleToUnion<T extends any[]>
//    TupleToUnion<[string, number, boolean]> → string | number | boolean

// 4. type Flatten<T extends object>
//    Flatten<{ a: { b: number; c: { d: string } } }> → { 'a.b': number; 'a.c.d': string }

// 5. type Merge<A, B>
//    Like intersection but B overrides A for shared keys
//    Merge<{ a: number; b: string }, { b: number; c: boolean }>
//    → { a: number; b: number; c: boolean }

// TODO: implement all five utility types
`,
      solution: `type PickByValue<T, V> = {
  [K in keyof T as T[K] extends V ? K : never]: T[K];
};

type DeepRequired<T> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired<T[K]> : T[K];
};

type TupleToUnion<T extends any[]> = T[number];

type Flatten<T extends object, Prefix extends string = ''> = {
  [K in keyof T & string]: T[K] extends object
    ? Flatten<T[K], Prefix extends '' ? K : \`\${Prefix}.\${K}\`>
    : Record<Prefix extends '' ? K : \`\${Prefix}.\${K}\`, T[K]>;
}[keyof T & string] extends infer U
  ? U extends object
    ? { [K in keyof U]: U[K] }
    : never
  : never;

type Merge<A, B> = {
  [K in keyof A | keyof B]: K extends keyof B ? B[K] : K extends keyof A ? A[K] : never;
};
`,
      hints: [
        'PickByValue: use key remapping `[K in keyof T as T[K] extends V ? K : never]` to filter properties.',
        'TupleToUnion is surprisingly simple: `T[number]` indexes a tuple with number to get the union of all elements.',
        'Merge: iterate `keyof A | keyof B`, checking `K extends keyof B` first (B overrides A).',
      ],
      tests: [
        {
          description: 'PickByValue selects properties by value type',
          test: `type P = PickByValue<{ a: string; b: number; c: string; d: boolean }, string>; const obj: P = { a: 'x', c: 'y' }; obj.a === 'x' && obj.c === 'y' && !('b' in obj);`,
          errorHint: 'Use key remapping: `[K in keyof T as T[K] extends V ? K : never]: T[K]`.',
        },
        {
          description: 'DeepRequired makes nested optional properties required',
          test: `type D = { a?: { b?: number; c?: { d?: string } } }; const obj: DeepRequired<D> = { a: { b: 42, c: { d: 'hi' } } }; obj.a.b === 42 && obj.a.c.d === 'hi';`,
          errorHint: 'Use `-?` modifier and recurse into nested objects.',
        },
        {
          description: 'TupleToUnion converts tuple to union',
          test: `type U = TupleToUnion<[string, number, boolean]>; const s: U = 'hello'; const n: U = 42; const b: U = true; s === 'hello' && n === 42 && b === true;`,
          errorHint: 'TupleToUnion can be as simple as `T[number]`.',
        },
        {
          description: 'Merge combines types with B overriding A',
          test: `type M = Merge<{ a: number; b: string }, { b: number; c: boolean }>; const obj: M = { a: 1, b: 42, c: true }; obj.a === 1 && obj.b === 42 && obj.c === true;`,
          errorHint: 'Iterate keyof A | keyof B. For each key, prefer B\'s type if the key exists in B.',
        },
        {
          description: 'Merge preserves types from A for non-overlapping keys',
          test: `type M = Merge<{ x: string; y: number }, { z: boolean }>; const obj: M = { x: 'hi', y: 10, z: false }; obj.x === 'hi' && obj.y === 10 && obj.z === false;`,
          errorHint: 'Keys only in A should keep A\'s value type.',
        },
      ],
    },
  ],
};
