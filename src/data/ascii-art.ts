// ============================================================
// TSchool - ASCII Art & Visual Assets
// ============================================================

export const LOGO = `
 _____ ____       _                 _
|_   _/ ___|  ___| |__   ___   ___ | |
  | | \\___ \\ / __| '_ \\ / _ \\ / _ \\| |
  | |  ___) | (__| | | | (_) | (_) | |
  |_| |____/ \\___|_| |_|\\___/ \\___/|_|
`;

export const VICTORY = `
    *    *    *
   ***  ***  ***
  ***** *** *****
    |    |    |
    CHALLENGE COMPLETE!
`;

export const BOSS_INTRO = `
  ___________________
 /                   \\
|   BOSS  BATTLE !!   |
|                     |
|   Are you ready?    |
 \\___________________/
        \\   ^__^
         \\  (oo)\\_______
            (__)\\       )\\/\\
                ||----w |
                ||     ||
`;

export const BOSS_VICTORY = `
  ______________________________
 /                              \\
|     BOSS DEFEATED!             |
|                                |
|   You've proven your mastery!  |
 \\______________________________/

   \\o/   VICTORY!   \\o/
    |                 |
   / \\               / \\
`;

export const LEVEL_UP = `
  _                    _   _   _       _
 | |    _____   _____| | | | | |_ __ | |
 | |   / _ \\ \\ / / _ \\ | | | | | '_ \\| |
 | |__|  __/\\ V /  __/ | | |_| | |_) |_|
 |_____\\___| \\_/ \\___|_|  \\___/| .__/(_)
                                |_|
`;

export const GAME_OVER = `
   ____                         ___
  / ___| __ _ _ __ ___   ___   / _ \\__   _____ _ __
 | |  _ / _\` | '_ \` _ \\ / _ \\ | | | \\ \\ / / _ \\ '__|
 | |_| | (_| | | | | | |  __/ | |_| |\\ V /  __/ |
  \\____|\\__,_|_| |_| |_|\\___|  \\___/  \\_/ \\___|_|

     ...just kidding! Try again, you got this!
`;

export const STREAK_FIRE = `
   _    On
  ( )   Fire!
  ( )   Streak: `;

export const GRADUATION = `
      .---.
     /     \\
    | () () |
     \\  ^  /
      |||||
      |||||
   ___________
  |           |
  | GRADUATED |
  |___________|

  You are now a TypeScript Guru!
  The type system bends to your will.
`;

export const WELCOME_BACK = `
  Welcome back, adventurer!
  Your journey continues...
`;

export const NEW_PLAYER = `
  Welcome to TSchool!

  You're about to embark on a journey to master TypeScript.
  Through 11 levels of increasingly challenging puzzles,
  you'll go from complete beginner to TypeScript Guru.

  How it works:
  - Read the lesson for each challenge
  - Edit the file in your workspace/ folder
  - Check your solution and get instant feedback
  - Earn XP, unlock achievements, and level up!

  Let's begin!
`;

export function progressBar(current: number, total: number, width: number = 30): string {
  const filled = Math.round((current / total) * width);
  const empty = width - filled;
  const bar = '█'.repeat(filled) + '░'.repeat(empty);
  const pct = Math.round((current / total) * 100);
  return `[${bar}] ${pct}%`;
}

export function xpBar(currentXP: number, nextRankXP: number, prevRankXP: number, width: number = 30): string {
  const progress = currentXP - prevRankXP;
  const needed = nextRankXP - prevRankXP;
  const filled = Math.round((progress / needed) * width);
  const empty = width - filled;
  const bar = '▓'.repeat(Math.min(filled, width)) + '░'.repeat(Math.max(empty, 0));
  return `[${bar}] ${currentXP}/${nextRankXP} XP`;
}
