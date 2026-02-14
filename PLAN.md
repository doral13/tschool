# TSchool - Gamified TypeScript Learning Platform

## Vision
An interactive CLI-based course that takes you from zero to TypeScript guru through
hands-on coding challenges. The learner edits real `.ts` files, runs a checker, and
gets instant feedback with hints, XP, streaks, and achievements.

---

## Architecture

```
tschool/
  package.json
  tsconfig.json
  src/
    engine/
      runner.ts          # Orchestrates challenge flow
      validator.ts       # Compiles & tests user solutions
      progress.ts        # Tracks XP, level, streaks, achievements
      feedback.ts        # Generates hints & error explanations
      display.ts         # CLI rendering (colors, ASCII art, progress bars)
      types.ts           # Shared types
    challenges/
      index.ts           # Challenge registry & loader
      level-01-basics/
        challenge-01.ts  # Challenge definition (instructions, tests, hints)
        challenge-02.ts
        ...
        boss.ts          # Boss battle for level 1
      level-02-functions/
        ...
      ... (through level-10)
    data/
      achievements.ts    # Achievement definitions
      ascii-art.ts       # Fun ASCII art for milestones
    index.ts             # Entry point (CLI)
  workspace/             # Where learner writes their solutions
    level-01/
      challenge-01.ts    # Scaffold files the learner edits
      ...
  progress.json          # Persisted progress (XP, completed, streaks)
```

---

## Gamification Mechanics

### XP System
- Each challenge awards XP based on difficulty (10/25/50/100)
- Bonus XP for first-try solves ("Flawless Victory" +50%)
- Bonus XP for streak (3+ in a row without mistakes: +25%)
- Boss battles award 200 XP

### Ranks (cumulative XP thresholds)
1. **Novice Coder** (0 XP)
2. **Type Apprentice** (100 XP)
3. **Syntax Warrior** (300 XP)
4. **Interface Architect** (600 XP)
5. **Generic Wizard** (1000 XP)
6. **Type Guard Sentinel** (1500 XP)
7. **Advanced Alchemist** (2200 XP)
8. **Module Master** (3000 XP)
9. **TypeScript Guru** (4000 XP)

### Achievements (unlockable badges)
- "First Blood" - Complete your first challenge
- "Flawless" - Solve a challenge on the first try
- "On Fire" - 5 challenges in a row without errors
- "Unstoppable" - 10 in a row
- "Bug Squasher" - Fix a deliberately broken file
- "Speed Demon" - Solve a challenge in under 60 seconds
- "Boss Slayer" - Defeat a boss battle
- "Completionist" - Finish all challenges in a level
- "TypeScript Guru" - Complete the entire course

### Streaks
- Consecutive correct answers build a streak counter
- Streak multiplier displayed in the UI
- Breaking a streak shows an encouraging "Try again!" message

### Progress Bar
- Per-level progress bar showing challenges completed
- Overall course completion percentage
- Current rank with XP to next rank

---

## Curriculum (10 Levels + Boss Battles)

### Level 1: "The Basics" (5 challenges + boss)
1. Hello Types - Declare variables with type annotations (string, number, boolean)
2. Type Inference - Let TS infer types, predict what TS infers
3. Any vs Unknown - Understand the escape hatches and why unknown > any
4. Type Assertions - Use `as` keyword properly
5. Const Assertions - `as const` and readonly
- BOSS: "The Type Fixer" - Fix a file full of type errors

### Level 2: "Functions" (5 challenges + boss)
1. Function Signatures - Parameter types & return types
2. Optional & Default Params - `?` and `= defaultValue`
3. Rest Parameters - Spread and rest with types
4. Function Overloads - Multiple signatures
5. Arrow Functions & Callbacks - Typed callbacks
- BOSS: "The Function Factory" - Build a utility function library

### Level 3: "Collections" (5 challenges + boss)
1. Typed Arrays - `number[]` vs `Array<number>`
2. Tuples - Fixed-length typed arrays
3. Object Types - Inline object types
4. Readonly & Optional Properties - Immutability
5. Index Signatures - Dynamic keys
- BOSS: "The Data Wrangler" - Transform messy data with correct types

### Level 4: "Interfaces & Type Aliases" (5 challenges + boss)
1. Your First Interface - Define and implement
2. Extending Interfaces - Interface inheritance
3. Type Aliases - When to use type vs interface
4. Intersection Types with Type Aliases
5. Declaration Merging - Interface merging behavior
- BOSS: "The API Architect" - Design a full API type system

### Level 5: "Unions & Narrowing" (5 challenges + boss)
1. Union Types - `string | number`
2. Discriminated Unions - Tagged unions with `kind` field
3. Type Guards - `typeof`, `instanceof`, `in`
4. Custom Type Guards - `is` keyword
5. Exhaustive Checks - `never` for completeness
- BOSS: "The Shape Shifter" - Handle a complex state machine

### Level 6: "Generics" (5 challenges + boss)
1. Generic Functions - `<T>` basics
2. Generic Constraints - `extends` keyword
3. Generic Interfaces & Types
4. Multiple Type Parameters - `<T, U>`
5. Generic Defaults - `<T = string>`
- BOSS: "The Collection Master" - Build a type-safe data structure

### Level 7: "Enums & Literal Types" (5 challenges + boss)
1. Numeric Enums
2. String Enums
3. Const Enums & Enum Patterns
4. Literal Types - Exact value types
5. Template Literal Types - String manipulation at type level
- BOSS: "The Config Builder" - Build a type-safe configuration system

### Level 8: "Classes & OOP" (5 challenges + boss)
1. Class Basics - Properties, constructor, methods
2. Access Modifiers - public, private, protected
3. Abstract Classes
4. Implementing Interfaces
5. Mixins & Patterns
- BOSS: "The Game Engine" - Build a mini entity-component system

### Level 9: "Advanced Types" (5 challenges + boss)
1. Mapped Types - `{ [K in keyof T]: ... }`
2. Conditional Types - `T extends U ? X : Y`
3. Infer Keyword - Extract types
4. Utility Types - Partial, Required, Pick, Omit, Record
5. Recursive Types - Self-referencing types
- BOSS: "The Type Wizard" - Implement custom utility types

### Level 10: "Real World TypeScript" (5 challenges + boss)
1. Module Systems - import/export patterns
2. Declaration Files - `.d.ts` basics
3. Type Narrowing Patterns - Real-world patterns
4. Error Handling Types - Result/Either patterns
5. Builder Pattern & Fluent APIs - Typed method chaining
- BOSS: "The Final Boss" - Build a fully typed mini-framework

---

## Feedback System

### On Correct Answer
- Green checkmark with encouraging message
- XP awarded animation
- Achievement popup if unlocked
- Progress bar update

### On Wrong Answer
- Red X with specific error explanation
- "Common Mistake" hint explaining why it's wrong
- "Try Again" prompt (no XP penalty, but streak resets)
- After 2 failed attempts: show a more detailed hint
- After 3 failed attempts: offer to reveal the answer (no XP awarded)

### Error Messages (friendly translations)
Map common TS compiler errors to beginner-friendly explanations:
- `TS2322` -> "The type you're assigning doesn't match what's expected..."
- `TS2345` -> "The argument you passed is the wrong type..."
- `TS2339` -> "This property doesn't exist on this type..."
- etc.

---

## CLI Interface

### Main Menu
```
 _____ ____       _                 _
|_   _/ ___|  ___| |__   ___   ___ | |
  | | \___ \ / __| '_ \ / _ \ / _ \| |
  | |  ___) | (__| | | | (_) | (_) | |
  |_| |____/ \___|_| |_|\___/ \___/|_|

  Welcome back, Adventurer!

  Rank: Syntax Warrior          XP: 340/600
  [==============----------]    57%
  Streak: 3 challenges

  [1] Continue (Level 3, Challenge 2)
  [2] Level Select
  [3] Achievements
  [4] Stats
  [5] Help
  [q] Quit
```

### Challenge View
```
=== Level 3: Collections ===
--- Challenge 2: Tuples ---

  A tuple is a fixed-length array where each element has a
  specific type. Unlike regular arrays, tuples know exactly
  what type lives at each index.

  YOUR MISSION:
  Open workspace/level-03/challenge-02.ts and complete the tasks.

  [c] Check my solution
  [h] Hint (2 remaining)
  [s] Skip (no XP)
  [b] Back to menu
```

---

## Technical Implementation

### Validation Strategy
1. User edits a `.ts` file in `workspace/`
2. Engine compiles the file with the TypeScript compiler API
3. If compilation succeeds, run assertion-based tests
4. Tests are simple equality/type checks defined in the challenge
5. Report results with friendly feedback

### Challenge Definition Format
```typescript
interface Challenge {
  id: string;
  level: number;
  number: number;
  title: string;
  description: string;         // Lesson content (markdown)
  mission: string;             // What the user needs to do
  difficulty: 'easy' | 'medium' | 'hard' | 'boss';
  xp: number;
  scaffold: string;            // Initial file content with TODOs
  solution: string;            // Reference solution (for reveal)
  hints: string[];             // Progressive hints
  tests: TestCase[];           // Validation tests
}

interface TestCase {
  description: string;
  test: string;                // Code to eval that should return true
  errorHint: string;           // Shown when this specific test fails
}
```

### Progress Persistence
```typescript
interface Progress {
  currentLevel: number;
  currentChallenge: number;
  xp: number;
  rank: string;
  streak: number;
  bestStreak: number;
  completedChallenges: string[];  // challenge IDs
  achievements: string[];
  attempts: Record<string, number>;  // challengeId -> attempt count
  startedAt: string;
  lastPlayedAt: string;
  totalTimeMinutes: number;
}
```

---

## Implementation Order
1. Initialize project (package.json, tsconfig)
2. Build core engine (types, validator, progress, feedback, display, runner)
3. Build Level 1 challenges (basics - to test the engine)
4. Build CLI interface
5. Build remaining levels 2-10
6. Add boss battles
7. Polish (ASCII art, colors, edge cases)
8. Test end-to-end

---

## Status Tracker
- [x] Planning
- [ ] Project init
- [ ] Core engine
- [ ] Level 1
- [ ] CLI interface
- [ ] Levels 2-10
- [ ] Boss battles
- [ ] Polish & testing
