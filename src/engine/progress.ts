// ============================================================
// TSchool - Progress Tracker
// ============================================================

import * as fs from 'fs';
import * as path from 'path';
import { Progress, getRank, Achievement } from './types';

const PROGRESS_FILE = path.join(process.cwd(), 'progress.json');

export function createDefaultProgress(): Progress {
  return {
    currentLevel: 1,
    currentChallenge: 1,
    xp: 0,
    rank: 'Novice Coder',
    streak: 0,
    bestStreak: 0,
    completedChallenges: [],
    achievements: [],
    attempts: {},
    flawless: [],
    startedAt: new Date().toISOString(),
    lastPlayedAt: new Date().toISOString(),
    totalTimeMinutes: 0,
  };
}

export function loadProgress(): Progress {
  try {
    if (fs.existsSync(PROGRESS_FILE)) {
      const data = fs.readFileSync(PROGRESS_FILE, 'utf-8');
      return JSON.parse(data) as Progress;
    }
  } catch {
    // If corrupted, start fresh
  }
  return createDefaultProgress();
}

export function saveProgress(progress: Progress): void {
  progress.lastPlayedAt = new Date().toISOString();
  progress.rank = getRank(progress.xp).name;
  fs.writeFileSync(PROGRESS_FILE, JSON.stringify(progress, null, 2));
}

export function recordAttempt(progress: Progress, challengeId: string): void {
  if (!progress.attempts[challengeId]) {
    progress.attempts[challengeId] = 0;
  }
  progress.attempts[challengeId]++;
}

export function completeChallenge(
  progress: Progress,
  challengeId: string,
  baseXP: number
): { xpAwarded: number; isFlawless: boolean; newAchievements: string[] } {
  if (progress.completedChallenges.includes(challengeId)) {
    return { xpAwarded: 0, isFlawless: false, newAchievements: [] };
  }

  const attempts = progress.attempts[challengeId] || 1;
  const isFlawless = attempts <= 1;

  // Calculate XP with bonuses
  let xpAwarded = baseXP;

  // Flawless bonus: +50%
  if (isFlawless) {
    xpAwarded = Math.floor(xpAwarded * 1.5);
    progress.flawless.push(challengeId);
  }

  // Streak bonus: +25% if streak >= 3
  progress.streak++;
  if (progress.streak >= 3) {
    xpAwarded = Math.floor(xpAwarded * 1.25);
  }

  if (progress.streak > progress.bestStreak) {
    progress.bestStreak = progress.streak;
  }

  progress.xp += xpAwarded;
  progress.completedChallenges.push(challengeId);
  progress.rank = getRank(progress.xp).name;

  // Check achievements
  const newAchievements = checkNewAchievements(progress);

  saveProgress(progress);

  return { xpAwarded, isFlawless, newAchievements };
}

export function resetStreak(progress: Progress): void {
  progress.streak = 0;
  saveProgress(progress);
}

export function getAttemptCount(progress: Progress, challengeId: string): number {
  return progress.attempts[challengeId] || 0;
}

export function isChallengeCompleted(progress: Progress, challengeId: string): boolean {
  return progress.completedChallenges.includes(challengeId);
}

export function getLevelProgress(progress: Progress, level: number): { completed: number; total: number } {
  const levelChallenges = progress.completedChallenges.filter(id => id.startsWith(`L${level}-`));
  // We know each level has 6 challenges (5 + boss)
  return { completed: levelChallenges.length, total: 6 };
}

export function getOverallProgress(progress: Progress): { completed: number; total: number; percentage: number } {
  const total = 60; // 10 levels * 6 challenges
  const completed = progress.completedChallenges.length;
  return { completed, total, percentage: Math.round((completed / total) * 100) };
}

// Achievement checking
import { ACHIEVEMENTS } from '../data/achievements';

function checkNewAchievements(progress: Progress): string[] {
  const newlyUnlocked: string[] = [];

  for (const achievement of ACHIEVEMENTS) {
    if (!progress.achievements.includes(achievement.id) && achievement.check(progress)) {
      progress.achievements.push(achievement.id);
      newlyUnlocked.push(achievement.id);
    }
  }

  return newlyUnlocked;
}

export function getAchievement(id: string): Achievement | undefined {
  return ACHIEVEMENTS.find(a => a.id === id);
}
