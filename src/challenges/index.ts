// ============================================================
// TSchool - Challenge Registry & Loader
// ============================================================

import { LevelDefinition, Challenge } from '../engine/types';

// Import all level definitions
import { level01 } from './level-01-basics';
import { level02 } from './level-02-functions';
import { level03 } from './level-03-collections';
import { level04 } from './level-04-interfaces';
import { level05 } from './level-05-unions';
import { level06 } from './level-06-generics';
import { level07 } from './level-07-enums';
import { level08 } from './level-08-classes';
import { level09 } from './level-09-advanced';
import { level10 } from './level-10-realworld';

export const ALL_LEVELS: LevelDefinition[] = [
  level01,
  level02,
  level03,
  level04,
  level05,
  level06,
  level07,
  level08,
  level09,
  level10,
];

export function getLevel(levelNumber: number): LevelDefinition | undefined {
  return ALL_LEVELS.find(l => l.number === levelNumber);
}

export function getChallenge(levelNumber: number, challengeNumber: number): Challenge | undefined {
  const level = getLevel(levelNumber);
  if (!level) return undefined;
  return level.challenges.find(c => c.number === challengeNumber);
}

export function getChallengeById(id: string): Challenge | undefined {
  for (const level of ALL_LEVELS) {
    const found = level.challenges.find(c => c.id === id);
    if (found) return found;
  }
  return undefined;
}

export function getNextChallenge(currentLevel: number, currentChallenge: number): { level: number; challenge: number } | null {
  const level = getLevel(currentLevel);
  if (!level) return null;

  // Try next challenge in same level
  const nextInLevel = level.challenges.find(c => c.number === currentChallenge + 1);
  if (nextInLevel) {
    return { level: currentLevel, challenge: currentChallenge + 1 };
  }

  // Try first challenge of next level
  const nextLevel = getLevel(currentLevel + 1);
  if (nextLevel && nextLevel.challenges.length > 0) {
    return { level: currentLevel + 1, challenge: 1 };
  }

  // Course complete!
  return null;
}

export function getTotalChallenges(): number {
  return ALL_LEVELS.reduce((sum, l) => sum + l.challenges.length, 0);
}
