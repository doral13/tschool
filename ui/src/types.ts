// ── TSchool Type Definitions ──

export type Difficulty = 'easy' | 'medium' | 'hard' | 'boss';

export interface Challenge {
  id: string;
  level: number;
  number: number;
  title: string;
  description: string;
  mission: string;
  difficulty: Difficulty;
  xp: number;
  scaffold: string;
  solution: string;
  hints: string[];
  tests: TestCase[];
}

export interface TestCase {
  description: string;
  test: string;
  errorHint: string;
}

export interface LevelDefinition {
  number: number;
  title: string;
  description: string;
  challenges: Challenge[];
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
  flawless: string[];
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

export interface API {
  getProgress(): Promise<Progress>;
  saveProgress(p: Progress): Promise<void>;
  getLevels(): Promise<LevelDefinition[]>;
  getChallenge(level: number, num: number): Promise<Challenge>;
  validateSolution(challengeId: string, code: string): Promise<ValidationResult>;
  completeChallenge(
    challengeId: string,
    baseXP: number
  ): Promise<{ xpAwarded: number; isFlawless: boolean; newAchievements: string[] }>;
  resetStreak(): Promise<void>;
  recordAttempt(challengeId: string): Promise<void>;
  getWorkspaceFile(challengeId: string): Promise<string>;
  saveWorkspaceFile(challengeId: string, content: string): Promise<void>;
  ensureWorkspaceFile(challengeId: string): Promise<string>;
  resetWorkspaceFile(challengeId: string): Promise<string>;
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

declare global {
  interface Window {
    api: API;
  }
}
