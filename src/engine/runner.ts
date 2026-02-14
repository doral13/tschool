// ============================================================
// TSchool - Game Runner (Core Game Loop)
// ============================================================

import inquirer from 'inquirer';
import chalk from 'chalk';
import { Challenge, getRank, getNextRank } from './types';
import {
  loadProgress, saveProgress, completeChallenge,
  resetStreak, recordAttempt, getAttemptCount,
  isChallengeCompleted, getOverallProgress
} from './progress';
import { validateSolution, ensureWorkspaceFile, resetWorkspaceFile, getWorkspaceFilePath } from './validator';
import {
  clearScreen, showLogo, showWelcome, showLevelSelect,
  showChallenge, showValidationResult, showHint,
  showSolution, showAchievements, showStats, showLevelUp
} from './display';
import { getLevel, getChallenge, getNextChallenge, ALL_LEVELS } from '../challenges';
import { GRADUATION } from '../data/ascii-art';

export async function startGame(): Promise<void> {
  let running = true;

  while (running) {
    clearScreen();
    const progress = loadProgress();
    showWelcome(progress);

    const completed = progress.completedChallenges.length;
    const hasStarted = completed > 0;

    const choices: { name: string; value: string }[] = [];

    if (hasStarted) {
      const currentChallenge = getChallenge(progress.currentLevel, progress.currentChallenge);
      if (currentChallenge) {
        const status = isChallengeCompleted(progress, currentChallenge.id) ? '(completed)' : '';
        choices.push({
          name: `Continue → Level ${progress.currentLevel}, Challenge ${progress.currentChallenge}: ${currentChallenge.title} ${status}`,
          value: 'continue',
        });
      }
    }

    choices.push(
      { name: 'Start / Level Select', value: 'levels' },
      { name: 'Achievements', value: 'achievements' },
      { name: 'Stats', value: 'stats' },
      { name: 'Help', value: 'help' },
      { name: 'Quit', value: 'quit' },
    );

    const { action } = await inquirer.prompt([{
      type: 'list',
      name: 'action',
      message: 'What would you like to do?',
      choices,
    }]);

    switch (action) {
      case 'continue':
        await runChallenge(progress.currentLevel, progress.currentChallenge);
        break;
      case 'levels':
        await levelSelectMenu();
        break;
      case 'achievements':
        clearScreen();
        showAchievements(loadProgress());
        await pause();
        break;
      case 'stats':
        clearScreen();
        showStats(loadProgress());
        await pause();
        break;
      case 'help':
        clearScreen();
        showHelp();
        await pause();
        break;
      case 'quit':
        running = false;
        console.log(chalk.cyan('\n  See you next time, adventurer! Keep coding! 🚀\n'));
        break;
    }
  }
}

async function levelSelectMenu(): Promise<void> {
  clearScreen();
  const progress = loadProgress();
  showLevelSelect(progress);

  const choices: { name: string; value: number | string }[] = [];

  for (let i = 0; i < ALL_LEVELS.length; i++) {
    const levelNum = i + 1;
    const level = ALL_LEVELS[i];
    const isUnlocked = levelNum === 1 || progress.completedChallenges.some(id => id.startsWith(`L${levelNum - 1}-`));

    if (isUnlocked) {
      choices.push({
        name: `Level ${levelNum}: ${level.title}`,
        value: levelNum,
      });
    } else {
      choices.push({
        name: chalk.gray(`Level ${levelNum}: ${level.title} (LOCKED)`),
        value: -1,
      });
    }
  }

  choices.push({ name: 'Back', value: 'back' });

  const { level } = await inquirer.prompt([{
    type: 'list',
    name: 'level',
    message: 'Select a level:',
    choices,
  }]);

  if (level === 'back' || level === -1) return;

  await challengeSelectMenu(level as number);
}

async function challengeSelectMenu(levelNum: number): Promise<void> {
  const progress = loadProgress();
  const level = getLevel(levelNum);
  if (!level) return;

  clearScreen();
  console.log(chalk.cyan.bold(`\n  === Level ${levelNum}: ${level.title} ===`));
  console.log(chalk.gray(`  ${level.description}`));
  console.log('');

  const choices: { name: string; value: number | string }[] = [];

  for (const challenge of level.challenges) {
    const done = isChallengeCompleted(progress, challenge.id);
    const icon = done ? chalk.green('✓') : chalk.gray('○');
    const diffColor = challenge.difficulty === 'boss' ? chalk.magenta : chalk.white;

    choices.push({
      name: `${icon} ${diffColor(`${challenge.number}. ${challenge.title}`)} (${challenge.xp} XP)`,
      value: challenge.number,
    });
  }

  choices.push({ name: 'Back', value: 'back' });

  const { challengeNum } = await inquirer.prompt([{
    type: 'list',
    name: 'challengeNum',
    message: 'Select a challenge:',
    choices,
  }]);

  if (challengeNum === 'back') return;

  await runChallenge(levelNum, challengeNum as number);
}

async function runChallenge(levelNum: number, challengeNum: number): Promise<void> {
  const challenge = getChallenge(levelNum, challengeNum);
  if (!challenge) {
    console.log(chalk.red('  Challenge not found!'));
    await pause();
    return;
  }

  let progress = loadProgress();

  // Update current position
  progress.currentLevel = levelNum;
  progress.currentChallenge = challengeNum;
  saveProgress(progress);

  // Ensure workspace file exists
  const filePath = ensureWorkspaceFile(challenge);

  let challengeRunning = true;
  let hintsUsed = 0;
  let revealed = false;

  while (challengeRunning) {
    clearScreen();
    progress = loadProgress();
    showChallenge(challenge, progress);

    const attempts = getAttemptCount(progress, challenge.id);
    const alreadyComplete = isChallengeCompleted(progress, challenge.id);

    console.log(chalk.gray(`  File: ${filePath}`));
    if (alreadyComplete) {
      console.log(chalk.green.bold('  ✓ Already completed!'));
    }
    console.log('');

    const choices: { name: string; value: string }[] = [
      { name: 'Check my solution', value: 'check' },
      { name: `Hint (${Math.max(0, challenge.hints.length - hintsUsed)} remaining)`, value: 'hint' },
      { name: 'Reset file to scaffold', value: 'reset' },
    ];

    if (attempts >= 3 || revealed) {
      choices.push({ name: 'Reveal solution (no XP)', value: 'reveal' });
    }

    choices.push(
      { name: 'Skip (no XP)', value: 'skip' },
      { name: 'Back to menu', value: 'back' },
    );

    const { action } = await inquirer.prompt([{
      type: 'list',
      name: 'action',
      message: 'What would you like to do?',
      choices,
    }]);

    switch (action) {
      case 'check': {
        if (alreadyComplete) {
          console.log(chalk.green('\n  You already completed this challenge!\n'));
          await pause();
          break;
        }

        // Record attempt
        recordAttempt(progress, challenge.id);
        saveProgress(progress);

        // Validate
        const result = validateSolution(challenge);

        if (result.success && !revealed) {
          // Complete the challenge!
          const oldRank = getRank(progress.xp).name;
          const completion = completeChallenge(progress, challenge.id, challenge.xp);
          const newRank = getRank(progress.xp).name;

          showValidationResult(
            result,
            challenge,
            getAttemptCount(progress, challenge.id),
            completion.xpAwarded,
            completion.isFlawless,
            progress.streak,
            completion.newAchievements
          );

          // Check for rank up
          if (newRank !== oldRank) {
            showLevelUp(newRank);
          }

          // Check for course completion
          const overall = getOverallProgress(progress);
          if (overall.completed >= overall.total) {
            console.log(chalk.yellow.bold(GRADUATION));
          }

          await pause();

          // Offer to continue to next challenge
          const next = getNextChallenge(levelNum, challengeNum);
          if (next) {
            const { goNext } = await inquirer.prompt([{
              type: 'confirm',
              name: 'goNext',
              message: 'Continue to next challenge?',
              default: true,
            }]);

            if (goNext) {
              progress.currentLevel = next.level;
              progress.currentChallenge = next.challenge;
              saveProgress(progress);
              await runChallenge(next.level, next.challenge);
            }
          }

          challengeRunning = false;
        } else if (result.success && revealed) {
          console.log(chalk.yellow('\n  Solution is correct, but no XP since it was revealed.\n'));
          // Still mark as completed but with 0 XP
          progress.completedChallenges.push(challenge.id);
          saveProgress(progress);
          await pause();
          challengeRunning = false;
        } else {
          // Failed
          resetStreak(progress);
          showValidationResult(result, challenge, getAttemptCount(progress, challenge.id));
          await pause();
        }
        break;
      }

      case 'hint': {
        if (hintsUsed < challenge.hints.length) {
          showHint(challenge.hints[hintsUsed], hintsUsed + 1, challenge.hints.length);
          hintsUsed++;
        } else {
          console.log(chalk.gray('\n  No more hints available!\n'));
        }
        await pause();
        break;
      }

      case 'reset': {
        const { confirmReset } = await inquirer.prompt([{
          type: 'confirm',
          name: 'confirmReset',
          message: 'Reset your solution file? This will erase your work!',
          default: false,
        }]);

        if (confirmReset) {
          resetWorkspaceFile(challenge);
          console.log(chalk.yellow('\n  File reset to original scaffold.\n'));
          await pause();
        }
        break;
      }

      case 'reveal': {
        showSolution(challenge.solution);
        revealed = true;
        await pause();
        break;
      }

      case 'skip': {
        const next = getNextChallenge(levelNum, challengeNum);
        if (next) {
          progress.currentLevel = next.level;
          progress.currentChallenge = next.challenge;
          saveProgress(progress);
        }
        challengeRunning = false;
        break;
      }

      case 'back':
        challengeRunning = false;
        break;
    }
  }
}

function showHelp(): void {
  console.log(chalk.cyan.bold('\n  === HELP ===\n'));
  console.log(chalk.white('  How TSchool works:\n'));
  console.log(chalk.white('  1. Select a challenge from the menu'));
  console.log(chalk.white('  2. Read the lesson to learn the concept'));
  console.log(chalk.white('  3. Open the workspace file in your editor'));
  console.log(chalk.white('  4. Complete the TODOs in the file'));
  console.log(chalk.white('  5. Come back and check your solution'));
  console.log(chalk.white('  6. Get feedback and earn XP!\n'));
  console.log(chalk.yellow('  Tips:'));
  console.log(chalk.white('  - Solve on the first try for +50% bonus XP'));
  console.log(chalk.white('  - Build a streak (3+) for +25% bonus XP'));
  console.log(chalk.white('  - Use hints if you\'re stuck'));
  console.log(chalk.white('  - After 3 failed attempts, you can reveal the answer'));
  console.log(chalk.white('  - Workspace files are in the workspace/ directory\n'));
  console.log(chalk.gray('  Your progress is saved in progress.json'));
  console.log('');
}

async function pause(): Promise<void> {
  await inquirer.prompt([{
    type: 'input',
    name: 'continue',
    message: 'Press Enter to continue...',
  }]);
}
