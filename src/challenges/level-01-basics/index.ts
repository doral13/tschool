// ============================================================
// TSchool - Level 01: The Basics
// ============================================================

import { LevelDefinition } from '../../engine/types';

export const level01: LevelDefinition = {
  number: 1,
  title: 'The Basics',
  description:
    'Welcome to TypeScript! In this level you will learn the foundation of the type system — type annotations, inference, escape hatches, and assertions. Master these and you will have a solid base for everything that follows.',

  challenges: [
    // --------------------------------------------------------
    // Challenge 1: Hello Types
    // --------------------------------------------------------
    {
      id: 'L1-C1',
      level: 1,
      number: 1,
      title: 'Hello Types',
      difficulty: 'easy',
      xp: 10,

      description: `TypeScript's superpower is its type system. Every variable can be given a \
**type annotation** — a label that tells the compiler what kind of value the variable holds.

The three most common primitive types are:
- \`string\`  — text like \`"hello"\`
- \`number\`  — integers and floats like \`42\` or \`3.14\`
- \`boolean\` — \`true\` or \`false\`

You annotate a variable by adding a colon after the name:

\`\`\`ts
let name: string = "Alice";
let age: number = 30;
let isOnline: boolean = true;
\`\`\`

If you later try to assign a value of the wrong type, TypeScript will catch the mistake \
**before** your code ever runs. That is the whole point — bugs found at compile time instead \
of at 3 AM in production.`,

      mission:
        'Declare three variables with explicit type annotations: a `string` called `greeting`, a `number` called `year`, and a `boolean` called `isTypeSafe`. Give them any values you like.',

      scaffold: `// ============================================
// Challenge 1: Hello Types
// ============================================
// Declare variables with explicit type annotations.

// TODO: Declare a variable 'greeting' of type string
// Example: let greeting: string = "hi";

// TODO: Declare a variable 'year' of type number

// TODO: Declare a variable 'isTypeSafe' of type boolean
`,

      solution: `// ============================================
// Challenge 1: Hello Types
// ============================================
// Declare variables with explicit type annotations.

let greeting: string = "hello";

let year: number = 2026;

let isTypeSafe: boolean = true;
`,

      hints: [
        'Use the syntax: let variableName: type = value;',
        'The three types you need are `string`, `number`, and `boolean` — all lowercase.',
        'Example answer: `let greeting: string = "hello"; let year: number = 2026; let isTypeSafe: boolean = true;`',
      ],

      tests: [
        {
          description: 'greeting is a string',
          test: "typeof greeting === 'string'",
          errorHint:
            'Make sure you declared a variable called `greeting` with type `string`.',
        },
        {
          description: 'year is a number',
          test: "typeof year === 'number'",
          errorHint:
            'Make sure you declared a variable called `year` with type `number`.',
        },
        {
          description: 'isTypeSafe is a boolean',
          test: "typeof isTypeSafe === 'boolean'",
          errorHint:
            'Make sure you declared a variable called `isTypeSafe` with type `boolean`.',
        },
      ],
    },

    // --------------------------------------------------------
    // Challenge 2: Type Inference
    // --------------------------------------------------------
    {
      id: 'L1-C2',
      level: 1,
      number: 2,
      title: 'Type Inference',
      difficulty: 'easy',
      xp: 10,

      description: `You don't **always** need to write type annotations. TypeScript is smart \
enough to **infer** the type from the value you assign.

\`\`\`ts
let city = "Tokyo";   // TypeScript infers: string
let temp = 28;        // TypeScript infers: number
let humid = true;     // TypeScript infers: boolean
\`\`\`

Hover over these variables in your editor and you will see TypeScript already knows their \
types — no annotation needed!

**When should you rely on inference?**
- For simple variable declarations with an initial value, inference is preferred — it keeps \
your code cleaner.
- Add explicit annotations when the type is not obvious from the value, or when you want to \
be intentional about a wider type (e.g., \`let id: string | number\`).

One important detail: \`const\` declarations get **narrower** inferred types than \`let\`:

\`\`\`ts
let fruit = "apple";    // type: string
const veggie = "carrot"; // type: "carrot" (literal type!)
\`\`\`

Because a \`const\` can never be reassigned, TypeScript narrows it to the exact literal value.`,

      mission:
        'Declare variables using `let` (no type annotations!) so that TypeScript infers the correct types. Create `language` (inferred as `string`), `version` (inferred as `number`), and `isStrictMode` (inferred as `boolean`). Then declare a `const` called `FRAMEWORK` and observe the literal type.',

      scaffold: `// ============================================
// Challenge 2: Type Inference
// ============================================
// Let TypeScript infer your types — no annotations!

// TODO: Declare 'language' with let, assigned to any string value (no type annotation)

// TODO: Declare 'version' with let, assigned to any number value (no type annotation)

// TODO: Declare 'isStrictMode' with let, assigned to any boolean value (no type annotation)

// TODO: Declare 'FRAMEWORK' with const, assigned to a string value
//       Notice how the inferred type is a literal, not just 'string'
`,

      solution: `// ============================================
// Challenge 2: Type Inference
// ============================================
// Let TypeScript infer your types — no annotations!

let language = "TypeScript";

let version = 5;

let isStrictMode = true;

const FRAMEWORK = "TSchool";
`,

      hints: [
        'Just use `let variableName = value;` — no colon, no type. TypeScript figures it out.',
        'For the const, use `const FRAMEWORK = "SomeString";` — the type will be the literal string, not `string`.',
        'Example: `let language = "TypeScript"; let version = 5; let isStrictMode = true; const FRAMEWORK = "React";`',
      ],

      tests: [
        {
          description: 'language is a string',
          test: "typeof language === 'string'",
          errorHint:
            'Declare `language` using `let` and assign it a string value (no type annotation).',
        },
        {
          description: 'version is a number',
          test: "typeof version === 'number'",
          errorHint:
            'Declare `version` using `let` and assign it a number value (no type annotation).',
        },
        {
          description: 'isStrictMode is a boolean',
          test: "typeof isStrictMode === 'boolean'",
          errorHint:
            'Declare `isStrictMode` using `let` and assign it a boolean value (no type annotation).',
        },
        {
          description: 'FRAMEWORK is a string constant',
          test: "typeof FRAMEWORK === 'string' && FRAMEWORK.length > 0",
          errorHint:
            'Declare `FRAMEWORK` using `const` and assign it a non-empty string value.',
        },
      ],
    },

    // --------------------------------------------------------
    // Challenge 3: Any vs Unknown
    // --------------------------------------------------------
    {
      id: 'L1-C3',
      level: 1,
      number: 3,
      title: 'Any vs Unknown',
      difficulty: 'medium',
      xp: 25,

      description: `Sometimes you genuinely don't know what type a value will be. TypeScript \
gives you two escape hatches: \`any\` and \`unknown\`.

### \`any\` — The Escape Hatch (use sparingly!)
\`any\` turns off type-checking completely. You can do anything with an \`any\` value and \
TypeScript won't complain:

\`\`\`ts
let data: any = "hello";
data = 42;            // fine
data.foo.bar.baz;     // fine — no errors, but will crash at runtime!
\`\`\`

\`any\` is like removing your seatbelt. Legal, but risky.

### \`unknown\` — The Safe Alternative
\`unknown\` also accepts any value, but it forces you to **check the type** before using it:

\`\`\`ts
let input: unknown = "hello";
// input.toUpperCase();        // ERROR — can't use it directly
if (typeof input === "string") {
  input.toUpperCase();         // OK — TypeScript knows it's a string now
}
\`\`\`

**Rule of thumb:** If you need a flexible type, reach for \`unknown\` first. Only use \
\`any\` as a last resort or when migrating JavaScript code incrementally.`,

      mission:
        'Declare a variable `flexible` typed as `any` and assign it a number. Then declare a variable `safe` typed as `unknown` and assign it a string. Finally, create a variable `result` of type `string` by narrowing `safe` with a typeof check inside an if-block.',

      scaffold: `// ============================================
// Challenge 3: Any vs Unknown
// ============================================
// Learn the difference between any and unknown.

// TODO: Declare 'flexible' with type 'any', assign it the number 42

// TODO: Declare 'safe' with type 'unknown', assign it the string "TypeScript"

// TODO: Declare 'result' as type string.
//       Use a typeof check to narrow 'safe' and assign it to 'result'.
//       If 'safe' is not a string, assign "fallback" to 'result'.
let result: string;
`,

      solution: `// ============================================
// Challenge 3: Any vs Unknown
// ============================================
// Learn the difference between any and unknown.

let flexible: any = 42;

let safe: unknown = "TypeScript";

let result: string;
if (typeof safe === "string") {
  result = safe;
} else {
  result = "fallback";
}
`,

      hints: [
        '`any` and `unknown` are both types you write after the colon: `let x: any = ...`',
        'To narrow `unknown`, use `if (typeof safe === "string") { result = safe; }`',
        'Don\'t forget the else branch! Set `result = "fallback"` when `safe` is not a string.',
      ],

      tests: [
        {
          description: 'flexible is declared and holds a number',
          test: "typeof flexible !== 'undefined' && flexible === 42",
          errorHint:
            'Declare `flexible` with type `any` and assign it the number `42`.',
        },
        {
          description: 'safe is declared and holds a string',
          test: "typeof safe !== 'undefined' && safe === 'TypeScript'",
          errorHint:
            'Declare `safe` with type `unknown` and assign it the string `"TypeScript"`.',
        },
        {
          description: 'result is correctly narrowed to a string',
          test: "typeof result === 'string' && result === 'TypeScript'",
          errorHint:
            'Use a `typeof` check on `safe`. If it is a string, assign it to `result`; otherwise assign `"fallback"`.',
        },
      ],
    },

    // --------------------------------------------------------
    // Challenge 4: Type Assertions
    // --------------------------------------------------------
    {
      id: 'L1-C4',
      level: 1,
      number: 4,
      title: 'Type Assertions',
      difficulty: 'medium',
      xp: 25,

      description: `Sometimes **you** know more about a value's type than TypeScript does. In \
those cases you can use a **type assertion** to tell the compiler: "Trust me, I know what \
this is."

### The \`as\` keyword

\`\`\`ts
let value: unknown = "hello world";
let len: number = (value as string).length; // you assert it's a string
\`\`\`

Type assertions don't change the runtime value — they only tell the compiler to treat the \
value as a different type. If you're wrong, you'll get a runtime error, not a compile error.

### When are assertions useful?
- Working with DOM elements: \`document.getElementById("app") as HTMLDivElement\`
- Narrowing \`unknown\` when you are certain of the type
- Working with data from external sources (APIs, JSON parsing)

### Assertions are NOT casts
Unlike other languages, TypeScript assertions don't convert data. \
\`"42" as number\` won't turn a string into a number — it will just lie to the compiler.

TypeScript also prevents obviously wrong assertions. You can't assert \`string\` directly \
to \`number\`. You'd need a double assertion through \`unknown\` first — which is almost \
always a sign you're doing something wrong.

\`\`\`ts
let x = "hello" as unknown as number; // compiles, but a terrible idea
\`\`\``,

      mission:
        'Given a variable `input` of type `unknown`, use type assertions to: (1) assert it as a `string` and get its `.length` into `inputLength`, and (2) assert `rawData` as an object with a `name` property to extract the name into `userName`.',

      scaffold: `// ============================================
// Challenge 4: Type Assertions
// ============================================
// Use the 'as' keyword to assert types.

const input: unknown = "TypeScript is awesome";

// TODO: Use a type assertion to treat 'input' as a string
//       and get its .length into a variable called 'inputLength'

const rawData: unknown = { name: "Alice", level: 5 };

// TODO: Assert 'rawData' as '{ name: string; level: number }'
//       and extract the 'name' property into a variable called 'userName'
`,

      solution: `// ============================================
// Challenge 4: Type Assertions
// ============================================
// Use the 'as' keyword to assert types.

const input: unknown = "TypeScript is awesome";

const inputLength: number = (input as string).length;

const rawData: unknown = { name: "Alice", level: 5 };

const userName: string = (rawData as { name: string; level: number }).name;
`,

      hints: [
        'The syntax is `(expression as Type)`. Wrap it in parentheses to access properties: `(value as string).length`.',
        'For `rawData`, the full assertion type is `{ name: string; level: number }`. Use it like: `(rawData as { name: string; level: number }).name`.',
        'Full answer: `const inputLength: number = (input as string).length;` and `const userName: string = (rawData as { name: string; level: number }).name;`',
      ],

      tests: [
        {
          description: 'inputLength is the length of the input string',
          test: "typeof inputLength === 'number' && inputLength === 21",
          errorHint:
            'Assert `input` as `string` and access `.length`. The string "TypeScript is awesome" has 21 characters.',
        },
        {
          description: 'userName is extracted from rawData',
          test: "typeof userName === 'string' && userName === 'Alice'",
          errorHint:
            'Assert `rawData` as `{ name: string; level: number }` and access `.name`.',
        },
      ],
    },

    // --------------------------------------------------------
    // Challenge 5: Const Assertions
    // --------------------------------------------------------
    {
      id: 'L1-C5',
      level: 1,
      number: 5,
      title: 'Const Assertions',
      difficulty: 'medium',
      xp: 25,

      description: `You already learned that \`const\` gives variables narrower types. But \
what about objects and arrays declared with \`const\`? Their **properties** can still be \
mutated:

\`\`\`ts
const config = { host: "localhost", port: 3000 };
config.port = 8080; // totally fine — const only prevents reassignment of 'config'
\`\`\`

TypeScript infers \`config\` as \`{ host: string; port: number }\` — wide types for the \
properties.

### Enter \`as const\`
Adding \`as const\` at the end makes **everything deeply readonly** and narrows all values \
to their literal types:

\`\`\`ts
const config = { host: "localhost", port: 3000 } as const;
// type: { readonly host: "localhost"; readonly port: 3000 }
config.port = 8080; // ERROR — readonly!
\`\`\`

It works on arrays too:

\`\`\`ts
const colors = ["red", "green", "blue"] as const;
// type: readonly ["red", "green", "blue"]
colors.push("yellow"); // ERROR — readonly tuple
\`\`\`

### Why is this useful?
- Defining constant configuration objects
- Creating union types from arrays: \`type Color = typeof colors[number]\`
- Ensuring values can never be accidentally changed
- Replacing enums with plain objects in many cases`,

      mission:
        'Create an object `APP_CONFIG` using `as const` with properties `appName` (string), `maxRetries` (number), and `debug` (boolean). Then create a tuple `DIRECTIONS` using `as const` with exactly four string elements: "north", "south", "east", "west".',

      scaffold: `// ============================================
// Challenge 5: Const Assertions
// ============================================
// Use 'as const' for immutable, literal types.

// TODO: Declare APP_CONFIG with 'as const'
//       Properties: appName (any string), maxRetries (any number), debug (true or false)
//       Example: const APP_CONFIG = { ... } as const;

// TODO: Declare DIRECTIONS as a readonly tuple using 'as const'
//       Values: "north", "south", "east", "west"
//       Example: const DIRECTIONS = [ ... ] as const;
`,

      solution: `// ============================================
// Challenge 5: Const Assertions
// ============================================
// Use 'as const' for immutable, literal types.

const APP_CONFIG = {
  appName: "TSchool",
  maxRetries: 3,
  debug: false,
} as const;

const DIRECTIONS = ["north", "south", "east", "west"] as const;
`,

      hints: [
        'Put `as const` after the closing brace/bracket: `const x = { ... } as const;`',
        '`APP_CONFIG` needs three properties: `appName`, `maxRetries`, and `debug`. `DIRECTIONS` is an array of four strings.',
        'Example: `const APP_CONFIG = { appName: "MyApp", maxRetries: 3, debug: true } as const; const DIRECTIONS = ["north", "south", "east", "west"] as const;`',
      ],

      tests: [
        {
          description: 'APP_CONFIG has appName, maxRetries, and debug properties',
          test: "typeof APP_CONFIG === 'object' && typeof APP_CONFIG.appName === 'string' && typeof APP_CONFIG.maxRetries === 'number' && typeof APP_CONFIG.debug === 'boolean'",
          errorHint:
            'Make sure `APP_CONFIG` is an object with `appName` (string), `maxRetries` (number), and `debug` (boolean).',
        },
        {
          description: 'APP_CONFIG is readonly (uses as const)',
          test: "(() => { try { (APP_CONFIG as any).appName = 'changed'; return APP_CONFIG.appName !== 'changed'; } catch { return true; } })()",
          errorHint:
            'Did you add `as const` after the object? It should make the properties readonly.',
        },
        {
          description: 'DIRECTIONS is a readonly tuple with 4 compass directions',
          test: "Array.isArray(DIRECTIONS) && DIRECTIONS.length === 4 && DIRECTIONS[0] === 'north' && DIRECTIONS[1] === 'south' && DIRECTIONS[2] === 'east' && DIRECTIONS[3] === 'west'",
          errorHint:
            'Declare DIRECTIONS as `["north", "south", "east", "west"] as const`. Order matters!',
        },
      ],
    },

    // --------------------------------------------------------
    // Challenge 6: BOSS — The Type Fixer
    // --------------------------------------------------------
    {
      id: 'L1-C6',
      level: 1,
      number: 6,
      title: 'BOSS: The Type Fixer',
      difficulty: 'boss',
      xp: 200,

      description: `It's time for your first boss battle! A junior developer wrote some \
TypeScript, but they didn't understand the type system yet. The code is full of errors — \
wrong annotations, missing types, improper use of \`any\`, and broken assertions.

Your mission: **fix every type error** without changing the runtime logic. The values and \
behavior must stay the same — only the types need correcting.

This challenge tests everything you've learned:
- Correct type annotations
- Type inference
- \`any\` vs \`unknown\` and proper narrowing
- Type assertions with \`as\`
- \`as const\` for readonly literal types

Take your time. Read each line carefully. Think about what the **intended** behavior is, \
and pick the right type tool to fix it.

Good luck, warrior.`,

      mission:
        'Fix all the type errors in the code below. Do not change any runtime values or logic — only fix the types, annotations, and assertions.',

      scaffold: `// ============================================
// BOSS BATTLE: The Type Fixer
// ============================================
// Fix every type error. Don't change runtime values!

// BUG 1: Wrong type annotation
let playerName: number = "Hero";

// BUG 2: Wrong type annotation
let score: string = 100;

// BUG 3: Wrong type annotation
let isAlive: string = true;

// BUG 4: Using 'any' when 'unknown' is safer
let userInput: any = "some input";
// Make userInput 'unknown' and properly narrow it to get the uppercase version
let shout: string = userInput.toUpperCase();

// BUG 5: Incorrect assertion — rawScore is a string that looks like a number
const rawScore: unknown = "250";
const parsedScore: number = rawScore as number;

// BUG 6: This object should be fully immutable
const GAME_CONFIG = {
  title: "TSchool Quest",
  maxPlayers: 4,
  online: true,
};
GAME_CONFIG.maxPlayers = 99;
`,

      solution: `// ============================================
// BOSS BATTLE: The Type Fixer
// ============================================
// Fix every type error. Don't change runtime values!

// BUG 1: Wrong type annotation
let playerName: string = "Hero";

// BUG 2: Wrong type annotation
let score: number = 100;

// BUG 3: Wrong type annotation
let isAlive: boolean = true;

// BUG 4: Using 'any' when 'unknown' is safer
let userInput: unknown = "some input";
// Make userInput 'unknown' and properly narrow it to get the uppercase version
let shout: string;
if (typeof userInput === "string") {
  shout = userInput.toUpperCase();
} else {
  shout = "";
}

// BUG 5: Incorrect assertion — rawScore is a string that looks like a number
const rawScore: unknown = "250";
const parsedScore: number = Number(rawScore as string);

// BUG 6: This object should be fully immutable
const GAME_CONFIG = {
  title: "TSchool Quest",
  maxPlayers: 4,
  online: true,
} as const;
`,

      hints: [
        'Start with the easy ones: match each annotation to the actual value. `"Hero"` is a string, `100` is a number, `true` is a boolean.',
        'For BUG 4, change `any` to `unknown`, then use `if (typeof userInput === "string")` to narrow before calling `.toUpperCase()`. For BUG 5, assert as `string` first, then convert with `Number()`.',
        'For BUG 6, add `as const` after the object literal and remove the line that mutates `maxPlayers`.',
      ],

      tests: [
        {
          description: 'playerName is a string with value "Hero"',
          test: "typeof playerName === 'string' && playerName === 'Hero'",
          errorHint:
            'Change the type annotation of `playerName` from `number` to `string`.',
        },
        {
          description: 'score is a number with value 100',
          test: "typeof score === 'number' && score === 100",
          errorHint:
            'Change the type annotation of `score` from `string` to `number`.',
        },
        {
          description: 'isAlive is a boolean with value true',
          test: "typeof isAlive === 'boolean' && isAlive === true",
          errorHint:
            'Change the type annotation of `isAlive` from `string` to `boolean`.',
        },
        {
          description: 'shout is the uppercase version of userInput',
          test: "typeof shout === 'string' && shout === 'SOME INPUT'",
          errorHint:
            'Change `userInput` to `unknown`, then narrow with `typeof` before calling `.toUpperCase()`.',
        },
        {
          description: 'parsedScore is the numeric value 250',
          test: "typeof parsedScore === 'number' && parsedScore === 250",
          errorHint:
            'Assert `rawScore` as `string`, then convert to a number: `Number(rawScore as string)`.',
        },
        {
          description: 'GAME_CONFIG has the correct values',
          test: "GAME_CONFIG.title === 'TSchool Quest' && GAME_CONFIG.maxPlayers === 4 && GAME_CONFIG.online === true",
          errorHint:
            'Add `as const` to GAME_CONFIG and remove the mutation line (`GAME_CONFIG.maxPlayers = 99`).',
        },
      ],
    },
  ],
};
