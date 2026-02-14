import { LevelDefinition } from '../../engine/types';

export const level10: LevelDefinition = {
  number: 10,
  title: 'Real World TypeScript',
  description:
    'Apply everything you\'ve learned to real-world patterns: modules, declaration files, type narrowing, error handling, fluent APIs, and building a typed framework.',
  challenges: [
    // ── Challenge 1: Module Systems ────────────────────────────
    {
      id: 'L10-C1',
      level: 10,
      number: 1,
      title: 'Module Systems',
      difficulty: 'medium',
      xp: 25,
      description: `
TypeScript supports **ES modules** as the primary module system:

\`\`\`typescript
// Named exports
export function add(a: number, b: number): number { return a + b; }
export const PI = 3.14159;

// Default export
export default class Calculator { ... }

// Re-exports
export { add } from './math';
export { default as Calculator } from './calculator';
export * from './utils';  // re-export everything

// Type-only imports (erased at runtime, cleaner bundling)
import type { Config } from './config';
export type { Config };
\`\`\`

The **barrel pattern** uses an \`index.ts\` to re-export from
multiple files, giving consumers a clean single import path.

Namespace imports gather everything under one name:
\`\`\`typescript
import * as MathUtils from './math';
MathUtils.add(1, 2);
\`\`\`
`,
      mission:
        'Create a module structure: a `createLogger` factory function, a `LogLevel` type (union of string literals), and a `Logger` interface. Export them properly. Also create a `formatMessage` helper that is NOT exported (private to the module).',
      scaffold: `// Create a module that exports:
// 1. type LogLevel = 'debug' | 'info' | 'warn' | 'error'
// 2. interface Logger {
//      level: LogLevel;
//      log(level: LogLevel, message: string): string;
//      debug(message: string): string;
//      info(message: string): string;
//      warn(message: string): string;
//      error(message: string): string;
//    }
// 3. function createLogger(level: LogLevel): Logger

// Internal helper (NOT exported):
// function formatMessage(level: LogLevel, message: string): string
//   → returns \`[\${level.toUpperCase()}] \${message}\`

// The Logger returned by createLogger should:
// - Only produce output for messages at or above its level
//   (debug < info < warn < error)
// - log() returns the formatted message if level is high enough, empty string otherwise
// - debug/info/warn/error are shortcuts that call log()

// TODO: implement the module
`,
      solution: `type LogLevel = 'debug' | 'info' | 'warn' | 'error';

interface Logger {
  level: LogLevel;
  log(level: LogLevel, message: string): string;
  debug(message: string): string;
  info(message: string): string;
  warn(message: string): string;
  error(message: string): string;
}

const LOG_LEVELS: Record<LogLevel, number> = {
  debug: 0,
  info: 1,
  warn: 2,
  error: 3,
};

function formatMessage(level: LogLevel, message: string): string {
  return \`[\${level.toUpperCase()}] \${message}\`;
}

function createLogger(level: LogLevel): Logger {
  return {
    level,
    log(msgLevel: LogLevel, message: string): string {
      if (LOG_LEVELS[msgLevel] >= LOG_LEVELS[level]) {
        return formatMessage(msgLevel, message);
      }
      return '';
    },
    debug(message: string): string {
      return this.log('debug', message);
    },
    info(message: string): string {
      return this.log('info', message);
    },
    warn(message: string): string {
      return this.log('warn', message);
    },
    error(message: string): string {
      return this.log('error', message);
    },
  };
}
`,
      hints: [
        'Define a priority map: `const LOG_LEVELS: Record<LogLevel, number> = { debug: 0, info: 1, warn: 2, error: 3 }`.',
        'formatMessage is a simple template: `[${level.toUpperCase()}] ${message}` — do NOT export it.',
        'In log(), compare LOG_LEVELS[msgLevel] >= LOG_LEVELS[this.level] to decide whether to format or return empty string.',
      ],
      tests: [
        {
          description: 'createLogger returns a Logger with the specified level',
          test: `const logger = createLogger('info'); logger.level === 'info';`,
          errorHint: 'createLogger should return an object with a `level` property matching the input.',
        },
        {
          description: 'Logger formats messages correctly',
          test: `const logger = createLogger('debug'); logger.info('hello') === '[INFO] hello' && logger.error('fail') === '[ERROR] fail';`,
          errorHint: 'Messages should be formatted as `[LEVEL] message` with uppercase level.',
        },
        {
          description: 'Logger respects log level filtering',
          test: `const logger = createLogger('warn'); logger.debug('x') === '' && logger.info('x') === '' && logger.warn('x') === '[WARN] x' && logger.error('x') === '[ERROR] x';`,
          errorHint: 'Messages below the logger\'s level should return empty string.',
        },
        {
          description: 'formatMessage is not exported',
          test: `typeof formatMessage === 'undefined' || (() => { try { formatMessage; return false; } catch { return true; } })();`,
          errorHint: 'formatMessage should be a module-private function — do not export it.',
        },
        {
          description: 'log() method works with explicit level parameter',
          test: `const logger = createLogger('info'); logger.log('debug', 'x') === '' && logger.log('info', 'y') === '[INFO] y';`,
          errorHint: 'log(level, message) should check if the given level meets the logger threshold.',
        },
      ],
    },

    // ── Challenge 2: Declaration Files ─────────────────────────
    {
      id: 'L10-C2',
      level: 10,
      number: 2,
      title: 'Declaration Files',
      difficulty: 'medium',
      xp: 25,
      description: `
Declaration files (\`.d.ts\`) describe the types for JavaScript code
that doesn't have built-in type information. They contain only type
declarations — no runtime code.

\`\`\`typescript
// math-lib.d.ts
declare module 'math-lib' {
  export function add(a: number, b: number): number;
  export function multiply(a: number, b: number): number;
  export const PI: number;
}
\`\`\`

For global variables (like \`window\` extensions):
\`\`\`typescript
declare global {
  interface Window {
    analytics: { track(event: string): void };
  }
}
\`\`\`

The \`declare\` keyword tells TypeScript "this exists at runtime, trust me"
without generating any JavaScript output. You can declare variables,
functions, classes, modules, and namespaces.
`,
      mission:
        'Write runtime code that matches what declaration files would describe: create a `StringUtils` namespace-like object with `capitalize`, `reverse`, `truncate`, and `wordCount` methods. Also create a `Config` class with typed static factory methods.',
      scaffold: `// Imagine these declarations exist in a .d.ts file:
//
// declare namespace StringUtils {
//   function capitalize(str: string): string;
//   function reverse(str: string): string;
//   function truncate(str: string, maxLen: number): string;
//   function wordCount(str: string): number;
// }
//
// declare class Config {
//   readonly entries: ReadonlyMap<string, unknown>;
//   get<T>(key: string): T | undefined;
//   has(key: string): boolean;
//   static fromObject(obj: Record<string, unknown>): Config;
//   static empty(): Config;
// }

// Your task: implement these as actual runtime code!

// TODO: implement StringUtils and Config
`,
      solution: `const StringUtils = {
  capitalize(str: string): string {
    if (str.length === 0) return str;
    return str[0].toUpperCase() + str.slice(1);
  },
  reverse(str: string): string {
    return str.split('').reverse().join('');
  },
  truncate(str: string, maxLen: number): string {
    if (str.length <= maxLen) return str;
    return str.slice(0, maxLen - 3) + '...';
  },
  wordCount(str: string): number {
    const trimmed = str.trim();
    if (trimmed.length === 0) return 0;
    return trimmed.split(/\\s+/).length;
  },
};

class Config {
  readonly entries: ReadonlyMap<string, unknown>;

  constructor(entries: Map<string, unknown>) {
    this.entries = entries;
  }

  get<T>(key: string): T | undefined {
    return this.entries.get(key) as T | undefined;
  }

  has(key: string): boolean {
    return this.entries.has(key);
  }

  static fromObject(obj: Record<string, unknown>): Config {
    return new Config(new Map(Object.entries(obj)));
  }

  static empty(): Config {
    return new Config(new Map());
  }
}
`,
      hints: [
        'StringUtils is a plain object (not a class) with function properties — like a namespace at runtime.',
        'truncate should add "..." when truncating, so the total length is maxLen. Slice to `maxLen - 3`.',
        'Config.fromObject should create a Map from Object.entries(obj) and pass it to the constructor.',
      ],
      tests: [
        {
          description: 'StringUtils.capitalize works',
          test: `StringUtils.capitalize('hello') === 'Hello' && StringUtils.capitalize('') === '';`,
          errorHint: 'capitalize should uppercase the first character. Handle empty strings.',
        },
        {
          description: 'StringUtils.reverse works',
          test: `StringUtils.reverse('abc') === 'cba' && StringUtils.reverse('') === '';`,
          errorHint: 'Use split("").reverse().join("").',
        },
        {
          description: 'StringUtils.truncate respects maxLen',
          test: `StringUtils.truncate('hello world', 8) === 'hello...' && StringUtils.truncate('hi', 10) === 'hi';`,
          errorHint: 'If str.length > maxLen, slice to maxLen-3 and append "...".',
        },
        {
          description: 'StringUtils.wordCount counts words correctly',
          test: `StringUtils.wordCount('hello world') === 2 && StringUtils.wordCount('  one  ') === 1 && StringUtils.wordCount('') === 0;`,
          errorHint: 'Trim, check for empty, then split on /\\s+/ and return length.',
        },
        {
          description: 'Config.fromObject and get/has work',
          test: `const cfg = Config.fromObject({ host: 'localhost', port: 3000 }); cfg.has('host') === true && cfg.get('host') === 'localhost' && cfg.get('missing') === undefined;`,
          errorHint: 'fromObject should create a Config with a Map built from Object.entries().',
        },
        {
          description: 'Config.empty creates an empty Config',
          test: `const cfg = Config.empty(); cfg.has('anything') === false && cfg.entries.size === 0;`,
          errorHint: 'empty() should return a new Config with an empty Map.',
        },
      ],
    },

    // ── Challenge 3: Type Narrowing Patterns ───────────────────
    {
      id: 'L10-C3',
      level: 10,
      number: 3,
      title: 'Type Narrowing Patterns',
      difficulty: 'hard',
      xp: 50,
      description: `
Type narrowing is how TypeScript refines a broad type into a more
specific one within a code block. Key techniques:

**typeof guards**: \`if (typeof x === 'string')\`
**instanceof guards**: \`if (x instanceof Date)\`
**in operator**: \`if ('type' in obj)\`
**Discriminated unions**: switch on a shared literal field
**Custom type predicates**:

\`\`\`typescript
function isString(value: unknown): value is string {
  return typeof value === 'string';
}

// Assertion functions (throw on failure):
function assertNonNull<T>(val: T): asserts val is NonNullable<T> {
  if (val === null || val === undefined) throw new Error('Null!');
}
\`\`\`

**Exhaustive checking** ensures all cases in a union are handled:
\`\`\`typescript
function assertNever(x: never): never {
  throw new Error(\`Unexpected: \${x}\`);
}
\`\`\`
`,
      mission:
        'Create a `processValue` function using type narrowing for a union type, a custom type predicate `isShape` for discriminated unions, an assertion function `assertDefined`, and an exhaustive `describeShape` function with `assertNever`.',
      scaffold: `// 1. type Shape =
//      | { kind: 'circle'; radius: number }
//      | { kind: 'rectangle'; width: number; height: number }
//      | { kind: 'triangle'; base: number; height: number }

// 2. function processValue(value: string | number | boolean | null): string
//    - string → return value.toUpperCase()
//    - number → return value.toFixed(2)
//    - boolean → return value ? 'YES' : 'NO'
//    - null → return 'NOTHING'

// 3. function isShape(value: unknown): value is Shape
//    Type predicate — checks that value is an object with a valid kind

// 4. function assertDefined<T>(value: T, message?: string): asserts value is NonNullable<T>
//    Throws if value is null or undefined

// 5. function describeShape(shape: Shape): string
//    Returns area description for each shape kind
//    Uses exhaustive checking with assertNever for safety
//    - circle: "Circle with area {PI*r^2}"  (use toFixed(2))
//    - rectangle: "Rectangle with area {w*h}"
//    - triangle: "Triangle with area {0.5*b*h}"

// 6. function assertNever(value: never): never

// TODO: implement all types and functions
`,
      solution: `type Shape =
  | { kind: 'circle'; radius: number }
  | { kind: 'rectangle'; width: number; height: number }
  | { kind: 'triangle'; base: number; height: number };

function processValue(value: string | number | boolean | null): string {
  if (value === null) return 'NOTHING';
  if (typeof value === 'string') return value.toUpperCase();
  if (typeof value === 'number') return value.toFixed(2);
  if (typeof value === 'boolean') return value ? 'YES' : 'NO';
  return assertNever(value);
}

function isShape(value: unknown): value is Shape {
  if (typeof value !== 'object' || value === null) return false;
  const obj = value as Record<string, unknown>;
  return (
    obj.kind === 'circle' ||
    obj.kind === 'rectangle' ||
    obj.kind === 'triangle'
  );
}

function assertDefined<T>(value: T, message?: string): asserts value is NonNullable<T> {
  if (value === null || value === undefined) {
    throw new Error(message ?? 'Value is null or undefined');
  }
}

function assertNever(value: never): never {
  throw new Error(\`Unexpected value: \${value}\`);
}

function describeShape(shape: Shape): string {
  switch (shape.kind) {
    case 'circle':
      return \`Circle with area \${(Math.PI * shape.radius ** 2).toFixed(2)}\`;
    case 'rectangle':
      return \`Rectangle with area \${(shape.width * shape.height).toFixed(2)}\`;
    case 'triangle':
      return \`Triangle with area \${(0.5 * shape.base * shape.height).toFixed(2)}\`;
    default:
      return assertNever(shape);
  }
}
`,
      hints: [
        'processValue: check null first, then use typeof for string, number, boolean.',
        'isShape: check typeof value === "object" && value !== null, then check the `kind` property.',
        'describeShape: use a switch on shape.kind, call assertNever in the default case.',
      ],
      tests: [
        {
          description: 'processValue handles all types correctly',
          test: `processValue('hello') === 'HELLO' && processValue(3.14159) === '3.14' && processValue(true) === 'YES' && processValue(null) === 'NOTHING';`,
          errorHint: 'Use typeof guards for each type. Check null with === null.',
        },
        {
          description: 'isShape correctly identifies valid shapes',
          test: `isShape({ kind: 'circle', radius: 5 }) === true && isShape({ kind: 'rectangle', width: 3, height: 4 }) === true;`,
          errorHint: 'Check that value is a non-null object with a valid kind property.',
        },
        {
          description: 'isShape rejects invalid values',
          test: `isShape(null) === false && isShape('circle') === false && isShape({ kind: 'hexagon' }) === false && isShape({}) === false;`,
          errorHint: 'Return false for null, non-objects, and objects without a valid kind.',
        },
        {
          description: 'assertDefined throws for null/undefined',
          test: `let threw1 = false; try { assertDefined(null); } catch { threw1 = true; } let threw2 = false; try { assertDefined(undefined); } catch { threw2 = true; } let ok = true; try { assertDefined(42); } catch { ok = false; } threw1 && threw2 && ok;`,
          errorHint: 'Throw an Error when value is null or undefined. Don\'t throw for other values.',
        },
        {
          description: 'describeShape computes correct areas',
          test: `describeShape({ kind: 'circle', radius: 1 }) === \`Circle with area \${Math.PI.toFixed(2)}\` && describeShape({ kind: 'rectangle', width: 3, height: 4 }) === 'Rectangle with area 12.00' && describeShape({ kind: 'triangle', base: 6, height: 4 }) === 'Triangle with area 12.00';`,
          errorHint: 'Use toFixed(2) for area values. Circle area = PI * r^2, Triangle area = 0.5 * base * height.',
        },
      ],
    },

    // ── Challenge 4: Error Handling Types ───────────────────────
    {
      id: 'L10-C4',
      level: 10,
      number: 4,
      title: 'Error Handling Types',
      difficulty: 'hard',
      xp: 50,
      description: `
Instead of throwing exceptions everywhere, many TypeScript projects
use **Result types** (also called Either) to make errors part of the
type system:

\`\`\`typescript
type Result<T, E = Error> =
  | { ok: true; value: T }
  | { ok: false; error: E };
\`\`\`

This forces callers to handle both success and failure:

\`\`\`typescript
function divide(a: number, b: number): Result<number, string> {
  if (b === 0) return { ok: false, error: 'Division by zero' };
  return { ok: true, value: a / b };
}

const result = divide(10, 0);
if (result.ok) {
  console.log(result.value); // TypeScript knows value exists
} else {
  console.log(result.error); // TypeScript knows error exists
}
\`\`\`

This pattern avoids uncaught exceptions and makes error flows
explicit and type-safe.
`,
      mission:
        'Implement a `Result<T, E>` type, factory functions `ok()` and `err()`, and helper functions `map`, `flatMap`, and `unwrapOr` that operate on Result values. Then use them in a `parseJSON` and `validateAge` function.',
      scaffold: `// 1. type Result<T, E = Error>
//    Discriminated union: { ok: true; value: T } | { ok: false; error: E }

// 2. function ok<T>(value: T): Result<T, never>
// 3. function err<E>(error: E): Result<never, E>

// 4. function map<T, U, E>(result: Result<T, E>, fn: (value: T) => U): Result<U, E>
//    If ok, apply fn to value. If err, pass through.

// 5. function flatMap<T, U, E>(result: Result<T, E>, fn: (value: T) => Result<U, E>): Result<U, E>
//    Like map, but fn returns a Result (avoids nested Results)

// 6. function unwrapOr<T, E>(result: Result<T, E>, defaultValue: T): T
//    Returns the value if ok, otherwise the default

// 7. function parseJSON(input: string): Result<unknown, string>
//    Try JSON.parse, return ok(parsed) or err('Invalid JSON: ...')

// 8. function validateAge(age: unknown): Result<number, string>
//    Check: is a number, is integer, is between 0-150 inclusive

// TODO: implement all types and functions
`,
      solution: `type Result<T, E = Error> =
  | { ok: true; value: T }
  | { ok: false; error: E };

function ok<T>(value: T): Result<T, never> {
  return { ok: true, value };
}

function err<E>(error: E): Result<never, E> {
  return { ok: false, error };
}

function map<T, U, E>(result: Result<T, E>, fn: (value: T) => U): Result<U, E> {
  if (result.ok) {
    return ok(fn(result.value));
  }
  return result;
}

function flatMap<T, U, E>(result: Result<T, E>, fn: (value: T) => Result<U, E>): Result<U, E> {
  if (result.ok) {
    return fn(result.value);
  }
  return result;
}

function unwrapOr<T, E>(result: Result<T, E>, defaultValue: T): T {
  if (result.ok) {
    return result.value;
  }
  return defaultValue;
}

function parseJSON(input: string): Result<unknown, string> {
  try {
    return ok(JSON.parse(input));
  } catch (e) {
    return err(\`Invalid JSON: \${(e as Error).message}\`);
  }
}

function validateAge(age: unknown): Result<number, string> {
  if (typeof age !== 'number') return err('Age must be a number');
  if (!Number.isInteger(age)) return err('Age must be an integer');
  if (age < 0 || age > 150) return err('Age must be between 0 and 150');
  return ok(age);
}
`,
      hints: [
        'ok() returns `{ ok: true, value }` with Result<T, never>. err() returns `{ ok: false, error }` with Result<never, E>`.',
        'map: if result.ok, return ok(fn(result.value)); otherwise return the original error result.',
        'parseJSON: wrap JSON.parse in try/catch, return ok(parsed) or err(`Invalid JSON: ${message}`).',
      ],
      tests: [
        {
          description: 'ok() and err() create correct Result values',
          test: `const o = ok(42); const e = err('bad'); o.ok === true && o.value === 42 && e.ok === false && e.error === 'bad';`,
          errorHint: 'ok() should return { ok: true, value }, err() should return { ok: false, error }.',
        },
        {
          description: 'map transforms ok values, passes through errors',
          test: `const doubled = map(ok(5), x => x * 2); const failed = map(err('nope'), (x: number) => x * 2); doubled.ok === true && (doubled as any).value === 10 && failed.ok === false;`,
          errorHint: 'map should apply fn only when result.ok is true.',
        },
        {
          description: 'flatMap chains Result-returning functions',
          test: `const r = flatMap(ok(10), x => x > 0 ? ok(x * 2) : err('negative')); const r2 = flatMap(ok(-1), x => x > 0 ? ok(x * 2) : err('negative')); r.ok === true && (r as any).value === 20 && r2.ok === false;`,
          errorHint: 'flatMap: if result.ok, return fn(result.value); otherwise pass through error.',
        },
        {
          description: 'unwrapOr returns value or default',
          test: `unwrapOr(ok(42), 0) === 42 && unwrapOr(err('fail'), 0) === 0;`,
          errorHint: 'Return result.value if ok, otherwise return the defaultValue.',
        },
        {
          description: 'parseJSON handles valid and invalid input',
          test: `const good = parseJSON('{"a":1}'); const bad = parseJSON('{invalid}'); good.ok === true && (good as any).value.a === 1 && bad.ok === false && (bad as any).error.startsWith('Invalid JSON');`,
          errorHint: 'Use try/catch around JSON.parse. On error, return err(`Invalid JSON: ${message}`).',
        },
        {
          description: 'validateAge rejects invalid ages',
          test: `validateAge(25).ok === true && validateAge('25').ok === false && validateAge(3.5).ok === false && validateAge(-1).ok === false && validateAge(200).ok === false;`,
          errorHint: 'Check typeof === "number", Number.isInteger(), and range 0-150.',
        },
      ],
    },

    // ── Challenge 5: Builder Pattern & Fluent APIs ─────────────
    {
      id: 'L10-C5',
      level: 10,
      number: 5,
      title: 'Builder Pattern & Fluent APIs',
      difficulty: 'hard',
      xp: 50,
      description: `
The **Builder pattern** uses method chaining (fluent API) to
construct complex objects step by step:

\`\`\`typescript
const query = new QueryBuilder()
  .select('name', 'age')
  .from('users')
  .where('age > 18')
  .orderBy('name')
  .build();
\`\`\`

In TypeScript, you can make the builder **type-safe** so it
tracks which steps have been completed at the type level:

\`\`\`typescript
class Builder<T extends object = {}> {
  private data: T;
  constructor(data: T = {} as T) { this.data = data; }

  set<K extends string, V>(key: K, value: V): Builder<T & Record<K, V>> {
    return new Builder({ ...this.data, [key]: value } as T & Record<K, V>);
  }

  build(): T { return this.data; }
}
\`\`\`

The key is that each method returns \`this\` (or a new builder) to
enable chaining.
`,
      mission:
        'Build a `QueryBuilder` class with a fluent API for constructing SQL-like query strings. It should support `select`, `from`, `where`, `orderBy`, `limit`, and `build` methods. Each setter returns `this` for chaining. `build()` returns the query string.',
      scaffold: `// Create a QueryBuilder class with fluent API:
//
// - select(...columns: string[]): this
//   → sets the columns to select (default: '*')
//
// - from(table: string): this
//   → sets the table name (required before build)
//
// - where(condition: string): this
//   → adds a WHERE condition (multiple calls = AND)
//
// - orderBy(column: string, direction?: 'ASC' | 'DESC'): this
//   → sets ORDER BY (default direction: 'ASC')
//
// - limit(count: number): this
//   → sets LIMIT
//
// - build(): string
//   → returns the SQL query string
//   → throws Error if no table has been set
//
// Example output:
//   "SELECT name, age FROM users WHERE age > 18 AND active = true ORDER BY name ASC LIMIT 10"

// TODO: implement QueryBuilder
`,
      solution: `class QueryBuilder {
  private columns: string[] = ['*'];
  private table: string | null = null;
  private conditions: string[] = [];
  private orderColumn: string | null = null;
  private orderDirection: 'ASC' | 'DESC' = 'ASC';
  private limitCount: number | null = null;

  select(...columns: string[]): this {
    this.columns = columns.length > 0 ? columns : ['*'];
    return this;
  }

  from(table: string): this {
    this.table = table;
    return this;
  }

  where(condition: string): this {
    this.conditions.push(condition);
    return this;
  }

  orderBy(column: string, direction: 'ASC' | 'DESC' = 'ASC'): this {
    this.orderColumn = column;
    this.orderDirection = direction;
    return this;
  }

  limit(count: number): this {
    this.limitCount = count;
    return this;
  }

  build(): string {
    if (!this.table) {
      throw new Error('Table name is required. Call .from() before .build()');
    }

    let query = \`SELECT \${this.columns.join(', ')} FROM \${this.table}\`;

    if (this.conditions.length > 0) {
      query += \` WHERE \${this.conditions.join(' AND ')}\`;
    }

    if (this.orderColumn) {
      query += \` ORDER BY \${this.orderColumn} \${this.orderDirection}\`;
    }

    if (this.limitCount !== null) {
      query += \` LIMIT \${this.limitCount}\`;
    }

    return query;
  }
}
`,
      hints: [
        'Store internal state as private properties: columns, table, conditions array, orderColumn, etc.',
        'Each method should modify internal state and `return this` for chaining.',
        'build() concatenates the parts: SELECT columns FROM table [WHERE ...] [ORDER BY ...] [LIMIT ...].',
      ],
      tests: [
        {
          description: 'Simple query with select and from',
          test: `const q = new QueryBuilder().select('name', 'age').from('users').build(); q === 'SELECT name, age FROM users';`,
          errorHint: 'build() should join columns with ", " and include FROM table.',
        },
        {
          description: 'Default select is *',
          test: `const q = new QueryBuilder().from('users').build(); q === 'SELECT * FROM users';`,
          errorHint: 'If no columns are specified, default to ["*"].',
        },
        {
          description: 'WHERE conditions are joined with AND',
          test: `const q = new QueryBuilder().from('users').where('age > 18').where('active = true').build(); q === 'SELECT * FROM users WHERE age > 18 AND active = true';`,
          errorHint: 'Store conditions in an array, join with " AND " in build().',
        },
        {
          description: 'Full query with all clauses',
          test: `const q = new QueryBuilder().select('name').from('users').where('age > 18').orderBy('name', 'DESC').limit(10).build(); q === 'SELECT name FROM users WHERE age > 18 ORDER BY name DESC LIMIT 10';`,
          errorHint: 'Include ORDER BY column DIRECTION and LIMIT count when set.',
        },
        {
          description: 'build() throws without from()',
          test: `let threw = false; try { new QueryBuilder().select('x').build(); } catch(e) { threw = true; } threw;`,
          errorHint: 'build() should throw an Error if .from() was never called.',
        },
        {
          description: 'Methods return this for chaining',
          test: `const qb = new QueryBuilder(); qb.select('a') === qb && qb.from('t') === qb && qb.where('x') === qb;`,
          errorHint: 'Each method should `return this`.',
        },
      ],
    },

    // ── Challenge 6: BOSS — The Final Boss ─────────────────────
    {
      id: 'L10-C6',
      level: 10,
      number: 6,
      title: 'BOSS: The Final Boss',
      difficulty: 'boss',
      xp: 200,
      description: `
**FINAL BOSS BATTLE!** This is it — the culmination of your
TypeScript journey.

You'll build a **typed event emitter** — a core pattern used in
virtually every real-world application. Your implementation must be
fully type-safe: event names are constrained, listener arguments
are typed, and method chaining is supported.

This combines:
- **Generics** — parameterized over an event map
- **Mapped types** — deriving listener signatures
- **Interfaces** — defining the contract
- **Classes** — implementing the behavior
- **Method chaining** — fluent API
- **Type narrowing** — safe internal operations
`,
      mission: `Build a fully typed EventEmitter<T> class:
1. It takes a generic type parameter \`T\` that maps event names to their argument types (e.g., \`{ click: [x: number, y: number]; error: [msg: string] }\`)
2. \`on(event, listener)\` — registers a listener, returns \`this\`
3. \`off(event, listener)\` — removes a listener, returns \`this\`
4. \`emit(event, ...args)\` — calls all listeners for that event, returns boolean (true if had listeners)
5. \`once(event, listener)\` — registers a one-time listener, returns \`this\`
6. \`listenerCount(event)\` — returns the number of listeners for an event`,
      scaffold: `// Define a type-safe EventEmitter<T> where T is an event map:
//   type EventMap = Record<string, any[]>;
//
// Example usage:
//   type MyEvents = {
//     data: [payload: string];
//     error: [message: string, code: number];
//     close: [];
//   };
//   const emitter = new EventEmitter<MyEvents>();
//   emitter.on('data', (payload) => { ... });     // payload: string
//   emitter.on('error', (msg, code) => { ... });  // msg: string, code: number
//   emitter.emit('data', 'hello');                 // type-checked args
//   emitter.emit('close');                         // no args required

// type EventMap = Record<string, any[]>;

// class EventEmitter<T extends EventMap> {
//   - private listeners: Map of event name → Set of listener functions
//
//   on<K extends keyof T>(event: K, listener: (...args: T[K]) => void): this
//   off<K extends keyof T>(event: K, listener: (...args: T[K]) => void): this
//   emit<K extends keyof T>(event: K, ...args: T[K]): boolean
//   once<K extends keyof T>(event: K, listener: (...args: T[K]) => void): this
//   listenerCount<K extends keyof T>(event: K): number
// }

// TODO: implement EventMap type and EventEmitter class
`,
      solution: `type EventMap = Record<string, any[]>;

class EventEmitter<T extends EventMap> {
  private listeners = new Map<keyof T, Set<Function>>();

  on<K extends keyof T>(event: K, listener: (...args: T[K]) => void): this {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set());
    }
    this.listeners.get(event)!.add(listener);
    return this;
  }

  off<K extends keyof T>(event: K, listener: (...args: T[K]) => void): this {
    const set = this.listeners.get(event);
    if (set) {
      set.delete(listener);
    }
    return this;
  }

  emit<K extends keyof T>(event: K, ...args: T[K]): boolean {
    const set = this.listeners.get(event);
    if (!set || set.size === 0) return false;
    for (const listener of set) {
      listener(...args);
    }
    return true;
  }

  once<K extends keyof T>(event: K, listener: (...args: T[K]) => void): this {
    const wrapper = (...args: T[K]) => {
      this.off(event, wrapper as any);
      listener(...args);
    };
    return this.on(event, wrapper as any);
  }

  listenerCount<K extends keyof T>(event: K): number {
    const set = this.listeners.get(event);
    return set ? set.size : 0;
  }
}
`,
      hints: [
        'Store listeners in a `Map<keyof T, Set<Function>>`. Initialize the Set lazily in `on()`.',
        'The key generic constraint is `<K extends keyof T>` — this ties the event name to its argument types `T[K]`.',
        'For once(), create a wrapper function that calls off() then the original listener. Register the wrapper with on().',
      ],
      tests: [
        {
          description: 'on() registers listeners and emit() calls them',
          test: `type E = { greet: [name: string] }; const ee = new EventEmitter<E>(); let received = ''; ee.on('greet', (name) => { received = name; }); ee.emit('greet', 'Alice'); received === 'Alice';`,
          errorHint: 'on() should store the listener. emit() should call all listeners for that event.',
        },
        {
          description: 'emit() returns true if there were listeners, false otherwise',
          test: `type E = { a: []; b: [] }; const ee = new EventEmitter<E>(); ee.on('a', () => {}); ee.emit('a') === true && ee.emit('b') === false;`,
          errorHint: 'Return true if there were listeners, false if the set is empty or missing.',
        },
        {
          description: 'off() removes a specific listener',
          test: `type E = { tick: [] }; const ee = new EventEmitter<E>(); let count = 0; const fn = () => { count++; }; ee.on('tick', fn); ee.emit('tick'); ee.off('tick', fn); ee.emit('tick'); count === 1;`,
          errorHint: 'off() should remove the exact function reference from the Set.',
        },
        {
          description: 'once() fires listener only once',
          test: `type E = { ping: [] }; const ee = new EventEmitter<E>(); let count = 0; ee.once('ping', () => { count++; }); ee.emit('ping'); ee.emit('ping'); ee.emit('ping'); count === 1;`,
          errorHint: 'once() should auto-remove the listener after first invocation.',
        },
        {
          description: 'listenerCount() returns correct count',
          test: `type E = { x: [] }; const ee = new EventEmitter<E>(); ee.listenerCount('x') === 0 && (ee.on('x', () => {}), ee.on('x', () => {}), ee.listenerCount('x') === 2);`,
          errorHint: 'Return the size of the listener Set, or 0 if no Set exists.',
        },
        {
          description: 'emit() passes correct arguments to listeners',
          test: `type E = { add: [a: number, b: number] }; const ee = new EventEmitter<E>(); let result = 0; ee.on('add', (a, b) => { result = a + b; }); ee.emit('add', 3, 7); result === 10;`,
          errorHint: 'emit() should spread args to each listener: `listener(...args)`.',
        },
        {
          description: 'Methods return this for chaining',
          test: `type E = { a: []; b: [] }; const ee = new EventEmitter<E>(); const chained = ee.on('a', () => {}).on('b', () => {}); chained === ee;`,
          errorHint: 'on(), off(), and once() should all return `this`.',
        },
      ],
    },
  ],
};
