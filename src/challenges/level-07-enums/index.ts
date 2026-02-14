import { LevelDefinition } from '../../engine/types';

export const level07: LevelDefinition = {
  number: 7,
  title: 'Enums & Literal Types',
  description:
    'Enums give you a way to define a set of named constants, and literal types let you narrow values down to exact strings, numbers, or booleans. Together they make your code self-documenting and impossible to misuse.',
  challenges: [
    // -------------------------------------------------------
    // 7-1  Numeric Enums
    // -------------------------------------------------------
    {
      id: 'enums-numeric',
      level: 7,
      number: 1,
      title: 'Numeric Enums',
      description: `A **numeric enum** assigns auto-incrementing numbers to each member:

\`\`\`ts
enum Direction {
  Up,    // 0
  Down,  // 1
  Left,  // 2
  Right, // 3
}

const move: Direction = Direction.Up; // 0
\`\`\`

You can also set a custom starting value:
\`\`\`ts
enum StatusCode {
  OK = 200,
  NotFound = 404,
  ServerError = 500,
}
\`\`\``,
      mission:
        'Define a numeric enum `HttpStatus` with members `OK` (200), `Created` (201), `BadRequest` (400), `NotFound` (404), and `InternalServerError` (500). Then write a function `isSuccess(status: HttpStatus): boolean` that returns `true` if the status code is less than 400.',
      difficulty: 'easy',
      xp: 10,
      scaffold: `// Define a numeric enum for HTTP status codes
// TODO: define HttpStatus enum

// Return true if the status code represents success (< 400)
// TODO: implement isSuccess
`,
      solution: `enum HttpStatus {
  OK = 200,
  Created = 201,
  BadRequest = 400,
  NotFound = 404,
  InternalServerError = 500,
}

function isSuccess(status: HttpStatus): boolean {
  return status < 400;
}
`,
      hints: [
        'Use `enum HttpStatus { OK = 200, Created = 201, ... }`.',
        'Numeric enum members are just numbers at runtime, so you can compare with `<`.',
        '`isSuccess` should return `status < 400`.',
      ],
      tests: [
        {
          description: 'HttpStatus.OK equals 200',
          test: `(() => { return HttpStatus.OK === 200; })()`,
          errorHint: '`HttpStatus.OK` should be `200`.',
        },
        {
          description: 'HttpStatus.NotFound equals 404',
          test: `(() => { return HttpStatus.NotFound === 404; })()`,
          errorHint: '`HttpStatus.NotFound` should be `404`.',
        },
        {
          description: 'HttpStatus.InternalServerError equals 500',
          test: `(() => { return HttpStatus.InternalServerError === 500; })()`,
          errorHint: '`HttpStatus.InternalServerError` should be `500`.',
        },
        {
          description: 'isSuccess returns true for success codes',
          test: `(() => { return isSuccess(HttpStatus.OK) === true && isSuccess(HttpStatus.Created) === true; })()`,
          errorHint: '`isSuccess(HttpStatus.OK)` and `isSuccess(HttpStatus.Created)` should both return `true`.',
        },
        {
          description: 'isSuccess returns false for error codes',
          test: `(() => { return isSuccess(HttpStatus.BadRequest) === false && isSuccess(HttpStatus.NotFound) === false && isSuccess(HttpStatus.InternalServerError) === false; })()`,
          errorHint: 'Error status codes (>= 400) should make `isSuccess` return `false`.',
        },
      ],
    },

    // -------------------------------------------------------
    // 7-2  String Enums
    // -------------------------------------------------------
    {
      id: 'enums-string',
      level: 7,
      number: 2,
      title: 'String Enums',
      description: `**String enums** assign a string literal to every member. They're more readable in logs and debugging:

\`\`\`ts
enum Color {
  Red = "RED",
  Green = "GREEN",
  Blue = "BLUE",
}

console.log(Color.Red); // "RED"
\`\`\`

Unlike numeric enums, string enums don't auto-increment — you must assign every value.`,
      mission:
        'Define a string enum `LogLevel` with members `Debug` ("DEBUG"), `Info` ("INFO"), `Warn` ("WARN"), and `Error` ("ERROR"). Then write a function `shouldAlert(level: LogLevel): boolean` that returns `true` only for `Warn` or `Error` levels. Finally, write a function `formatLog(level: LogLevel, message: string): string` that returns a string in the format `"[LEVEL] message"` (e.g., `"[INFO] Server started"`).',
      difficulty: 'easy',
      xp: 10,
      scaffold: `// Define a string enum for log levels
// TODO: define LogLevel enum

// Return true if the level should trigger an alert
// TODO: implement shouldAlert

// Format a log message as "[LEVEL] message"
// TODO: implement formatLog
`,
      solution: `enum LogLevel {
  Debug = "DEBUG",
  Info = "INFO",
  Warn = "WARN",
  Error = "ERROR",
}

function shouldAlert(level: LogLevel): boolean {
  return level === LogLevel.Warn || level === LogLevel.Error;
}

function formatLog(level: LogLevel, message: string): string {
  return \`[\${level}] \${message}\`;
}
`,
      hints: [
        'String enums require explicit values: `enum LogLevel { Debug = "DEBUG", ... }`.',
        'Compare with `level === LogLevel.Warn || level === LogLevel.Error`.',
        'Use a template literal: `` `[${level}] ${message}` ``.',
      ],
      tests: [
        {
          description: 'LogLevel members have correct string values',
          test: `(() => { return LogLevel.Debug === "DEBUG" && LogLevel.Info === "INFO" && LogLevel.Warn === "WARN" && LogLevel.Error === "ERROR"; })()`,
          errorHint: 'Each LogLevel member should map to its uppercase string value.',
        },
        {
          description: 'shouldAlert returns false for Debug and Info',
          test: `(() => { return shouldAlert(LogLevel.Debug) === false && shouldAlert(LogLevel.Info) === false; })()`,
          errorHint: '`shouldAlert` should return `false` for `Debug` and `Info`.',
        },
        {
          description: 'shouldAlert returns true for Warn and Error',
          test: `(() => { return shouldAlert(LogLevel.Warn) === true && shouldAlert(LogLevel.Error) === true; })()`,
          errorHint: '`shouldAlert` should return `true` for `Warn` and `Error`.',
        },
        {
          description: 'formatLog produces the correct format',
          test: `(() => { return formatLog(LogLevel.Info, "Server started") === "[INFO] Server started"; })()`,
          errorHint: '`formatLog(LogLevel.Info, "Server started")` should return `"[INFO] Server started"`.',
        },
        {
          description: 'formatLog works with all levels',
          test: `(() => { return formatLog(LogLevel.Error, "Crash") === "[ERROR] Crash"; })()`,
          errorHint: '`formatLog(LogLevel.Error, "Crash")` should return `"[ERROR] Crash"`.',
        },
      ],
    },

    // -------------------------------------------------------
    // 7-3  Const Enums & Enum Patterns
    // -------------------------------------------------------
    {
      id: 'enums-const-patterns',
      level: 7,
      number: 3,
      title: 'Const Enums & Enum Patterns',
      description: `A \`const enum\` is completely erased at compile time — its values are inlined:

\`\`\`ts
const enum Flags {
  None = 0,
  Read = 1,
  Write = 2,
  Execute = 4,
}
// At runtime: just the number 3, no Flags object
const perms = Flags.Read | Flags.Write; // 3
\`\`\`

A common alternative to enums is the **"object as const" pattern**:
\`\`\`ts
const Direction = {
  Up: "UP",
  Down: "DOWN",
} as const;

type Direction = (typeof Direction)[keyof typeof Direction]; // "UP" | "DOWN"
\`\`\`

This gives you enum-like behavior with full type inference and no runtime overhead beyond a plain object.`,
      mission:
        'Create an `as const` object called `Theme` with keys `Light`, `Dark`, and `System` mapping to string values `"light"`, `"dark"`, and `"system"`. Then derive a type `Theme` from it (the union of its values). Finally, write a function `getThemeLabel(theme: Theme): string` that returns `"Light Mode"`, `"Dark Mode"`, or `"System Default"` accordingly.',
      difficulty: 'medium',
      xp: 25,
      scaffold: `// Create a const object pattern for themes
// TODO: define Theme object with "as const"

// Derive a Theme type from the object values
// TODO: define Theme type

// Return a human-readable label for each theme
// TODO: implement getThemeLabel
`,
      solution: `const Theme = {
  Light: "light",
  Dark: "dark",
  System: "system",
} as const;

type Theme = (typeof Theme)[keyof typeof Theme];

function getThemeLabel(theme: Theme): string {
  switch (theme) {
    case Theme.Light:
      return "Light Mode";
    case Theme.Dark:
      return "Dark Mode";
    case Theme.System:
      return "System Default";
  }
}
`,
      hints: [
        'Use `as const` on the object literal to narrow values to literal types.',
        'Derive the type: `type Theme = (typeof Theme)[keyof typeof Theme];` — this produces `"light" | "dark" | "system"`.',
        'Use a `switch` on the theme value, matching against `Theme.Light`, `Theme.Dark`, `Theme.System`.',
      ],
      tests: [
        {
          description: 'Theme object has correct values',
          test: `(() => { return Theme.Light === "light" && Theme.Dark === "dark" && Theme.System === "system"; })()`,
          errorHint: '`Theme.Light` should be `"light"`, `Theme.Dark` should be `"dark"`, etc.',
        },
        {
          description: 'getThemeLabel returns "Light Mode" for light',
          test: `(() => { return getThemeLabel("light") === "Light Mode"; })()`,
          errorHint: '`getThemeLabel("light")` should return `"Light Mode"`.',
        },
        {
          description: 'getThemeLabel returns "Dark Mode" for dark',
          test: `(() => { return getThemeLabel("dark") === "Dark Mode"; })()`,
          errorHint: '`getThemeLabel("dark")` should return `"Dark Mode"`.',
        },
        {
          description: 'getThemeLabel returns "System Default" for system',
          test: `(() => { return getThemeLabel("system") === "System Default"; })()`,
          errorHint: '`getThemeLabel("system")` should return `"System Default"`.',
        },
      ],
    },

    // -------------------------------------------------------
    // 7-4  Literal Types
    // -------------------------------------------------------
    {
      id: 'enums-literal-types',
      level: 7,
      number: 4,
      title: 'Literal Types',
      description: `TypeScript can narrow a type down to an **exact value**:

\`\`\`ts
type YesOrNo = "yes" | "no";
type DiceRoll = 1 | 2 | 3 | 4 | 5 | 6;
type Falsy = false | 0 | "" | null | undefined;

function respond(answer: YesOrNo): string {
  return answer === "yes" ? "Great!" : "Maybe later.";
}
\`\`\`

Literal types pair perfectly with discriminated unions for exhaustive pattern matching.`,
      mission:
        'Define a type `Suit` as the union `"hearts" | "diamonds" | "clubs" | "spades"`. Define a type `Rank` as the union of numbers `1` through `13`. Define a type `Card` as `{ suit: Suit; rank: Rank }`. Write a function `cardName(card: Card): string` that returns a human-readable name like `"Ace of Hearts"`, `"King of Spades"`, etc. Use `Ace` for rank 1, `Jack` for 11, `Queen` for 12, `King` for 13, and the number as a string for everything else. Capitalize the suit (e.g. `"Hearts"`).',
      difficulty: 'medium',
      xp: 25,
      scaffold: `// Define literal types for a deck of cards
// TODO: define Suit type
// TODO: define Rank type
// TODO: define Card type

// Return a human-readable card name like "Ace of Hearts"
// TODO: implement cardName
`,
      solution: `type Suit = "hearts" | "diamonds" | "clubs" | "spades";
type Rank = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13;
type Card = { suit: Suit; rank: Rank };

function cardName(card: Card): string {
  let rankName: string;
  switch (card.rank) {
    case 1:
      rankName = "Ace";
      break;
    case 11:
      rankName = "Jack";
      break;
    case 12:
      rankName = "Queen";
      break;
    case 13:
      rankName = "King";
      break;
    default:
      rankName = String(card.rank);
  }

  const suitName = card.suit[0].toUpperCase() + card.suit.slice(1);
  return \`\${rankName} of \${suitName}\`;
}
`,
      hints: [
        'Use union types for both: `type Suit = "hearts" | "diamonds" | ...` and `type Rank = 1 | 2 | ... | 13`.',
        'In `cardName`, use a `switch` on `card.rank` for face cards (1, 11, 12, 13).',
        'Capitalize the suit with `card.suit[0].toUpperCase() + card.suit.slice(1)`.',
      ],
      tests: [
        {
          description: 'cardName handles Ace correctly',
          test: `(() => { return cardName({ suit: "hearts", rank: 1 }) === "Ace of Hearts"; })()`,
          errorHint: '`cardName({ suit: "hearts", rank: 1 })` should return `"Ace of Hearts"`.',
        },
        {
          description: 'cardName handles number cards',
          test: `(() => { return cardName({ suit: "diamonds", rank: 7 }) === "7 of Diamonds"; })()`,
          errorHint: '`cardName({ suit: "diamonds", rank: 7 })` should return `"7 of Diamonds"`.',
        },
        {
          description: 'cardName handles Jack, Queen, King',
          test: `(() => { return cardName({ suit: "clubs", rank: 11 }) === "Jack of Clubs" && cardName({ suit: "spades", rank: 12 }) === "Queen of Spades" && cardName({ suit: "hearts", rank: 13 }) === "King of Hearts"; })()`,
          errorHint: 'Face cards should use "Jack", "Queen", "King" instead of numbers.',
        },
        {
          description: 'cardName handles 10',
          test: `(() => { return cardName({ suit: "spades", rank: 10 }) === "10 of Spades"; })()`,
          errorHint: '`cardName({ suit: "spades", rank: 10 })` should return `"10 of Spades"`.',
        },
      ],
    },

    // -------------------------------------------------------
    // 7-5  Template Literal Types
    // -------------------------------------------------------
    {
      id: 'enums-template-literals',
      level: 7,
      number: 5,
      title: 'Template Literal Types',
      description: `TypeScript can compute **new string literal types** from existing ones using template syntax:

\`\`\`ts
type Color = "red" | "blue";
type Size = "sm" | "lg";

type ClassName = \\\`\\\${Size}-\\\${Color}\\\`;
// "sm-red" | "sm-blue" | "lg-red" | "lg-blue"
\`\`\`

This is incredibly powerful for generating CSS class names, event names, and API routes at the type level.`,
      mission: `Define a type \`HttpMethod\` as \`"GET" | "POST" | "PUT" | "DELETE"\`. Define a type \`Resource\` as \`"users" | "posts" | "comments"\`. Use a template literal type to define \`Endpoint\` as all possible combinations in the format \`"\${HttpMethod} /api/\${Resource}"\` (e.g. \`"GET /api/users"\`).

Then write a function \`parseEndpoint(endpoint: Endpoint): { method: HttpMethod; resource: Resource }\` that splits an endpoint string into its parts.`,
      difficulty: 'hard',
      xp: 50,
      scaffold: `// Define HTTP method and resource types
// TODO: define HttpMethod type
// TODO: define Resource type

// Use a template literal type to create all valid endpoints
// TODO: define Endpoint type

// Parse an endpoint string into its method and resource
// TODO: implement parseEndpoint
`,
      solution: `type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";
type Resource = "users" | "posts" | "comments";

type Endpoint = \`\${HttpMethod} /api/\${Resource}\`;

function parseEndpoint(endpoint: Endpoint): { method: HttpMethod; resource: Resource } {
  const [method, path] = endpoint.split(" ");
  const resource = path.replace("/api/", "");
  return { method: method as HttpMethod, resource: resource as Resource };
}
`,
      hints: [
        'Template literal types use backtick syntax at the type level: `` type Endpoint = `${HttpMethod} /api/${Resource}` ``.',
        'TypeScript will automatically distribute the union, generating all 12 combinations.',
        'In `parseEndpoint`, split on `" "` and strip `"/api/"` from the path. Cast the results back to their literal types.',
      ],
      tests: [
        {
          description: 'parseEndpoint parses GET /api/users',
          test: `(() => { const r = parseEndpoint("GET /api/users"); return r.method === "GET" && r.resource === "users"; })()`,
          errorHint: '`parseEndpoint("GET /api/users")` should return `{ method: "GET", resource: "users" }`.',
        },
        {
          description: 'parseEndpoint parses POST /api/posts',
          test: `(() => { const r = parseEndpoint("POST /api/posts"); return r.method === "POST" && r.resource === "posts"; })()`,
          errorHint: '`parseEndpoint("POST /api/posts")` should return `{ method: "POST", resource: "posts" }`.',
        },
        {
          description: 'parseEndpoint parses DELETE /api/comments',
          test: `(() => { const r = parseEndpoint("DELETE /api/comments"); return r.method === "DELETE" && r.resource === "comments"; })()`,
          errorHint: '`parseEndpoint("DELETE /api/comments")` should return `{ method: "DELETE", resource: "comments" }`.',
        },
        {
          description: 'parseEndpoint parses PUT /api/users',
          test: `(() => { const r = parseEndpoint("PUT /api/users"); return r.method === "PUT" && r.resource === "users"; })()`,
          errorHint: '`parseEndpoint("PUT /api/users")` should return `{ method: "PUT", resource: "users" }`.',
        },
      ],
    },

    // -------------------------------------------------------
    // 7-6  BOSS: The Config Builder
    // -------------------------------------------------------
    {
      id: 'enums-boss',
      level: 7,
      number: 6,
      title: 'BOSS: The Config Builder',
      description: `Time to put enums, literal types, and template literals together!

You'll build a **type-safe configuration system** — a builder pattern where the types track which fields have been set, preventing duplicate settings and ensuring all required fields are present before building.

This mirrors real-world patterns in libraries like Zod, tRPC, and many CLI frameworks.`,
      mission: `Create a type-safe config builder for a server configuration.

1. Define a string enum \`Environment\` with values \`Development\`, \`Staging\`, and \`Production\` (mapped to \`"development"\`, \`"staging"\`, \`"production"\`).

2. Define an interface \`ServerConfig\` with:
   - \`port: number\`
   - \`host: string\`
   - \`env: Environment\`
   - \`debug: boolean\`

3. Write a function \`createConfigBuilder()\` that returns a builder object with:
   - \`setPort(port: number)\` — returns the builder (for chaining)
   - \`setHost(host: string)\` — returns the builder
   - \`setEnv(env: Environment)\` — returns the builder
   - \`setDebug(debug: boolean)\` — returns the builder
   - \`build(): ServerConfig\` — returns the final config. Throws an Error with message \`"Missing required fields"\` if any field is not set.
   - \`toDisplayString(): string\` — returns a summary like \`"Server<host:port env=ENV debug=BOOL>"\` e.g. \`"Server<localhost:3000 env=development debug=true>"\`. Throws if not all fields are set.

The builder must support method chaining: \`createConfigBuilder().setPort(3000).setHost("localhost")...\``,
      difficulty: 'boss',
      xp: 200,
      scaffold: `// Define Environment enum
// TODO: define Environment enum

// Define ServerConfig interface
// TODO: define ServerConfig interface

// Build a type-safe config builder with method chaining
// TODO: implement createConfigBuilder
`,
      solution: `enum Environment {
  Development = "development",
  Staging = "staging",
  Production = "production",
}

interface ServerConfig {
  port: number;
  host: string;
  env: Environment;
  debug: boolean;
}

function createConfigBuilder() {
  let port: number | undefined;
  let host: string | undefined;
  let env: Environment | undefined;
  let debug: boolean | undefined;

  const builder = {
    setPort(p: number) {
      port = p;
      return builder;
    },
    setHost(h: string) {
      host = h;
      return builder;
    },
    setEnv(e: Environment) {
      env = e;
      return builder;
    },
    setDebug(d: boolean) {
      debug = d;
      return builder;
    },
    build(): ServerConfig {
      if (port === undefined || host === undefined || env === undefined || debug === undefined) {
        throw new Error("Missing required fields");
      }
      return { port, host, env, debug };
    },
    toDisplayString(): string {
      if (port === undefined || host === undefined || env === undefined || debug === undefined) {
        throw new Error("Missing required fields");
      }
      return \`Server<\${host}:\${port} env=\${env} debug=\${debug}>\`;
    },
  };

  return builder;
}
`,
      hints: [
        'Use closures: `let port: number | undefined` etc. Each setter assigns the value and returns `builder` for chaining.',
        'In `build()`, check all four fields are not `undefined`. If any is missing, `throw new Error("Missing required fields")`.',
        'For `toDisplayString`, use a template literal: `` `Server<${host}:${port} env=${env} debug=${debug}>` ``.',
      ],
      tests: [
        {
          description: 'Environment enum has correct string values',
          test: `(() => { return Environment.Development === "development" && Environment.Staging === "staging" && Environment.Production === "production"; })()`,
          errorHint: 'Environment members should map to lowercase string values.',
        },
        {
          description: 'Builder supports method chaining',
          test: `(() => { const b = createConfigBuilder(); const result = b.setPort(3000).setHost("localhost").setEnv(Environment.Development).setDebug(true); return result === b; })()`,
          errorHint: 'Each setter should return the builder object for chaining.',
        },
        {
          description: 'build() returns a complete ServerConfig',
          test: `(() => { const config = createConfigBuilder().setPort(8080).setHost("0.0.0.0").setEnv(Environment.Production).setDebug(false).build(); return config.port === 8080 && config.host === "0.0.0.0" && config.env === "production" && config.debug === false; })()`,
          errorHint: '`build()` should return an object with all four properties set correctly.',
        },
        {
          description: 'build() throws when fields are missing',
          test: `(() => { try { createConfigBuilder().setPort(3000).build(); return false; } catch (e) { return e instanceof Error && e.message === "Missing required fields"; } })()`,
          errorHint: '`build()` should throw `Error("Missing required fields")` when not all fields are set.',
        },
        {
          description: 'toDisplayString produces correct format',
          test: `(() => { const s = createConfigBuilder().setHost("localhost").setPort(3000).setEnv(Environment.Development).setDebug(true).toDisplayString(); return s === "Server<localhost:3000 env=development debug=true>"; })()`,
          errorHint: '`toDisplayString()` should return `"Server<localhost:3000 env=development debug=true>"`.',
        },
        {
          description: 'toDisplayString throws when fields are missing',
          test: `(() => { try { createConfigBuilder().setPort(3000).toDisplayString(); return false; } catch (e) { return e instanceof Error && e.message === "Missing required fields"; } })()`,
          errorHint: '`toDisplayString()` should throw when not all fields are set.',
        },
        {
          description: 'Multiple builds are independent',
          test: `(() => { const b = createConfigBuilder().setPort(3000).setHost("a").setEnv(Environment.Staging).setDebug(false); const c1 = b.build(); b.setPort(9999); const c2 = b.build(); return c1.port === 3000 && c2.port === 9999; })()`,
          errorHint: 'Calling setters after build should affect subsequent builds.',
        },
      ],
    },
  ],
};
