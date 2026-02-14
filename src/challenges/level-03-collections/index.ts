// ============================================================
// TSchool - Level 03: Collections
// Master arrays, tuples, objects, and data structures
// ============================================================

import { LevelDefinition } from '../../engine/types';

export const level03: LevelDefinition = {
  number: 3,
  title: 'Collections',
  description:
    'Single values are great, but real programs deal with *groups* of data. ' +
    'In this level you\'ll learn how TypeScript keeps your arrays, tuples, and objects ' +
    'perfectly typed — so you never accidentally put a string where a number belongs.',
  challenges: [
    // --------------------------------------------------------
    // Challenge 1 — Typed Arrays
    // --------------------------------------------------------
    {
      id: 'L3-C1',
      level: 3,
      number: 1,
      title: 'Typed Arrays',
      difficulty: 'easy',
      xp: 10,

      description:
        'In JavaScript, arrays can hold anything — numbers, strings, cats, promises, ' +
        'the entire kitchen sink. TypeScript brings order to the chaos.\n\n' +
        'There are two equivalent syntaxes for typed arrays:\n\n' +
        '```ts\n' +
        'const nums: number[] = [1, 2, 3];\n' +
        'const names: Array<string> = ["Alice", "Bob"];\n' +
        '```\n\n' +
        'Both forms mean the same thing. Most TypeScript developers prefer the `number[]` ' +
        'shorthand, but `Array<number>` is handy when types get more complex.\n\n' +
        'Once an array is typed, TypeScript will stop you from pushing the wrong type into it:\n\n' +
        '```ts\n' +
        'nums.push("oops"); // Error!\n' +
        '```',

      mission:
        'Create three typed arrays:\n' +
        '1. `scores` — an array of numbers, initialized with at least 3 values\n' +
        '2. `words` — an array of strings using the `Array<T>` syntax, with at least 2 values\n' +
        '3. `flags` — an array of booleans, with at least 2 values',

      scaffold: [
        '// Challenge 1: Typed Arrays',
        '// Create three typed arrays as described in the mission.',
        '',
        '// TODO: Create a number array called `scores` (use number[] syntax)',
        '',
        '',
        '// TODO: Create a string array called `words` (use Array<string> syntax)',
        '',
        '',
        '// TODO: Create a boolean array called `flags`',
        '',
        '',
      ].join('\n'),

      solution: [
        '// Challenge 1: Typed Arrays',
        '// Create three typed arrays as described in the mission.',
        '',
        '// TODO: Create a number array called `scores` (use number[] syntax)',
        'const scores: number[] = [95, 87, 73];',
        '',
        '// TODO: Create a string array called `words` (use Array<string> syntax)',
        'const words: Array<string> = ["hello", "world"];',
        '',
        '// TODO: Create a boolean array called `flags`',
        'const flags: boolean[] = [true, false];',
        '',
      ].join('\n'),

      hints: [
        'The `number[]` syntax is shorthand: `const scores: number[] = [95, 87, 73];`',
        'For `Array<T>` syntax, replace T with the type: `const words: Array<string> = ["a", "b"];`',
        'Booleans work the same way: `const flags: boolean[] = [true, false];`',
      ],

      tests: [
        {
          description: '`scores` is an array with at least 3 numbers',
          test: 'Array.isArray(scores) && scores.length >= 3 && scores.every((v: any) => typeof v === "number")',
          errorHint: 'Make sure `scores` is a number[] with at least 3 elements.',
        },
        {
          description: '`words` is an array with at least 2 strings',
          test: 'Array.isArray(words) && words.length >= 2 && words.every((v: any) => typeof v === "string")',
          errorHint: 'Make sure `words` is an Array<string> with at least 2 elements.',
        },
        {
          description: '`flags` is an array with at least 2 booleans',
          test: 'Array.isArray(flags) && flags.length >= 2 && flags.every((v: any) => typeof v === "boolean")',
          errorHint: 'Make sure `flags` is a boolean[] with at least 2 elements.',
        },
      ],
    },

    // --------------------------------------------------------
    // Challenge 2 — Tuples
    // --------------------------------------------------------
    {
      id: 'L3-C2',
      level: 3,
      number: 2,
      title: 'Tuples',
      difficulty: 'easy',
      xp: 10,

      description:
        'Arrays say "a list of things of some type". Tuples say "exactly *these* types, ' +
        'in *this* order, with *this many* elements."\n\n' +
        '```ts\n' +
        'let coordinate: [number, number] = [10, 20];\n' +
        'let entry: [string, number] = ["Alice", 42];\n' +
        '```\n\n' +
        'Tuples are perfect for small, fixed-shape data — like a coordinate pair, ' +
        'a key-value entry, or a function that returns multiple values.\n\n' +
        'TypeScript enforces the length *and* the type at each position:\n\n' +
        '```ts\n' +
        'coordinate[0] = "nope"; // Error! Must be a number\n' +
        'entry = ["Bob"];        // Error! Missing second element\n' +
        '```',

      mission:
        'Create three tuples:\n' +
        '1. `point` — a `[number, number]` tuple representing x, y coordinates\n' +
        '2. `nameAge` — a `[string, number]` tuple with a name and age\n' +
        '3. `rgb` — a `[number, number, number]` tuple for an RGB color value',

      scaffold: [
        '// Challenge 2: Tuples',
        '// Create three tuples as described in the mission.',
        '',
        '// TODO: Create a [number, number] tuple called `point`',
        '',
        '',
        '// TODO: Create a [string, number] tuple called `nameAge`',
        '',
        '',
        '// TODO: Create a [number, number, number] tuple called `rgb`',
        '',
        '',
      ].join('\n'),

      solution: [
        '// Challenge 2: Tuples',
        '// Create three tuples as described in the mission.',
        '',
        '// TODO: Create a [number, number] tuple called `point`',
        'const point: [number, number] = [5, 10];',
        '',
        '// TODO: Create a [string, number] tuple called `nameAge`',
        'const nameAge: [string, number] = ["Alice", 30];',
        '',
        '// TODO: Create a [number, number, number] tuple called `rgb`',
        'const rgb: [number, number, number] = [255, 128, 0];',
        '',
      ].join('\n'),

      hints: [
        'A tuple type looks like an array literal of types: `[number, number]`.',
        'Make sure each element matches its position: `const nameAge: [string, number] = ["Alice", 30];`',
        'RGB needs exactly 3 numbers: `const rgb: [number, number, number] = [255, 128, 0];`',
      ],

      tests: [
        {
          description: '`point` is a tuple with exactly 2 numbers',
          test: 'Array.isArray(point) && point.length === 2 && typeof point[0] === "number" && typeof point[1] === "number"',
          errorHint: '`point` should be a [number, number] — exactly 2 numeric elements.',
        },
        {
          description: '`nameAge` is a [string, number] tuple',
          test: 'Array.isArray(nameAge) && nameAge.length === 2 && typeof nameAge[0] === "string" && typeof nameAge[1] === "number"',
          errorHint: '`nameAge` should be [string, number] — a name followed by an age.',
        },
        {
          description: '`rgb` is a [number, number, number] tuple',
          test: 'Array.isArray(rgb) && rgb.length === 3 && rgb.every((v: any) => typeof v === "number")',
          errorHint: '`rgb` should be [number, number, number] — three color channel values.',
        },
      ],
    },

    // --------------------------------------------------------
    // Challenge 3 — Object Types
    // --------------------------------------------------------
    {
      id: 'L3-C3',
      level: 3,
      number: 3,
      title: 'Object Types',
      difficulty: 'medium',
      xp: 25,

      description:
        'Objects are everywhere in TypeScript. You can describe their shape with ' +
        'inline object types — no interface required (we\'ll learn those later).\n\n' +
        '```ts\n' +
        'const user: { name: string; age: number } = {\n' +
        '  name: "Alice",\n' +
        '  age: 30,\n' +
        '};\n' +
        '```\n\n' +
        'TypeScript checks that every property matches its declared type *and* that ' +
        'you don\'t add extra unknown properties:\n\n' +
        '```ts\n' +
        'const bad: { name: string } = {\n' +
        '  name: "Bob",\n' +
        '  oops: true, // Error! Object literal may only specify known properties\n' +
        '};\n' +
        '```\n\n' +
        'You can also use a `type` alias to give a name to an object shape:\n\n' +
        '```ts\n' +
        'type Product = { id: number; name: string; price: number };\n' +
        'const item: Product = { id: 1, name: "Widget", price: 9.99 };\n' +
        '```',

      mission:
        'Define a type alias `Book` with properties `title` (string), `author` (string), ' +
        'and `pages` (number). Then create a variable `myBook` of type `Book` with any values you like.\n\n' +
        'Also create a function `describeBook` that takes a `Book` parameter and returns a string ' +
        'in the format: `"<title> by <author> (<pages> pages)"`.',

      scaffold: [
        '// Challenge 3: Object Types',
        '// Define a Book type and work with it.',
        '',
        '// TODO: Define a type alias `Book` with title, author, and pages',
        '',
        '',
        '// TODO: Create a variable `myBook` of type Book',
        '',
        '',
        '// TODO: Write a function `describeBook` that takes a Book and returns',
        '// a string like "The Hobbit by J.R.R. Tolkien (310 pages)"',
        '',
        '',
      ].join('\n'),

      solution: [
        '// Challenge 3: Object Types',
        '// Define a Book type and work with it.',
        '',
        '// TODO: Define a type alias `Book` with title, author, and pages',
        'type Book = { title: string; author: string; pages: number };',
        '',
        '// TODO: Create a variable `myBook` of type Book',
        'const myBook: Book = { title: "The Hobbit", author: "J.R.R. Tolkien", pages: 310 };',
        '',
        '// TODO: Write a function `describeBook` that takes a Book and returns',
        '// a string like "The Hobbit by J.R.R. Tolkien (310 pages)"',
        'function describeBook(book: Book): string {',
        '  return `${book.title} by ${book.author} (${book.pages} pages)`;',
        '}',
        '',
      ].join('\n'),

      hints: [
        'A type alias looks like: `type Book = { title: string; author: string; pages: number };`',
        'Use template literals for the string: `\\`${book.title} by ${book.author} (${book.pages} pages)\\``',
        'Don\'t forget to annotate the function return type as `string` and the parameter as `Book`.',
      ],

      tests: [
        {
          description: '`myBook` has the correct shape (title, author, pages)',
          test: 'typeof myBook === "object" && typeof myBook.title === "string" && typeof myBook.author === "string" && typeof myBook.pages === "number"',
          errorHint: '`myBook` needs `title` (string), `author` (string), and `pages` (number).',
        },
        {
          description: '`describeBook` returns correctly formatted string',
          test: 'describeBook({ title: "Dune", author: "Frank Herbert", pages: 412 }) === "Dune by Frank Herbert (412 pages)"',
          errorHint: 'Format should be exactly: "<title> by <author> (<pages> pages)".',
        },
        {
          description: '`describeBook` works with `myBook`',
          test: 'typeof describeBook(myBook) === "string" && describeBook(myBook).includes(myBook.title)',
          errorHint: 'Make sure `describeBook(myBook)` returns a string containing the book title.',
        },
      ],
    },

    // --------------------------------------------------------
    // Challenge 4 — Readonly & Optional Properties
    // --------------------------------------------------------
    {
      id: 'L3-C4',
      level: 3,
      number: 4,
      title: 'Readonly & Optional Properties',
      difficulty: 'medium',
      xp: 25,

      description:
        'Not every property is required, and not every property should be changeable.\n\n' +
        '**Optional properties** use a `?` after the property name:\n\n' +
        '```ts\n' +
        'type Config = {\n' +
        '  host: string;\n' +
        '  port?: number; // optional — may be undefined\n' +
        '};\n' +
        'const cfg: Config = { host: "localhost" }; // OK! port is optional\n' +
        '```\n\n' +
        '**Readonly properties** use the `readonly` modifier to prevent reassignment:\n\n' +
        '```ts\n' +
        'type Frozen = {\n' +
        '  readonly id: number;\n' +
        '  name: string;\n' +
        '};\n' +
        'const f: Frozen = { id: 1, name: "ice" };\n' +
        'f.name = "water"; // OK\n' +
        'f.id = 2;         // Error! Cannot assign to \'id\' because it is read-only\n' +
        '```\n\n' +
        'You can combine both: `readonly id?: number` means optional *and* immutable once set.',

      mission:
        'Define a type `UserProfile` with:\n' +
        '- `readonly id: number` — cannot be changed after creation\n' +
        '- `username: string` — required\n' +
        '- `email: string` — required\n' +
        '- `nickname?: string` — optional\n' +
        '- `readonly createdAt: string` — cannot be changed\n\n' +
        'Then create a variable `profile` of type `UserProfile` (you may omit `nickname`).\n\n' +
        'Finally, write a function `greetUser` that takes a `UserProfile` and returns ' +
        '`"Hey, <nickname>!"` if `nickname` is set, or `"Hey, <username>!"` otherwise.',

      scaffold: [
        '// Challenge 4: Readonly & Optional Properties',
        '// Build a UserProfile type with readonly and optional fields.',
        '',
        '// TODO: Define the UserProfile type',
        '',
        '',
        '// TODO: Create a `profile` variable of type UserProfile',
        '',
        '',
        '// TODO: Write `greetUser` — use nickname if present, otherwise username',
        '',
        '',
      ].join('\n'),

      solution: [
        '// Challenge 4: Readonly & Optional Properties',
        '// Build a UserProfile type with readonly and optional fields.',
        '',
        '// TODO: Define the UserProfile type',
        'type UserProfile = {',
        '  readonly id: number;',
        '  username: string;',
        '  email: string;',
        '  nickname?: string;',
        '  readonly createdAt: string;',
        '};',
        '',
        '// TODO: Create a `profile` variable of type UserProfile',
        'const profile: UserProfile = {',
        '  id: 1,',
        '  username: "typescripter",',
        '  email: "ts@example.com",',
        '  createdAt: "2025-01-01",',
        '};',
        '',
        '// TODO: Write `greetUser` — use nickname if present, otherwise username',
        'function greetUser(user: UserProfile): string {',
        '  return `Hey, ${user.nickname ?? user.username}!`;',
        '}',
        '',
      ].join('\n'),

      hints: [
        'Mark properties readonly like this: `readonly id: number;` and optional like: `nickname?: string;`',
        'To check if an optional property is set, use `if (user.nickname)` or the `??` operator.',
        'The nullish coalescing operator `??` falls back when the left side is null/undefined: `user.nickname ?? user.username`',
      ],

      tests: [
        {
          description: '`profile` has required properties id, username, email, createdAt',
          test: 'typeof profile === "object" && typeof profile.id === "number" && typeof profile.username === "string" && typeof profile.email === "string" && typeof profile.createdAt === "string"',
          errorHint: 'Make sure `profile` has `id` (number), `username` (string), `email` (string), and `createdAt` (string).',
        },
        {
          description: '`greetUser` uses nickname when present',
          test: 'greetUser({ id: 1, username: "alice", email: "a@b.com", nickname: "Ali", createdAt: "2025-01-01" }) === "Hey, Ali!"',
          errorHint: 'When `nickname` is set, return "Hey, <nickname>!".',
        },
        {
          description: '`greetUser` falls back to username when nickname is absent',
          test: 'greetUser({ id: 2, username: "bob", email: "b@b.com", createdAt: "2025-01-01" }) === "Hey, bob!"',
          errorHint: 'When `nickname` is undefined, return "Hey, <username>!".',
        },
      ],
    },

    // --------------------------------------------------------
    // Challenge 5 — Index Signatures
    // --------------------------------------------------------
    {
      id: 'L3-C5',
      level: 3,
      number: 5,
      title: 'Index Signatures',
      difficulty: 'hard',
      xp: 50,

      description:
        'Sometimes you don\'t know the exact property names ahead of time. ' +
        'Index signatures let you describe objects with dynamic keys.\n\n' +
        '```ts\n' +
        'type StringMap = {\n' +
        '  [key: string]: number;\n' +
        '};\n' +
        '\n' +
        'const wordCounts: StringMap = {\n' +
        '  hello: 5,\n' +
        '  world: 3,\n' +
        '};\n' +
        'wordCounts["typescript"] = 42; // OK — any string key, number value\n' +
        '```\n\n' +
        'You can combine index signatures with known properties:\n\n' +
        '```ts\n' +
        'type Inventory = {\n' +
        '  total: number;              // known property\n' +
        '  [item: string]: number;     // dynamic keys\n' +
        '};\n' +
        '```\n\n' +
        'Note: when mixing known props with an index signature, the known properties\' ' +
        'types must be compatible with the index signature\'s value type.',

      mission:
        '1. Define a type `ScoreBoard` with an index signature `[player: string]: number`.\n' +
        '2. Create a variable `scores` of type `ScoreBoard` with at least 3 players.\n' +
        '3. Write a function `getTopPlayer` that takes a `ScoreBoard` and returns the ' +
        'name (string) of the player with the highest score.\n' +
        '4. Write a function `addBonus` that takes a `ScoreBoard` and a bonus `number`, ' +
        'and returns a *new* `ScoreBoard` with every player\'s score increased by the bonus.',

      scaffold: [
        '// Challenge 5: Index Signatures',
        '// Build a dynamic scoreboard with typed keys.',
        '',
        '// TODO: Define a type `ScoreBoard` with an index signature',
        '',
        '',
        '// TODO: Create a `scores` variable with at least 3 players',
        '',
        '',
        '// TODO: Write `getTopPlayer(board)` — returns the player name with the highest score',
        '',
        '',
        '// TODO: Write `addBonus(board, bonus)` — returns a new ScoreBoard with bonus added',
        '',
        '',
      ].join('\n'),

      solution: [
        '// Challenge 5: Index Signatures',
        '// Build a dynamic scoreboard with typed keys.',
        '',
        '// TODO: Define a type `ScoreBoard` with an index signature',
        'type ScoreBoard = { [player: string]: number };',
        '',
        '// TODO: Create a `scores` variable with at least 3 players',
        'const scores: ScoreBoard = { Alice: 95, Bob: 87, Charlie: 73 };',
        '',
        '// TODO: Write `getTopPlayer(board)` — returns the player name with the highest score',
        'function getTopPlayer(board: ScoreBoard): string {',
        '  let topPlayer = "";',
        '  let topScore = -Infinity;',
        '  for (const player of Object.keys(board)) {',
        '    if (board[player] > topScore) {',
        '      topScore = board[player];',
        '      topPlayer = player;',
        '    }',
        '  }',
        '  return topPlayer;',
        '}',
        '',
        '// TODO: Write `addBonus(board, bonus)` — returns a new ScoreBoard with bonus added',
        'function addBonus(board: ScoreBoard, bonus: number): ScoreBoard {',
        '  const result: ScoreBoard = {};',
        '  for (const player of Object.keys(board)) {',
        '    result[player] = board[player] + bonus;',
        '  }',
        '  return result;',
        '}',
        '',
      ].join('\n'),

      hints: [
        'An index signature looks like: `type ScoreBoard = { [key: string]: number };`',
        'Use `Object.keys(board)` to iterate over all players, tracking the highest score in a variable.',
        'For `addBonus`, create a new object and loop through `Object.keys(board)`, adding the bonus to each value.',
      ],

      tests: [
        {
          description: '`scores` has at least 3 players with numeric scores',
          test: 'typeof scores === "object" && Object.keys(scores).length >= 3 && Object.values(scores).every((v: any) => typeof v === "number")',
          errorHint: '`scores` should be an object with at least 3 string keys mapping to numbers.',
        },
        {
          description: '`getTopPlayer` returns the player with the highest score',
          test: 'getTopPlayer({ Ana: 10, Zed: 50, Max: 30 }) === "Zed"',
          errorHint: '`getTopPlayer` should return the name of the player with the highest score.',
        },
        {
          description: '`addBonus` returns a new ScoreBoard with bonus added to all scores',
          test: '(() => { const r = addBonus({ A: 10, B: 20 }, 5); return r["A"] === 15 && r["B"] === 25; })()',
          errorHint: '`addBonus({ A: 10, B: 20 }, 5)` should return `{ A: 15, B: 25 }`.',
        },
        {
          description: '`addBonus` does not mutate the original board',
          test: '(() => { const orig = { X: 100 }; const copy = addBonus(orig, 10); return orig["X"] === 100 && copy["X"] === 110; })()',
          errorHint: '`addBonus` must return a *new* object — do not modify the original.',
        },
      ],
    },

    // --------------------------------------------------------
    // Challenge 6 — BOSS: The Data Wrangler
    // --------------------------------------------------------
    {
      id: 'L3-C6',
      level: 3,
      number: 6,
      title: 'BOSS: The Data Wrangler',
      difficulty: 'boss',
      xp: 200,

      description:
        '--- BOSS BATTLE ---\n\n' +
        'You\'ve been hired to clean up the data pipeline at Messy Data Corp. ' +
        'Their API returns raw records as arrays of tuples, and you need to ' +
        'transform them into properly typed objects — with validation.\n\n' +
        'This challenge combines everything from Level 3: arrays, tuples, object types, ' +
        'readonly properties, optional fields, and index signatures. Take a breath. You\'ve got this.',

      mission:
        '1. Define a type `RawRecord` as a tuple: `[id: number, name: string, department: string, salary: number]`.\n\n' +
        '2. Define a type `Employee` with:\n' +
        '   - `readonly id: number`\n' +
        '   - `name: string`\n' +
        '   - `department: string`\n' +
        '   - `salary: number`\n' +
        '   - `bonus?: number` (optional)\n\n' +
        '3. Define a type `DepartmentSummary` as `{ [dept: string]: { headcount: number; totalSalary: number } }`.\n\n' +
        '4. Write a function `parseRecords(raw: RawRecord[]): Employee[]` that converts each tuple to an Employee object.\n\n' +
        '5. Write a function `summarize(employees: Employee[]): DepartmentSummary` that groups employees by department ' +
        'and returns headcount and total salary per department.',

      scaffold: [
        '// ============================================================',
        '// BOSS BATTLE: The Data Wrangler',
        '// Transform raw data tuples into typed, structured objects.',
        '// ============================================================',
        '',
        '// TODO: Define `RawRecord` — a tuple [number, string, string, number]',
        '',
        '',
        '// TODO: Define `Employee` — readonly id, name, department, salary, optional bonus',
        '',
        '',
        '// TODO: Define `DepartmentSummary` — index signature mapping department to { headcount, totalSalary }',
        '',
        '',
        '// TODO: Write `parseRecords(raw: RawRecord[]): Employee[]`',
        '// Convert each tuple into an Employee object.',
        '',
        '',
        '// TODO: Write `summarize(employees: Employee[]): DepartmentSummary`',
        '// Group employees by department, count them, and sum their salaries.',
        '',
        '',
      ].join('\n'),

      solution: [
        '// ============================================================',
        '// BOSS BATTLE: The Data Wrangler',
        '// Transform raw data tuples into typed, structured objects.',
        '// ============================================================',
        '',
        '// TODO: Define `RawRecord` — a tuple [number, string, string, number]',
        'type RawRecord = [number, string, string, number];',
        '',
        '// TODO: Define `Employee` — readonly id, name, department, salary, optional bonus',
        'type Employee = {',
        '  readonly id: number;',
        '  name: string;',
        '  department: string;',
        '  salary: number;',
        '  bonus?: number;',
        '};',
        '',
        '// TODO: Define `DepartmentSummary` — index signature mapping department to { headcount, totalSalary }',
        'type DepartmentSummary = { [dept: string]: { headcount: number; totalSalary: number } };',
        '',
        '// TODO: Write `parseRecords(raw: RawRecord[]): Employee[]`',
        '// Convert each tuple into an Employee object.',
        'function parseRecords(raw: RawRecord[]): Employee[] {',
        '  return raw.map(([id, name, department, salary]) => ({',
        '    id,',
        '    name,',
        '    department,',
        '    salary,',
        '  }));',
        '}',
        '',
        '// TODO: Write `summarize(employees: Employee[]): DepartmentSummary`',
        '// Group employees by department, count them, and sum their salaries.',
        'function summarize(employees: Employee[]): DepartmentSummary {',
        '  const result: DepartmentSummary = {};',
        '  for (const emp of employees) {',
        '    if (!result[emp.department]) {',
        '      result[emp.department] = { headcount: 0, totalSalary: 0 };',
        '    }',
        '    result[emp.department].headcount += 1;',
        '    result[emp.department].totalSalary += emp.salary;',
        '  }',
        '  return result;',
        '}',
        '',
      ].join('\n'),

      hints: [
        'Start with the types: `type RawRecord = [number, string, string, number];` and build Employee as an object type with `readonly id` and `bonus?`.',
        'In `parseRecords`, destructure each tuple: `raw.map(([id, name, department, salary]) => ({ id, name, department, salary }))`.',
        'In `summarize`, loop through employees and build up the result object, initializing each department with `{ headcount: 0, totalSalary: 0 }` the first time you see it.',
      ],

      tests: [
        {
          description: '`parseRecords` converts tuples to Employee objects',
          test: '(() => { const r = parseRecords([[1, "Alice", "Eng", 100000]]); return r.length === 1 && r[0].id === 1 && r[0].name === "Alice" && r[0].department === "Eng" && r[0].salary === 100000; })()',
          errorHint: 'Each tuple [id, name, dept, salary] should map to an Employee with those four properties.',
        },
        {
          description: '`parseRecords` handles multiple records',
          test: '(() => { const r = parseRecords([[1,"A","X",50],[2,"B","Y",60],[3,"C","X",70]]); return r.length === 3 && r[2].name === "C"; })()',
          errorHint: 'Make sure you map *every* tuple in the array, not just the first one.',
        },
        {
          description: '`summarize` groups by department correctly',
          test: '(() => { const emps = [{id:1,name:"A",department:"Eng",salary:100},{id:2,name:"B",department:"Eng",salary:200},{id:3,name:"C",department:"Sales",salary:150}]; const s = summarize(emps); return s["Eng"].headcount === 2 && s["Eng"].totalSalary === 300 && s["Sales"].headcount === 1 && s["Sales"].totalSalary === 150; })()',
          errorHint: 'Each department key should map to { headcount, totalSalary } with correct sums.',
        },
        {
          description: '`summarize` returns empty object for empty input',
          test: '(() => { const s = summarize([]); return typeof s === "object" && Object.keys(s).length === 0; })()',
          errorHint: '`summarize([])` should return an empty object `{}`.',
        },
        {
          description: 'Full pipeline: parseRecords -> summarize',
          test: '(() => { const raw: [number,string,string,number][] = [[1,"Ana","Dev",80000],[2,"Ben","Dev",90000],[3,"Cal","QA",70000]]; const emps = parseRecords(raw); const s = summarize(emps); return s["Dev"].headcount === 2 && s["Dev"].totalSalary === 170000 && s["QA"].headcount === 1; })()',
          errorHint: 'The full pipeline should work: parse raw tuples into employees, then summarize by department.',
        },
      ],
    },
  ],
};
