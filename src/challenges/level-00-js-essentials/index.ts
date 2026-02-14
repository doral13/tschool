// ============================================================
// TSchool - Level 00: JavaScript Essentials
// ============================================================
// This level covers JavaScript fundamentals that TypeScript
// builds on top of. If you're coming from Python, Java, C#,
// or another language, this will get you comfortable with
// JS-specific syntax and idioms before we dive into types.

import { LevelDefinition } from '../../engine/types';

export const level00: LevelDefinition = {
  number: 0,
  title: 'JavaScript Essentials',
  description:
    'Before we dive into TypeScript, let\'s cover the JavaScript foundations it\'s built on. If you\'re coming from Python, Java, C#, or another language, this level will get you comfortable with JS-specific syntax and idioms.',

  challenges: [
    // --------------------------------------------------------
    // Challenge 1: Variables & Constants
    // --------------------------------------------------------
    {
      id: 'L0-C1',
      level: 0,
      number: 1,
      title: 'Variables & Constants',
      difficulty: 'easy',
      xp: 10,

      description: `In JavaScript (and TypeScript), there are two main ways to declare variables: \
\`let\` and \`const\`. If you're coming from Python, Java, or C#, this replaces \
\`var\`/\`val\`/\`final\`/plain variable declarations.

### \`let\` — a variable that can be reassigned

\`\`\`ts
let score = 0;
score = 10;     // fine — let allows reassignment
score = 20;     // still fine
\`\`\`

### \`const\` — a constant that cannot be reassigned

\`\`\`ts
const name = "Alice";
name = "Bob";   // ERROR — const cannot be reassigned
\`\`\`

Use \`const\` by default. Only use \`let\` when you actually need to reassign a variable. \
This is a widely adopted best practice in the JS/TS community.

### What about \`var\`?
JavaScript also has \`var\`, which is the old way of declaring variables. It has confusing \
scoping rules and should be avoided in modern code. Pretend it doesn't exist — always use \
\`let\` or \`const\`.

### Semicolons
Semicolons at the end of statements are **optional** in JavaScript. Both of these are valid:

\`\`\`ts
let a = 1;
let b = 2
\`\`\`

Most TypeScript projects use semicolons, and we will too — but the language doesn't require them.

### \`console.log\`
To print output (like Python's \`print\` or Java's \`System.out.println\`), use \`console.log\`:

\`\`\`ts
console.log("Hello!");        // prints: Hello!
console.log(42);              // prints: 42
console.log("Score:", score); // prints: Score: 10
\`\`\``,

      mission:
        'Declare a `const` called `LANGUAGE` with the value `"TypeScript"`. Declare a `let` called `level` with the value `1`. Then reassign `level` to `2`.',

      scaffold: `// ============================================
// Challenge 1: Variables & Constants
// ============================================
// Practice declaring variables with let and const.

// TODO: Declare a constant called LANGUAGE with the value "TypeScript"

// TODO: Declare a variable called level with the value 1 (use let)

// TODO: Reassign level to 2
`,

      solution: `// ============================================
// Challenge 1: Variables & Constants
// ============================================
// Practice declaring variables with let and const.

const LANGUAGE = "TypeScript";

let level = 1;

level = 2;
`,

      hints: [
        'Use `const` for values that never change and `let` for values that do.',
        'The syntax is `const NAME = value;` and `let name = value;` — try applying that pattern.',
        'To reassign a `let` variable, just write `variableName = newValue;` on a new line.',
      ],

      tests: [
        {
          description: 'LANGUAGE is "TypeScript"',
          test: "LANGUAGE === 'TypeScript'",
          errorHint:
            'Make sure your constant is named exactly `LANGUAGE` (all caps) and the value is the string `"TypeScript"` with that exact casing.',
        },
        {
          description: 'level has been reassigned to 2',
          test: 'level === 2',
          errorHint:
            'Did you declare `level` with `let` (not `const`)? You need to reassign it on a separate line after declaring it.',
        },
      ],
    },

    // --------------------------------------------------------
    // Challenge 2: Equality & Comparisons
    // --------------------------------------------------------
    {
      id: 'L0-C2',
      level: 0,
      number: 2,
      title: 'Equality & Comparisons',
      difficulty: 'easy',
      xp: 10,

      description: `Unlike most languages, JavaScript has **two** kinds of equality operators. \
This trips up everyone coming from Python, Java, or C#.

### Strict equality: \`===\` and \`!==\`
These compare both **value and type**. No surprises — this is what you'd expect:

\`\`\`ts
5 === 5         // true  — same value, same type
5 === "5"       // false — number vs string, different types
true === 1      // false — boolean vs number
null === undefined // false — different types
\`\`\`

### Loose equality: \`==\` and \`!=\` (avoid these!)
These try to **convert types** before comparing, leading to bizarre results:

\`\`\`ts
5 == "5"        // true!  — string "5" gets converted to number 5
"" == false     // true!  — empty string is "falsy"
null == undefined // true! — special case
0 == ""         // true!  — both are "falsy"
\`\`\`

**The rule is simple: always use \`===\` and \`!==\`.** Forget that \`==\` exists. \
TypeScript will even warn you in some cases if you use \`==\` with mismatched types.

### Other comparison operators
These work like in other languages — no JS-specific quirks:
- \`>\`, \`<\`, \`>=\`, \`<=\` for numeric comparisons
- \`&&\` (and), \`||\` (or), \`!\` (not) for logical operations`,

      mission:
        'Create six `const` variables holding the results of comparisons. Use `===` for all equality checks. Follow the variable names and expected values in the scaffold.',

      scaffold: `// ============================================
// Challenge 2: Equality & Comparisons
// ============================================
// Always use === for equality checks!

// TODO: Does the number 42 strictly equal the number 42?
//       Store the boolean result in a const called 'sameNumbers'.

// TODO: Does the string "hello" strictly equal the string "hello"?
//       Store the result in a const called 'sameStrings'.

// TODO: Does the number 42 strictly equal the string "42"?
//       Use the variables below to compare — store the result in 'mixedTypes'.
//       These variables simulate values coming from user input, where
//       TypeScript doesn't know the exact types at compile time.
const theNumber = 42;
const theString: any = "42";

// TODO: Is 10 greater than 5?
//       Store the result in a const called 'isGreater'.

// TODO: What does (true && false) evaluate to?
//       Store the result in a const called 'bothTrue'.

// TODO: What does !false evaluate to?
//       Store the result in a const called 'notFalse'.
`,

      solution: `// ============================================
// Challenge 2: Equality & Comparisons
// ============================================
// Always use === for equality checks!

const sameNumbers = 42 === 42;

const sameStrings = "hello" === "hello";

const theNumber = 42;
const theString: any = "42";
const mixedTypes = theNumber === theString;

const isGreater = 10 > 5;

const bothTrue = true && false;

const notFalse = !false;
`,

      hints: [
        '`===` compares both value AND type. Think about what happens when a number meets a string.',
        '`&&` is only `true` when BOTH sides are `true`. `!` flips a boolean to its opposite.',
        'Store each comparison result directly: `const name = <expression>;` — the result is a boolean.',
      ],

      tests: [
        {
          description: 'sameNumbers is true (42 === 42)',
          test: 'sameNumbers === true',
          errorHint: 'Two identical numbers compared with `===` should be `true`. Make sure you\'re storing the comparison result, not a hardcoded value.',
        },
        {
          description: 'sameStrings is true ("hello" === "hello")',
          test: 'sameStrings === true',
          errorHint: 'Two identical strings compared with `===` should be `true`.',
        },
        {
          description: 'mixedTypes is false (42 === "42" — different types!)',
          test: 'mixedTypes === false',
          errorHint:
            'Strict equality `===` returns `false` when the types differ — a number is not a string, even if the digits match.',
        },
        {
          description: 'isGreater is true (10 > 5)',
          test: 'isGreater === true',
          errorHint: 'Use the `>` operator to compare the two numbers.',
        },
        {
          description: 'bothTrue is false (true && false)',
          test: 'bothTrue === false',
          errorHint: '`&&` (logical AND) only returns `true` when both sides are `true`. If either side is `false`, the result is `false`.',
        },
        {
          description: 'notFalse is true (!false)',
          test: 'notFalse === true',
          errorHint: 'The `!` operator flips a boolean — it turns `false` into `true` and vice versa.',
        },
      ],
    },

    // --------------------------------------------------------
    // Challenge 3: Functions & Arrows
    // --------------------------------------------------------
    {
      id: 'L0-C3',
      level: 0,
      number: 3,
      title: 'Functions & Arrows',
      difficulty: 'medium',
      xp: 20,

      description: `JavaScript has two main ways to write functions. Both work in TypeScript.

### Traditional function declaration
This is similar to other languages. In TypeScript, you must label each parameter \
with its type using \`: type\` after the parameter name — this is how TypeScript knows \
what kind of values your function accepts:

\`\`\`ts
function greet(name: string) {
  return "Hello, " + name + "!";
}
greet("Alice"); // "Hello, Alice!"
\`\`\`

Don't worry about the full type system yet — for now, the types you need are \
\`number\`, \`string\`, and \`boolean\`. We'll cover types in depth starting in Level 1.

### Arrow functions (the modern way)
Arrow functions use \`=>\` (a "fat arrow") instead of the \`function\` keyword. They're the \
most common style in modern JavaScript and TypeScript:

\`\`\`ts
const greet = (name: string) => {
  return "Hello, " + name + "!";
};
\`\`\`

### Short arrow functions (implicit return)
If the function body is a single expression, you can drop the curly braces AND the \`return\` keyword:

\`\`\`ts
const double = (x: number) => x * 2;         // returns x * 2
const isEven = (n: number) => n % 2 === 0;   // returns true or false
\`\`\`

This is called an **implicit return** — the expression's value is automatically returned.

### Functions as values
In JavaScript, functions are values — you can store them in variables, pass them as \
arguments to other functions, and return them from functions. This is a core concept:

\`\`\`ts
const numbers = [1, 2, 3];
const doubled = numbers.map((n) => n * 2); // [2, 4, 6]
//                          ^^^^^^^^^^^^^^
//                      function passed as an argument!
\`\`\`

(Notice \`n\` doesn't need a type annotation here — TypeScript infers it \
from the array. You'll learn more about this in later levels.)

If you're from Python, this is like passing a lambda. If you're from Java, it's like \
a functional interface / lambda expression.`,

      mission:
        'Write a traditional function `add` that takes two `number` parameters and returns their sum. Then write an arrow function `multiply` that does multiplication. Finally, write a short arrow function `isPositive` that returns whether a number is greater than 0.',

      scaffold: `// ============================================
// Challenge 3: Functions & Arrows
// ============================================
// Practice both function styles.
// Remember: in TypeScript, label each parameter with its type
// using : type — e.g., (x: number, y: number)

// TODO: Write a traditional function called 'add' that takes
//       two number parameters and returns their sum.
//       Example: add(2, 3) should return 5

// TODO: Write an arrow function called 'multiply' that takes
//       two number parameters and returns their product.
//       Store it in a const. Use the block body style with { return ... }

// TODO: Write a short arrow function called 'isPositive' that
//       takes one number parameter and returns true if it's greater than 0.
//       Use the implicit return style (no curly braces, no return keyword).
`,

      solution: `// ============================================
// Challenge 3: Functions & Arrows
// ============================================
// Practice both function styles.
// Remember: in TypeScript, label each parameter with its type
// using : type — e.g., (x: number, y: number)

function add(a: number, b: number) {
  return a + b;
}

const multiply = (a: number, b: number) => {
  return a * b;
};

const isPositive = (n: number) => n > 0;
`,

      hints: [
        'Traditional function syntax: `function name(param: type, param: type) { return ...; }`',
        'Arrow function syntax: `const name = (param: type) => { return ...; };` — don\'t forget the semicolon after the closing brace.',
        'For implicit return, drop the curly braces AND the return keyword: `const name = (param: type) => expression;`',
      ],

      tests: [
        {
          description: 'add(2, 3) returns 5',
          test: 'add(2, 3) === 5',
          errorHint:
            'Make sure your function uses `return` to return the sum. Without `return`, the function returns `undefined`.',
        },
        {
          description: 'add(0, 0) returns 0',
          test: 'add(0, 0) === 0',
          errorHint: 'Your `add` function should work with any two numbers, including zeros.',
        },
        {
          description: 'multiply(4, 5) returns 20',
          test: 'multiply(4, 5) === 20',
          errorHint:
            'Store the arrow function in a `const`. Use `{ return ...; }` for the block body style.',
        },
        {
          description: 'isPositive(5) returns true',
          test: 'isPositive(5) === true',
          errorHint: 'Use implicit return (no curly braces) — the expression after `=>` is the return value.',
        },
        {
          description: 'isPositive(-3) returns false',
          test: 'isPositive(-3) === false',
          errorHint:
            'Your function should check whether the number is greater than 0.',
        },
        {
          description: 'isPositive(0) returns false',
          test: 'isPositive(0) === false',
          errorHint: '0 is not positive — make sure you\'re using `>` (not `>=`).',
        },
      ],
    },

    // --------------------------------------------------------
    // Challenge 4: Null, Undefined & Friends
    // --------------------------------------------------------
    {
      id: 'L0-C4',
      level: 0,
      number: 4,
      title: 'Null, Undefined & Friends',
      difficulty: 'medium',
      xp: 20,

      description: `Unlike most languages that have one "nothing" value (\`None\` in Python, \
\`null\` in Java/C#), JavaScript has **two**: \`null\` and \`undefined\`.

### \`undefined\` — "no value was set"
A variable that has been declared but not assigned a value is \`undefined\`:

\`\`\`ts
let x: undefined;
console.log(x); // undefined
\`\`\`

(We write \`: undefined\` to tell TypeScript what type this variable holds. \
In pure JavaScript you'd just write \`let x;\`, but TypeScript needs the label.)

Functions that don't return anything also return \`undefined\`. Accessing a property \
that doesn't exist gives \`undefined\`.

### \`null\` — "intentionally empty"
\`null\` is used when you want to explicitly say "this has no value":

\`\`\`ts
let user = null; // deliberately empty
\`\`\`

### Truthy and falsy values
JavaScript treats some values as "false-like" (**falsy**) in conditions. Everything else \
is **truthy**. The falsy values are:

- \`false\`
- \`0\` (and \`-0\`)
- \`""\` (empty string)
- \`null\`
- \`undefined\`
- \`NaN\` (not-a-number)

This matters because you can use values directly in \`if\` statements:

\`\`\`ts
const name = "";
if (name) {
  // this does NOT run — empty string is falsy
}
\`\`\`

### The nullish coalescing operator: \`??\`
\`??\` provides a fallback value when something is \`null\` or \`undefined\`:

\`\`\`ts
const input = null;
const value = input ?? "default"; // "default"

const zero = 0;
const result = zero ?? 42; // 0 — because 0 is NOT null/undefined
\`\`\`

This is different from \`||\` (logical OR), which falls back on **any** falsy value:

\`\`\`ts
const zero = 0;
const a = zero || 42; // 42 — because 0 is falsy
const b = zero ?? 42; // 0  — because 0 is not null/undefined
\`\`\`

### Optional chaining: \`?.\`
Safely access properties on values that might be \`null\` or \`undefined\`:

\`\`\`ts
// Imagine this function loads a user from a database — it returns null if not found
function findUser(): { name: string } | null { return null; }

const user = findUser();
const name = user?.name; // undefined (no crash!)
// Without ?. this would crash: user.name → TypeError!
\`\`\`

The \`?.\` operator checks "is this \`null\` or \`undefined\`?" — if yes, it short-circuits \
and returns \`undefined\` instead of crashing.`,

      mission:
        'Create variables demonstrating your understanding of null, undefined, falsy values, `??`, and `?.`. Follow the TODO comments in the scaffold.',

      scaffold: `// ============================================
// Challenge 4: Null, Undefined & Friends
// ============================================
// Master JavaScript's "nothing" values.

// TODO: Declare a variable called 'unset' using let, typed as undefined,
//       but do NOT assign it a value. What value does it hold?

// TODO: Declare a const called 'empty' and set it to null.

// TODO: The ?? operator provides a fallback when a value is null or undefined.
//       Given the variable below, create a const 'withFallback' that uses ??
//       to fall back to the string "fallback" if maybeNull is null.
const maybeNull = null;

// TODO: What happens when you use ?? with 0? Create a const 'safeCount'
//       that uses ?? to fall back to 10. Will you get 0 or 10?
const count = 0;

// TODO: Use ?. (optional chaining) to safely access the 'host' property.
//       The function below might return null. Create a const 'host' that
//       safely reads config?.host without crashing.
function loadConfig(): { host: string } | null { return null; }
const config = loadConfig();
`,

      solution: `// ============================================
// Challenge 4: Null, Undefined & Friends
// ============================================
// Master JavaScript's "nothing" values.

let unset: undefined;

const empty = null;

const maybeNull = null;
const withFallback = maybeNull ?? "fallback";

const count = 0;
const safeCount = count ?? 10;

function loadConfig(): { host: string } | null { return null; }
const config = loadConfig();
const host = config?.host;
`,

      hints: [
        'A `let` variable declared without a value automatically holds `undefined`. For null, you assign it explicitly.',
        '`??` triggers ONLY on `null` or `undefined` — not on `0`, `""`, or `false`. Think about what that means for `count`.',
        '`?.` is like saying "if this isn\'t null/undefined, access the property — otherwise give me undefined."',
      ],

      tests: [
        {
          description: 'unset is undefined (declared but not assigned)',
          test: 'unset === undefined',
          errorHint:
            'Declare the variable with `let` and the type `: undefined`, but don\'t assign a value. It will be `undefined` automatically.',
        },
        {
          description: 'empty is null',
          test: 'empty === null',
          errorHint: 'Assign `null` directly to a `const`.',
        },
        {
          description: 'withFallback is "fallback" (null ?? "fallback")',
          test: 'withFallback === "fallback"',
          errorHint:
            'Use `??` between `maybeNull` and your fallback string. Since `maybeNull` is null, `??` returns the right side.',
        },
        {
          description: 'safeCount is 0 (0 ?? 10 keeps the 0)',
          test: 'safeCount === 0',
          errorHint:
            'Remember: `??` only falls back on `null`/`undefined`, NOT on `0`. So `0 ?? 10` stays `0`.',
        },
        {
          description: 'host is undefined (null?.host is safe)',
          test: 'host === undefined',
          errorHint:
            'Use `?.` to safely access the `host` property on `config`. Since config is null, it returns undefined instead of crashing.',
        },
      ],
    },

    // --------------------------------------------------------
    // Challenge 5: Templates & Destructuring
    // --------------------------------------------------------
    {
      id: 'L0-C5',
      level: 0,
      number: 5,
      title: 'Templates & Destructuring',
      difficulty: 'hard',
      xp: 30,

      description: `### Template literals (template strings)
Instead of concatenating strings with \`+\`, JavaScript lets you embed expressions \
inside backtick strings using \`\${ }\`:

\`\`\`ts
const name = "Alice";
const age = 30;

// Old way (concatenation):
const msg1 = "Hello, " + name + "! You are " + age + ".";

// Modern way (template literal):
const msg2 = \`Hello, \${name}! You are \${age}.\`;

// Both produce: "Hello, Alice! You are 30."
\`\`\`

Note the backticks (\\\`) instead of regular quotes. Any expression works inside \`\${ }\`:

\`\`\`ts
const result = \`2 + 2 = \${2 + 2}\`; // "2 + 2 = 4"
\`\`\`

Template literals also support **multi-line strings** without any special escaping:

\`\`\`ts
const poem = \`Roses are red,
Violets are blue,
TypeScript is great,
And so are you.\`;
\`\`\`

### Array destructuring
Extract values from an array into named variables in one line:

\`\`\`ts
const coords = [10, 20, 30];
const [x, y, z] = coords;
// x = 10, y = 20, z = 30
\`\`\`

### Object destructuring
Extract properties from an object into variables:

\`\`\`ts
const user = { name: "Alice", age: 30, city: "NYC" };
const { name, age } = user;
// name = "Alice", age = 30
\`\`\`

### The spread operator: \`...\`
Spread copies elements from one array/object into another:

\`\`\`ts
const a = [1, 2];
const b = [0, ...a, 3]; // [0, 1, 2, 3]

const defaults = { color: "blue", size: 10 };
const custom = { ...defaults, size: 20 }; // { color: "blue", size: 20 }
\`\`\`

The spread operator is also used for **rest parameters** in functions — collecting \
any number of arguments into an array:

\`\`\`ts
const sum = (...nums: number[]) => nums.reduce((a, b) => a + b, 0);
sum(1, 2, 3, 4); // 10
\`\`\``,

      mission:
        'Use template literals to build a greeting string. Use destructuring to extract values from an array and an object. Use the spread operator to merge arrays.',

      scaffold: `// ============================================
// Challenge 5: Templates & Destructuring
// ============================================
// Modern JS syntax that you'll use everywhere.

// TODO: Create a const 'greeting' using a template literal (backticks).
//       It should produce the string: "Hello, TypeScript! Version 5"
//       Use the variables below — embed them with \${...}
const lang = "TypeScript";
const ver = 5;

// TODO: Use array destructuring to extract the first two elements
//       of this array into constants called 'first' and 'second'.
const pair = [100, 200];

// TODO: Use object destructuring to extract 'title' and 'year'
//       from this object into constants.
const movie = { title: "Inception", year: 2010, director: "Nolan" };

// TODO: Use the spread operator (...) to create a new array 'merged'
//       that contains all elements of arr1 followed by all of arr2.
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
`,

      solution: `// ============================================
// Challenge 5: Templates & Destructuring
// ============================================
// Modern JS syntax that you'll use everywhere.

const lang = "TypeScript";
const ver = 5;
const greeting = \`Hello, \${lang}! Version \${ver}\`;

const pair = [100, 200];
const [first, second] = pair;

const movie = { title: "Inception", year: 2010, director: "Nolan" };
const { title, year } = movie;

const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
const merged = [...arr1, ...arr2];
`,

      hints: [
        'Template literals use backticks (\\`) not regular quotes. Inside them, `${expression}` embeds a value.',
        'Array destructuring: `const [a, b] = someArray;` — Object destructuring: `const { prop1, prop2 } = someObject;`',
        'The spread operator `...` unpacks an array\'s elements. Think about how you\'d place two spreads inside `[ ]`.',
      ],

      tests: [
        {
          description: 'greeting is "Hello, TypeScript! Version 5"',
          test: 'greeting === "Hello, TypeScript! Version 5"',
          errorHint:
            'Use backticks and `${}` to embed the variables. Make sure the spacing and punctuation match exactly.',
        },
        {
          description: 'first is 100 (from array destructuring)',
          test: 'first === 100',
          errorHint: 'Array destructuring uses square brackets on the left side of `=`. The variable names go inside `[ ]`.',
        },
        {
          description: 'second is 200 (from array destructuring)',
          test: 'second === 200',
          errorHint: 'The second variable in the destructuring pattern gets the second element of the array.',
        },
        {
          description: 'title is "Inception" (from object destructuring)',
          test: 'title === "Inception"',
          errorHint: 'Object destructuring uses curly braces. The variable names must match the property names in the object.',
        },
        {
          description: 'year is 2010 (from object destructuring)',
          test: 'year === 2010',
          errorHint: 'Extract `year` from the movie object using `{ }` destructuring. You don\'t need to extract every property.',
        },
        {
          description: 'merged is [1, 2, 3, 4, 5, 6] (spread operator)',
          test: 'Array.isArray(merged) && merged.length === 6 && merged[0] === 1 && merged[5] === 6',
          errorHint:
            'Use `...` before each array name inside a new array literal `[ ]` to spread their elements.',
        },
      ],
    },

    // --------------------------------------------------------
    // Challenge 6: BOSS — JS Collections Workout
    // --------------------------------------------------------
    {
      id: 'L0-C6',
      level: 0,
      number: 6,
      title: 'BOSS: JS Collections Workout',
      difficulty: 'boss',
      xp: 50,

      description: `Time for your first boss battle! This challenge tests your knowledge of \
JavaScript's most important array and object methods. These show up **everywhere** in \
TypeScript code.

### Array methods

#### \`.map()\` — transform every element
Creates a new array by applying a function to each element:

\`\`\`ts
const nums = [1, 2, 3];
const doubled = nums.map((n) => n * 2);   // [2, 4, 6]
const names = ["alice", "bob"];
const upper = names.map((s) => s.toUpperCase()); // ["ALICE", "BOB"]
\`\`\`

#### \`.filter()\` — keep elements that match
Creates a new array with only the elements that pass a test:

\`\`\`ts
const nums = [1, 2, 3, 4, 5];
const evens = nums.filter((n) => n % 2 === 0); // [2, 4]
\`\`\`

#### \`.reduce()\` — combine all elements into one value
Reduces an array to a single value by applying a function with an "accumulator":

\`\`\`ts
const nums = [1, 2, 3, 4];
const sum = nums.reduce((total, n) => total + n, 0);
//                       ^^^^^^  ^^                ^
//                       accumulator  current    initial value
// Step by step: 0+1=1, 1+2=3, 3+3=6, 6+4=10
// Result: 10
\`\`\`

#### \`for...of\` — loop over elements
Like Python's \`for x in list\` or Java's enhanced for loop:

\`\`\`ts
const fruits = ["apple", "banana", "cherry"];
for (const fruit of fruits) {
  console.log(fruit);
}
\`\`\`

### Object methods

\`Object.keys()\`, \`Object.values()\`, and \`Object.entries()\` let you iterate over objects:

\`\`\`ts
const scores = { alice: 90, bob: 85, charlie: 92 };

Object.keys(scores);    // ["alice", "bob", "charlie"]
Object.values(scores);  // [90, 85, 92]
Object.entries(scores); // [["alice", 90], ["bob", 85], ["charlie", 92]]
\`\`\`

These return arrays, so you can chain \`.map()\`, \`.filter()\`, etc. on them.`,

      mission:
        'Complete each task using the array/object method specified in the TODO comment. Each variable should hold the result of the operation.',

      scaffold: `// ============================================
// BOSS BATTLE: JS Collections Workout
// ============================================
// Use map, filter, reduce, and Object methods.

const prices = [10, 25, 50, 75, 100];

// TODO: Use .map() to create a new array 'discounted' where each price is halved.

// TODO: Use .filter() to create a new array 'expensive' containing only prices above 30.

// TODO: Use .reduce() to calculate the 'totalPrice' (sum of all prices).
//       Hint: you'll need an initial value.

const inventory = { apples: 5, bananas: 0, cherries: 12, dates: 0 };

// TODO: Use Object.keys() to get an array of all fruit names into 'fruitNames'.

// TODO: Use Object.entries() with .filter() to create 'inStock' —
//       an array of [name, count] pairs where count is greater than 0.
`,

      solution: `// ============================================
// BOSS BATTLE: JS Collections Workout
// ============================================
// Use map, filter, reduce, and Object methods.

const prices = [10, 25, 50, 75, 100];

const discounted = prices.map((p) => p / 2);

const expensive = prices.filter((p) => p > 30);

const totalPrice = prices.reduce((sum, p) => sum + p, 0);

const inventory = { apples: 5, bananas: 0, cherries: 12, dates: 0 };

const fruitNames = Object.keys(inventory);

const inStock = Object.entries(inventory).filter(([name, count]) => count > 0);
`,

      hints: [
        '`.map()` transforms each element — pass it an arrow function that takes one element and returns the transformed value.',
        '`.reduce()` needs two things: a callback `(accumulator, current) => ...` and an initial value as the second argument.',
        '`Object.entries()` gives you `[key, value]` pairs as an array. You can chain `.filter()` on the result and destructure each pair in the callback.',
      ],

      tests: [
        {
          description: 'discounted is [5, 12.5, 25, 37.5, 50]',
          test: 'Array.isArray(discounted) && discounted.length === 5 && discounted[0] === 5 && discounted[1] === 12.5 && discounted[4] === 50',
          errorHint:
            'Pass `.map()` an arrow function that divides each price. The callback receives one element at a time.',
        },
        {
          description: 'expensive is [50, 75, 100]',
          test: 'Array.isArray(expensive) && expensive.length === 3 && expensive[0] === 50 && expensive[1] === 75 && expensive[2] === 100',
          errorHint:
            '`.filter()` keeps elements where your callback returns `true`. Which prices are above 30?',
        },
        {
          description: 'totalPrice is 260',
          test: 'totalPrice === 260',
          errorHint:
            '`.reduce()` takes a callback with (accumulator, currentValue) and an initial value. Add each price to the accumulator.',
        },
        {
          description: 'fruitNames contains all 4 fruit names',
          test: 'Array.isArray(fruitNames) && fruitNames.length === 4 && fruitNames.includes("apples") && fruitNames.includes("dates")',
          errorHint:
            '`Object.keys()` returns an array of the object\'s property names as strings.',
        },
        {
          description: 'inStock contains only items with count > 0',
          test: 'Array.isArray(inStock) && inStock.length === 2 && inStock[0][0] === "apples" && inStock[0][1] === 5 && inStock[1][0] === "cherries" && inStock[1][1] === 12',
          errorHint:
            'Chain `.filter()` on `Object.entries()`. Each entry is a `[key, value]` pair — you can destructure it in the callback parameter.',
        },
      ],
    },
  ],
};
