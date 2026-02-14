// ============================================================
// TSchool - Display Module (CLI Rendering)
// ============================================================

import chalk from 'chalk';
import { Progress, Challenge, getRank, getNextRank, RANKS, ValidationResult } from './types';
import { LOGO, progressBar, xpBar, VICTORY, BOSS_INTRO, BOSS_VICTORY, LEVEL_UP, NEW_PLAYER, STREAK_FIRE } from '../data/ascii-art';
import { formatCompilationFeedback, formatTestFeedback, getVictoryMessage, getFlawlessMessage, getStreakMessage, getEncouragingMessage } from './feedback';
import { getOverallProgress, getLevelProgress, getAchievement } from './progress';

export function clearScreen(): void {
  process.stdout.write('\x1B[2J\x1B[0f');
}

export function showLogo(): void {
  console.log(chalk.cyan.bold(LOGO));
}

export function showWelcome(progress: Progress): void {
  showLogo();

  if (progress.completedChallenges.length === 0) {
    console.log(chalk.yellow(NEW_PLAYER));
  } else {
    const rank = getRank(progress.xp);
    const nextRank = getNextRank(progress.xp);
    const overall = getOverallProgress(progress);

    console.log('');
    console.log(chalk.white('  Welcome back, adventurer!'));
    console.log('');
    console.log(chalk.white(`  Rank: ${chalk.yellow.bold(rank.name)}  ${rank.icon}          XP: ${chalk.green.bold(String(progress.xp))}`));

    if (nextRank) {
      const prevRankXP = RANKS.filter(r => r.minXP <= progress.xp).pop()!.minXP;
      console.log(chalk.white(`  ${xpBar(progress.xp, nextRank.minXP, prevRankXP)}`));
      console.log(chalk.gray(`  Next rank: ${nextRank.name} at ${nextRank.minXP} XP`));
    } else {
      console.log(chalk.yellow.bold('  MAX RANK ACHIEVED!'));
    }

    console.log('');
    console.log(chalk.white(`  Course Progress: ${progressBar(overall.completed, overall.total)}`));
    console.log(chalk.white(`  Challenges: ${chalk.green(String(overall.completed))}/${overall.total}`));

    if (progress.streak > 0) {
      console.log(chalk.red.bold(`  Streak: ${progress.streak} 🔥`));
    }

    console.log('');
  }
}

export function showLevelSelect(progress: Progress): void {
  console.log('');
  console.log(chalk.cyan.bold('  === LEVEL SELECT ==='));
  console.log('');

  const levelNames = [
    'The Basics',
    'Functions',
    'Collections',
    'Interfaces & Type Aliases',
    'Unions & Narrowing',
    'Generics',
    'Enums & Literal Types',
    'Classes & OOP',
    'Advanced Types',
    'Real World TypeScript',
  ];

  for (let i = 0; i < levelNames.length; i++) {
    const levelNum = i + 1;
    const lp = getLevelProgress(progress, levelNum);
    const isUnlocked = levelNum === 1 || progress.completedChallenges.some(id => id.startsWith(`L${levelNum - 1}-`));
    const isComplete = lp.completed >= lp.total;

    let status: string;
    if (isComplete) {
      status = chalk.green('✓ COMPLETE');
    } else if (isUnlocked) {
      status = chalk.yellow(`${lp.completed}/${lp.total}`);
    } else {
      status = chalk.gray('🔒 LOCKED');
    }

    const nameColor = isUnlocked ? chalk.white : chalk.gray;
    const numStr = chalk.cyan(`[${levelNum}]`);

    console.log(`  ${numStr} ${nameColor(levelNames[i])}  ${status}`);
  }
  console.log('');
}

export function showChallenge(challenge: Challenge, progress: Progress): void {
  const diffColorFn = (d: string): string => {
    switch (d) {
      case 'easy': return chalk.green(d.toUpperCase());
      case 'medium': return chalk.yellow(d.toUpperCase());
      case 'hard': return chalk.red(d.toUpperCase());
      case 'boss': return chalk.magenta(d.toUpperCase());
      default: return d.toUpperCase();
    }
  };

  if (challenge.difficulty === 'boss') {
    console.log(chalk.red.bold(BOSS_INTRO));
  }

  console.log('');
  console.log(chalk.cyan.bold(`  === Level ${challenge.level}: Challenge ${challenge.number} ===`));
  console.log(chalk.white.bold(`  ${challenge.title}`));
  console.log(chalk.gray(`  Difficulty: ${diffColorFn(challenge.difficulty)}  |  XP: ${chalk.green(String(challenge.xp))}`));
  console.log('');
  console.log(chalk.gray('  ─'.repeat(30)));
  console.log('');

  // Render description with basic formatting
  const descLines = challenge.description.split('\n');
  for (const line of descLines) {
    if (line.startsWith('# ')) {
      console.log(chalk.cyan.bold(`  ${line.slice(2)}`));
    } else if (line.startsWith('## ')) {
      console.log(chalk.yellow.bold(`  ${line.slice(3)}`));
    } else if (line.startsWith('```')) {
      // skip code fence markers
    } else if (line.trim().startsWith('//')) {
      console.log(chalk.gray(`  ${line}`));
    } else {
      console.log(chalk.white(`  ${line}`));
    }
  }

  console.log('');
  console.log(chalk.gray('  ─'.repeat(30)));
  console.log(chalk.yellow.bold('  YOUR MISSION:'));
  console.log(chalk.white(`  ${challenge.mission}`));
  console.log('');
}

export function showValidationResult(
  result: ValidationResult,
  challenge: Challenge,
  attempt: number,
  xpAwarded?: number,
  isFlawless?: boolean,
  streak?: number,
  newAchievements?: string[]
): void {
  console.log('');

  if (result.success) {
    // Victory!
    if (challenge.difficulty === 'boss') {
      console.log(chalk.yellow.bold(BOSS_VICTORY));
    } else {
      console.log(chalk.green.bold(VICTORY));
    }

    console.log(chalk.green.bold(`  ${getVictoryMessage()}`));
    console.log('');

    if (xpAwarded && xpAwarded > 0) {
      console.log(chalk.yellow.bold(`  + ${xpAwarded} XP`));
    }

    if (isFlawless) {
      console.log(chalk.magenta.bold(`  ${getFlawlessMessage()}`));
    }

    if (streak && streak >= 3) {
      console.log(chalk.red.bold(`  ${getStreakMessage(streak)}`));
    }

    // Show new achievements
    if (newAchievements && newAchievements.length > 0) {
      console.log('');
      console.log(chalk.yellow.bold('  === ACHIEVEMENT UNLOCKED! ==='));
      for (const achId of newAchievements) {
        const ach = getAchievement(achId);
        if (ach) {
          console.log(chalk.yellow(`  ${ach.icon} ${ach.title}: ${ach.description}`));
        }
      }
    }

    console.log('');
  } else {
    // Failure feedback
    console.log(chalk.red.bold('  ✗ Not quite right!'));
    console.log('');

    if (result.compilationErrors.length > 0) {
      console.log(chalk.red(formatCompilationFeedback(result.compilationErrors)));
    }

    if (result.testResults.length > 0) {
      console.log(chalk.white(formatTestFeedback(result.testResults)));
    }

    console.log('');
    console.log(chalk.yellow(`  ${getEncouragingMessage(attempt)}`));
    console.log('');

    if (attempt >= 2) {
      console.log(chalk.gray('  Tip: Use [h] to get a hint!'));
    }
    if (attempt >= 3) {
      console.log(chalk.gray('  Tip: Use [r] to reveal the solution (no XP awarded)'));
    }
  }
}

export function showHint(hint: string, hintNumber: number, totalHints: number): void {
  console.log('');
  console.log(chalk.yellow.bold(`  HINT ${hintNumber}/${totalHints}:`));
  console.log(chalk.yellow(`  ${hint}`));
  console.log('');
}

export function showSolution(solution: string): void {
  console.log('');
  console.log(chalk.magenta.bold('  === SOLUTION REVEALED ==='));
  console.log(chalk.gray('  (No XP will be awarded for this challenge)'));
  console.log('');

  const lines = solution.split('\n');
  for (const line of lines) {
    console.log(chalk.white(`  ${line}`));
  }

  console.log('');
}

export function showAchievements(progress: Progress): void {
  const { ACHIEVEMENTS } = require('../data/achievements');

  console.log('');
  console.log(chalk.yellow.bold('  === ACHIEVEMENTS ==='));
  console.log('');

  for (const ach of ACHIEVEMENTS) {
    const unlocked = progress.achievements.includes(ach.id);
    if (unlocked) {
      console.log(chalk.green(`  ${ach.icon} ${ach.title} - ${ach.description}`));
    } else {
      console.log(chalk.gray(`  🔒 ${ach.title} - ${ach.description}`));
    }
  }

  console.log('');
  console.log(chalk.white(`  ${progress.achievements.length}/${ACHIEVEMENTS.length} unlocked`));
  console.log('');
}

export function showStats(progress: Progress): void {
  const overall = getOverallProgress(progress);
  const rank = getRank(progress.xp);

  console.log('');
  console.log(chalk.cyan.bold('  === YOUR STATS ==='));
  console.log('');
  console.log(chalk.white(`  Rank:              ${rank.icon} ${chalk.yellow.bold(rank.name)}`));
  console.log(chalk.white(`  Total XP:          ${chalk.green.bold(String(progress.xp))}`));
  console.log(chalk.white(`  Challenges Done:   ${chalk.green(String(overall.completed))}/${overall.total}`));
  console.log(chalk.white(`  Course Progress:   ${progressBar(overall.completed, overall.total)}`));
  console.log(chalk.white(`  Current Streak:    ${progress.streak} 🔥`));
  console.log(chalk.white(`  Best Streak:       ${progress.bestStreak}`));
  console.log(chalk.white(`  Flawless Solves:   ${progress.flawless.length}`));
  console.log(chalk.white(`  Achievements:      ${progress.achievements.length}`));
  console.log(chalk.white(`  Started:           ${new Date(progress.startedAt).toLocaleDateString()}`));
  console.log('');
}

export function showLevelUp(newRank: string): void {
  console.log(chalk.yellow.bold(LEVEL_UP));
  console.log(chalk.yellow.bold(`  You've reached a new rank: ${newRank}!`));
  console.log('');
}
