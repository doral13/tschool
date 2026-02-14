// ============================================================
// TSchool - Core Type Definitions
// ============================================================

export type Difficulty = 'easy' | 'medium' | 'hard' | 'boss';

export interface TestCase {
  description: string;
  /** Code string that will be evaluated - should return true if passing */
  test: string;
  /** Friendly hint shown when this specific test fails */
  errorHint: string;
}

export interface Challenge {
  id: string;
  level: number;
  number: number;
  title: string;
  /** Lesson content explaining the concept */
  description: string;
  /** What the user needs to do */
  mission: string;
  difficulty: Difficulty;
  xp: number;
  /** Initial file content with TODO markers */
  scaffold: string;
  /** Reference solution (for reveal after 3 failures) */
  solution: string;
  /** Progressive hints - revealed one at a time */
  hints: string[];
  /** Validation tests */
  tests: TestCase[];
}

export interface LevelDefinition {
  number: number;
  title: string;
  description: string;
  challenges: Challenge[];
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  /** Function that checks if achievement is unlocked */
  check: (progress: Progress) => boolean;
}

export interface Progress {
  currentLevel: number;
  currentChallenge: number;
  xp: number;
  rank: string;
  streak: number;
  bestStreak: number;
  completedChallenges: string[];
  achievements: string[];
  attempts: Record<string, number>;
  flawless: string[]; // challenges solved on first try
  startedAt: string;
  lastPlayedAt: string;
  totalTimeMinutes: number;
}

export interface ValidationResult {
  success: boolean;
  compilationErrors: CompilationError[];
  testResults: TestResult[];
}

export interface CompilationError {
  line: number;
  column: number;
  message: string;
  friendlyMessage: string;
  code: number;
}

export interface TestResult {
  description: string;
  passed: boolean;
  errorHint?: string;
}

export interface Rank {
  name: string;
  minXP: number;
  icon: string;
}

export const RANKS: Rank[] = [
  { name: 'Novice Coder', minXP: 0, icon: '🌱' },
  { name: 'Type Apprentice', minXP: 100, icon: '📝' },
  { name: 'Syntax Warrior', minXP: 300, icon: '⚔️' },
  { name: 'Interface Architect', minXP: 600, icon: '🏗️' },
  { name: 'Generic Wizard', minXP: 1000, icon: '🧙' },
  { name: 'Type Guard Sentinel', minXP: 1500, icon: '🛡️' },
  { name: 'Advanced Alchemist', minXP: 2200, icon: '⚗️' },
  { name: 'Module Master', minXP: 3000, icon: '📦' },
  { name: 'TypeScript Guru', minXP: 4000, icon: '👑' },
];

export function getRank(xp: number): Rank {
  let current = RANKS[0];
  for (const rank of RANKS) {
    if (xp >= rank.minXP) {
      current = rank;
    }
  }
  return current;
}

export function getNextRank(xp: number): Rank | null {
  for (const rank of RANKS) {
    if (xp < rank.minXP) {
      return rank;
    }
  }
  return null;
}
