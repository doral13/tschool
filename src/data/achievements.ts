// ============================================================
// TSchool - Achievement Definitions
// ============================================================

import { Achievement, Progress } from '../engine/types';

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: 'first-blood',
    title: 'First Blood',
    description: 'Complete your very first challenge',
    icon: '🩸',
    check: (p: Progress) => p.completedChallenges.length >= 1,
  },
  {
    id: 'flawless',
    title: 'Flawless Victory',
    description: 'Solve a challenge on the first try',
    icon: '💎',
    check: (p: Progress) => p.flawless.length >= 1,
  },
  {
    id: 'on-fire',
    title: 'On Fire!',
    description: 'Complete 5 challenges in a row without errors',
    icon: '🔥',
    check: (p: Progress) => p.bestStreak >= 5,
  },
  {
    id: 'unstoppable',
    title: 'Unstoppable',
    description: 'Complete 10 challenges in a row without errors',
    icon: '⚡',
    check: (p: Progress) => p.bestStreak >= 10,
  },
  {
    id: 'boss-slayer',
    title: 'Boss Slayer',
    description: 'Defeat your first boss battle',
    icon: '🐉',
    check: (p: Progress) => p.completedChallenges.some(id => id.endsWith('-C6')),
  },
  {
    id: 'level-complete-1',
    title: 'Basics Mastered',
    description: 'Complete all challenges in Level 1',
    icon: '⭐',
    check: (p: Progress) => {
      const l1 = p.completedChallenges.filter(id => id.startsWith('L1-'));
      return l1.length >= 6;
    },
  },
  {
    id: 'level-complete-2',
    title: 'Function Guru',
    description: 'Complete all challenges in Level 2',
    icon: '⭐',
    check: (p: Progress) => {
      const l2 = p.completedChallenges.filter(id => id.startsWith('L2-'));
      return l2.length >= 6;
    },
  },
  {
    id: 'level-complete-3',
    title: 'Collection Conqueror',
    description: 'Complete all challenges in Level 3',
    icon: '⭐',
    check: (p: Progress) => {
      const l3 = p.completedChallenges.filter(id => id.startsWith('L3-'));
      return l3.length >= 6;
    },
  },
  {
    id: 'halfway',
    title: 'Halfway There!',
    description: 'Complete 50% of all challenges',
    icon: '🏔️',
    check: (p: Progress) => p.completedChallenges.length >= 33,
  },
  {
    id: 'type-apprentice',
    title: 'Type Apprentice',
    description: 'Reach the Type Apprentice rank',
    icon: '📝',
    check: (p: Progress) => p.xp >= 100,
  },
  {
    id: 'generic-wizard',
    title: 'Generic Wizard',
    description: 'Reach the Generic Wizard rank',
    icon: '🧙',
    check: (p: Progress) => p.xp >= 1000,
  },
  {
    id: 'typescript-guru',
    title: 'TypeScript Guru',
    description: 'Complete the entire course and reach the highest rank',
    icon: '👑',
    check: (p: Progress) => p.xp >= 4000 && p.completedChallenges.length >= 66,
  },
  {
    id: 'persistent',
    title: 'Persistence Pays Off',
    description: 'Solve a challenge after 3+ failed attempts',
    icon: '🔨',
    check: (p: Progress) => {
      return Object.entries(p.attempts).some(
        ([id, count]) => count >= 3 && p.completedChallenges.includes(id)
      );
    },
  },
  {
    id: 'ten-down',
    title: 'Getting Serious',
    description: 'Complete 10 challenges',
    icon: '🎯',
    check: (p: Progress) => p.completedChallenges.length >= 10,
  },
];
