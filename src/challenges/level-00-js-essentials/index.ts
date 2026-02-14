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
        'Syntax: `const NAME = value;` and `let name = value;`',
        'Full answer: `const LANGUAGE = "TypeScript"; let level = 1; level = 2;`',
      ],

      tests: [
        {
          description: 'LANGUAGE is "TypeScript"',
          test: "LANGUAGE === 'TypeScript'",
          errorHint:
            'Declare `const LANGUAGE = "TypeScript";` — make sure the spelling and casing match exactly.',
        },
        {
          description: 'level has been reassigned to 2',
          test: 'level === 2',
          errorHint:
            'Declare `let level = 1;` and then reassign it: `level = 2;`',
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

// TODO: Compare 42 === 42 and store the result in a const called 'sameNumbers'

// TODO: Compare "hello" === "hello" and store the result in 'sameStrings'

// TODO: Compare theNumber === theString and store the result in 'mixedTypes'
//       (think carefully — what does strict equality do with different types?)
//       These variables simulate values coming from user input, where
//       TypeScript doesn't know the exact types at compile time.
const theNumber = 42;
const theString: any = "42";

// TODO: Compare 10 > 5 and store the result in 'isGreater'

// TODO: Use && (logical AND): (true && false) and store in 'bothTrue'

// TODO: Use ! (logical NOT): !false and store in 'notFalse'
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
        '`===` compares value AND type. `42 === "42"` is `false` because number !== string.',
        '`&&` returns `true` only when both sides are `true`. `!` flips `true` to `false` and vice versa.',
        'Expected values: sameNumbers=true, sameStrings=true, mixedTypes=false, isGreater=true, bothTrue=false, notFalse=true',
      ],

      tests: [
        {
          description: 'sameNumbers is true (42 === 42)',
          test: 'sameNumbers === true',
          errorHint: 'Set `const sameNumbers = 42 === 42;` — two identical numbers are strictly equal.',
        },
        {
          description: 'sameStrings is true ("hello" === "hello")',
          test: 'sameStrings === true',
          errorHint: 'Set `const sameStrings = "hello" === "hello";`',
        },
        {
          description: 'mixedTypes is false (42 === "42" — different types!)',
          test: 'mixedTypes === false',
          errorHint:
            'Strict equality `===` returns false when comparing a number to a string. Set `const mixedTypes = theNumber === theString;`',
        },
        {
          description: 'isGreater is true (10 > 5)',
          test: 'isGreater === true',
          errorHint: 'Set `const isGreater = 10 > 5;`',
        },
        {
          description: 'bothTrue is false (true && false)',
          test: 'bothTrue === false',
          errorHint: '`true && false` evaluates to `false`. Set `const bothTrue = true && false;`',
        },
        {
          description: 'notFalse is true (!false)',
          test: 'notFalse === true',
          errorHint: '`!false` evaluates to `true`. Set `const notFalse = !false;`',
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
This is similar to other languages — just no type annotations (we'll add those in Level 1):

\`\`\`ts
function greet(name) {
  return "Hello, " + name + "!";
}
greet("Alice"); // "Hello, Alice!"
\`\`\`

### Arrow functions (the modern way)
Arrow functions use \`=>\` (a "fat arrow") instead of the \`function\` keyword. They're the \
most common style in modern JavaScript and TypeScript:

\`\`\`ts
const greet = (name) => {
  return "Hello, " + name + "!";
};
\`\`\`

### Short arrow functions (implicit return)
If the function body is a single expression, you can drop the curly braces AND the \`return\` keyword:

\`\`\`ts
const double = (x) => x * 2;         // returns x * 2
const isEven = (n) => n % 2 === 0;   // returns true or false
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

If you're from Python, this is like passing a lambda. If you're from Java, it's like \
a functional interface / lambda expression.`,

      mission:
        'Write a traditional function `add` that takes two parameters and returns their sum. Then write an arrow function `multiply` that does multiplication. Finally, write a short arrow function `isPositive` that returns whether a number is greater than 0.',

      scaffold: `// ============================================
// Challenge 3: Functions & Arrows
// ============================================
// Practice both function styles.

// TODO: Write a traditional function called 'add' that takes
//       two parameters (a, b) and returns their sum.
//       Example: add(2, 3) should return 5

// TODO: Write an arrow function called 'multiply' that takes
//       two parameters (a, b) and returns their product.
//       Store it in a const. Use the block body style with { return ... }

// TODO: Write a short arrow function called 'isPositive' that
//       takes one parameter (n) and returns true if n > 0.
//       Use the implicit return style (no curly braces, no return keyword).
`,

      solution: `// ============================================
// Challenge 3: Functions & Arrows
// ============================================
// Practice both function styles.

function add(a, b) {
  return a + b;
}

const multiply = (a, b) => {
  return a * b;
};

const isPositive = (n) => n > 0;
`,

      hints: [
        'Traditional function: `function add(a, b) { return a + b; }`',
        'Arrow with block body: `const multiply = (a, b) => { return a * b; };`',
        'Short arrow with implicit return: `const isPositive = (n) => n > 0;` — no curly braces, no return keyword.',
      ],

      tests: [
        {
          description: 'add(2, 3) returns 5',
          test: 'add(2, 3) === 5',
          errorHint:
            'Write `function add(a, b) { return a + b; }` — make sure you use the `return` keyword.',
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
            'Write `const multiply = (a, b) => { return a * b; };`',
        },
        {
          description: 'isPositive(5) returns true',
          test: 'isPositive(5) === true',
          errorHint: 'Write `const isPositive = (n) => n > 0;`',
        },
        {
          description: 'isPositive(-3) returns false',
          test: 'isPositive(-3) === false',
          errorHint:
            'Your `isPositive` should return `n > 0`. Negative numbers should return false.',
        },
        {
          description: 'isPositive(0) returns false',
          test: 'isPositive(0) === false',
          errorHint: '0 is not positive. `0 > 0` is `false`.',
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
let x;
console.log(x); // undefined
\`\`\`

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
const user = null;
const name = user?.name; // undefined (no crash!)
// Without ?. this would crash: user.name → TypeError!
\`\`\``,

      mission:
        'Create variables demonstrating your understanding of null, undefined, falsy values, `??`, and `?.`. Follow the TODO comments in the scaffold.',

      scaffold: `// ============================================
// Challenge 4: Null, Undefined & Friends
// ============================================
// Master JavaScript's "nothing" values.

// TODO: Declare a variable 'unset' with let but do NOT assign a value.
//       What value does it hold? (answer: undefined)

// TODO: Declare a const 'empty' and explicitly assign null to it.

// TODO: Use ?? to provide a fallback. Given:
const maybeNull = null;
// Create a const 'withFallback' that is maybeNull ?? "fallback"

// TODO: Show that ?? preserves 0 (unlike ||). Given:
const count = 0;
// Create a const 'safeCount' that is count ?? 10
// (should be 0, not 10!)

// TODO: Use ?. for safe property access. Given:
const config = null;
// Create a const 'host' that is config?.host
// (should be undefined, not a crash)
`,

      solution: `// ============================================
// Challenge 4: Null, Undefined & Friends
// ============================================
// Master JavaScript's "nothing" values.

let unset;

const empty = null;

const maybeNull = null;
const withFallback = maybeNull ?? "fallback";

const count = 0;
const safeCount = count ?? 10;

const config = null;
const host = config?.host;
`,

      hints: [
        '`let unset;` — declaring without assigning gives `undefined`. `const empty = null;` — explicit null.',
        '`??` returns the right side only when the left is `null` or `undefined`. `0 ?? 10` is `0` because `0` is not null/undefined.',
        '`?.` returns `undefined` instead of crashing when the left side is null/undefined. `null?.host` is `undefined`.',
      ],

      tests: [
        {
          description: 'unset is undefined (declared but not assigned)',
          test: 'unset === undefined',
          errorHint:
            'Declare with `let unset;` — no assignment. It will automatically be `undefined`.',
        },
        {
          description: 'empty is null',
          test: 'empty === null',
          errorHint: 'Set `const empty = null;`',
        },
        {
          description: 'withFallback is "fallback" (null ?? "fallback")',
          test: 'withFallback === "fallback"',
          errorHint:
            'Set `const withFallback = maybeNull ?? "fallback";` — since maybeNull is null, ?? returns the right side.',
        },
        {
          description: 'safeCount is 0 (0 ?? 10 keeps the 0)',
          test: 'safeCount === 0',
          errorHint:
            'Set `const safeCount = count ?? 10;` — `??` only triggers on null/undefined, not 0.',
        },
        {
          description: 'host is undefined (null?.host is safe)',
          test: 'host === undefined',
          errorHint:
            'Set `const host = config?.host;` — optional chaining returns undefined instead of crashing.',
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
const sum = (...nums) => nums.reduce((a, b) => a + b, 0);
sum(1, 2, 3, 4); // 10
\`\`\``,

      mission:
        'Use template literals to build a greeting string. Use destructuring to extract values from an array and an object. Use the spread operator to merge arrays.',

      scaffold: `// ============================================
// Challenge 5: Templates & Destructuring
// ============================================
// Modern JS syntax that you'll use everywhere.

// TODO: Create a const 'greeting' using a template literal.
//       It should produce: "Hello, TypeScript! Version 5"
//       Use the variables below inside \${...}
const lang = "TypeScript";
const ver = 5;

// TODO: Use array destructuring to extract the first two elements
//       of this array into constants called 'first' and 'second'.
const pair = [100, 200];

// TODO: Use object destructuring to extract 'title' and 'year'
//       from this object into constants.
const movie = { title: "Inception", year: 2010, director: "Nolan" };

// TODO: Use the spread operator to create a new array 'merged'
//       that contains all elements of arr1 followed by all elements of arr2.
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
        'Template literal syntax: `\\`Hello, ${variableName}!\\`` — use backticks, not regular quotes.',
        'Array destructuring: `const [first, second] = pair;` — Object destructuring: `const { title, year } = movie;`',
        'Spread: `const merged = [...arr1, ...arr2];` — the `...` copies all elements from each array.',
      ],

      tests: [
        {
          description: 'greeting is "Hello, TypeScript! Version 5"',
          test: 'greeting === "Hello, TypeScript! Version 5"',
          errorHint:
            'Use a template literal: `const greeting = \\`Hello, ${lang}! Version ${ver}\\`;`',
        },
        {
          description: 'first is 100 (from array destructuring)',
          test: 'first === 100',
          errorHint: 'Use `const [first, second] = pair;`',
        },
        {
          description: 'second is 200 (from array destructuring)',
          test: 'second === 200',
          errorHint: 'Use `const [first, second] = pair;`',
        },
        {
          description: 'title is "Inception" (from object destructuring)',
          test: 'title === "Inception"',
          errorHint: 'Use `const { title, year } = movie;`',
        },
        {
          description: 'year is 2010 (from object destructuring)',
          test: 'year === 2010',
          errorHint: 'Use `const { title, year } = movie;`',
        },
        {
          description: 'merged is [1, 2, 3, 4, 5, 6] (spread operator)',
          test: 'Array.isArray(merged) && merged.length === 6 && merged[0] === 1 && merged[5] === 6',
          errorHint:
            'Use `const merged = [...arr1, ...arr2];` — the spread operator copies all elements.',
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
//       Example: [10, 25, 50, 75, 100] -> [5, 12.5, 25, 37.5, 50]

// TODO: Use .filter() to create a new array 'expensive' containing only prices > 30.
//       Example: [10, 25, 50, 75, 100] -> [50, 75, 100]

// TODO: Use .reduce() to calculate the 'totalPrice' (sum of all prices).
//       Example: 10 + 25 + 50 + 75 + 100 = 260

const inventory = { apples: 5, bananas: 0, cherries: 12, dates: 0 };

// TODO: Use Object.keys() to get an array of all fruit names into 'fruitNames'.

// TODO: Use Object.entries() with .filter() to create 'inStock' —
//       an array of [name, count] pairs where count > 0.
//       Expected: [["apples", 5], ["cherries", 12]]
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
        '`.map((p) => p / 2)` transforms each element. `.filter((p) => p > 30)` keeps elements matching the condition.',
        '`.reduce((sum, p) => sum + p, 0)` — the second argument (`0`) is the starting value. `sum` accumulates the result.',
        '`Object.entries(obj)` returns `[key, value]` pairs. You can destructure in the filter: `.filter(([name, count]) => count > 0)`',
      ],

      tests: [
        {
          description: 'discounted is [5, 12.5, 25, 37.5, 50]',
          test: 'Array.isArray(discounted) && discounted.length === 5 && discounted[0] === 5 && discounted[1] === 12.5 && discounted[4] === 50',
          errorHint:
            'Use `const discounted = prices.map((p) => p / 2);`',
        },
        {
          description: 'expensive is [50, 75, 100]',
          test: 'Array.isArray(expensive) && expensive.length === 3 && expensive[0] === 50 && expensive[1] === 75 && expensive[2] === 100',
          errorHint:
            'Use `const expensive = prices.filter((p) => p > 30);`',
        },
        {
          description: 'totalPrice is 260',
          test: 'totalPrice === 260',
          errorHint:
            'Use `const totalPrice = prices.reduce((sum, p) => sum + p, 0);` — start with 0 as the initial value.',
        },
        {
          description: 'fruitNames contains all 4 fruit names',
          test: 'Array.isArray(fruitNames) && fruitNames.length === 4 && fruitNames.includes("apples") && fruitNames.includes("dates")',
          errorHint:
            'Use `const fruitNames = Object.keys(inventory);`',
        },
        {
          description: 'inStock contains only items with count > 0',
          test: 'Array.isArray(inStock) && inStock.length === 2 && inStock[0][0] === "apples" && inStock[0][1] === 5 && inStock[1][0] === "cherries" && inStock[1][1] === 12',
          errorHint:
            'Use `const inStock = Object.entries(inventory).filter(([name, count]) => count > 0);`',
        },
      ],
    },
  ],
};
