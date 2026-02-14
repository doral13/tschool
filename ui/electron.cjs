// ============================================================
// TSchool - Electron Main Process
// ============================================================

// Register tsx so we can require TypeScript engine modules directly
try {
  require('tsx');
} catch {
  try {
    require('tsx/cjs/api').register();
  } catch (err) {
    console.error('Failed to register tsx loader:', err.message);
    console.error('Make sure tsx is installed: npm install tsx');
    process.exit(1);
  }
}

const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');

// Determine if we're in dev mode
const isDev = !app.isPackaged;

// Engine imports (tsx handles the TS transpilation)
const {
  loadProgress,
  saveProgress,
  completeChallenge,
  resetStreak,
  recordAttempt,
} = require('../src/engine/progress');

const {
  validateSolution,
  ensureWorkspaceFile,
  resetWorkspaceFile,
  getWorkspaceFilePath,
} = require('../src/engine/validator');

const {
  ALL_LEVELS,
  getChallenge,
  getChallengeById,
} = require('../src/challenges/index');

let mainWindow = null;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    frame: false,
    backgroundColor: '#1e1e2e',
    titleBarStyle: 'hidden',
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.cjs'),
    },
  });

  if (isDev) {
    mainWindow.loadURL('http://localhost:5173');
    // Open DevTools in dev mode for convenience
    mainWindow.webContents.openDevTools({ mode: 'detach' });
  } else {
    mainWindow.loadFile(path.join(__dirname, '..', 'dist-ui', 'index.html'));
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

// ============================================================
// IPC Handlers
// ============================================================

function setupIPC() {
  // --- Progress ---

  ipcMain.handle('get-progress', () => {
    return loadProgress();
  });

  ipcMain.handle('save-progress', (_event, progress) => {
    saveProgress(progress);
    return { success: true };
  });

  // --- Levels & Challenges ---

  ipcMain.handle('get-levels', () => {
    // Serialize level definitions (strip test functions for safety,
    // keep structure intact for the renderer)
    return ALL_LEVELS.map((level) => ({
      number: level.number,
      title: level.title,
      description: level.description,
      challenges: level.challenges.map((c) => ({
        id: c.id,
        level: c.level,
        number: c.number,
        title: c.title,
        description: c.description,
        mission: c.mission,
        difficulty: c.difficulty,
        xp: c.xp,
        hints: c.hints,
        scaffold: c.scaffold,
      })),
    }));
  });

  ipcMain.handle('get-challenge', (_event, levelNumber, challengeNumber) => {
    const challenge = getChallenge(levelNumber, challengeNumber);
    if (!challenge) return null;
    return {
      id: challenge.id,
      level: challenge.level,
      number: challenge.number,
      title: challenge.title,
      description: challenge.description,
      mission: challenge.mission,
      difficulty: challenge.difficulty,
      xp: challenge.xp,
      hints: challenge.hints,
      scaffold: challenge.scaffold,
      solution: challenge.solution,
    };
  });

  // --- Validation ---

  ipcMain.handle('validate-solution', (_event, challengeId, code) => {
    const challenge = getChallengeById(challengeId);
    if (!challenge) {
      return {
        success: false,
        compilationErrors: [{
          line: 0,
          column: 0,
          message: `Challenge "${challengeId}" not found.`,
          friendlyMessage: `Challenge "${challengeId}" not found.`,
          code: 0,
        }],
        testResults: [],
      };
    }

    // If code is provided, write it to the workspace file first so the
    // validator picks it up (validateSolution reads from disk)
    if (code !== undefined && code !== null) {
      const filePath = getWorkspaceFilePath(challenge);
      const dir = path.dirname(filePath);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      fs.writeFileSync(filePath, code, 'utf-8');
    }

    return validateSolution(challenge);
  });

  // --- Progress mutations ---

  ipcMain.handle('complete-challenge', (_event, challengeId, baseXP) => {
    const progress = loadProgress();
    const result = completeChallenge(progress, challengeId, baseXP);
    return result;
  });

  ipcMain.handle('reset-streak', () => {
    const progress = loadProgress();
    resetStreak(progress);
    return { success: true };
  });

  ipcMain.handle('record-attempt', (_event, challengeId) => {
    const progress = loadProgress();
    recordAttempt(progress, challengeId);
    saveProgress(progress);
    return { attempts: progress.attempts[challengeId] || 0 };
  });

  // --- Workspace file management ---

  ipcMain.handle('get-workspace-file', (_event, challengeId) => {
    const challenge = getChallengeById(challengeId);
    if (!challenge) return null;

    const filePath = getWorkspaceFilePath(challenge);
    if (!fs.existsSync(filePath)) {
      return null;
    }
    return fs.readFileSync(filePath, 'utf-8');
  });

  ipcMain.handle('save-workspace-file', (_event, challengeId, content) => {
    const challenge = getChallengeById(challengeId);
    if (!challenge) return { success: false, error: 'Challenge not found' };

    const filePath = getWorkspaceFilePath(challenge);
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(filePath, content, 'utf-8');
    return { success: true };
  });

  ipcMain.handle('ensure-workspace-file', (_event, challengeId) => {
    const challenge = getChallengeById(challengeId);
    if (!challenge) return { success: false, error: 'Challenge not found' };

    const filePath = ensureWorkspaceFile(challenge);
    const content = fs.readFileSync(filePath, 'utf-8');
    return { success: true, filePath, content };
  });

  ipcMain.handle('reset-workspace-file', (_event, challengeId) => {
    const challenge = getChallengeById(challengeId);
    if (!challenge) return { success: false, error: 'Challenge not found' };

    const filePath = resetWorkspaceFile(challenge);
    const content = fs.readFileSync(filePath, 'utf-8');
    return { success: true, filePath, content };
  });
}

// ============================================================
// App lifecycle
// ============================================================

app.whenReady().then(() => {
  setupIPC();
  createWindow();

  app.on('activate', () => {
    // macOS: re-create window when dock icon is clicked
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  // On macOS, apps typically stay active until Cmd+Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
