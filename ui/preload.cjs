// ============================================================
// TSchool - Electron Preload Script
// ============================================================
// Exposes a safe IPC bridge to the renderer process via contextBridge.

const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
  // --- Progress ---
  getProgress: () => ipcRenderer.invoke('get-progress'),
  saveProgress: (progress) => ipcRenderer.invoke('save-progress', progress),

  // --- Levels & Challenges ---
  getLevels: () => ipcRenderer.invoke('get-levels'),
  getChallenge: (levelNumber, challengeNumber) =>
    ipcRenderer.invoke('get-challenge', levelNumber, challengeNumber),

  // --- Validation ---
  validateSolution: (challengeId, code) =>
    ipcRenderer.invoke('validate-solution', challengeId, code),

  // --- Progress mutations ---
  completeChallenge: (challengeId, baseXP) =>
    ipcRenderer.invoke('complete-challenge', challengeId, baseXP),
  resetStreak: () => ipcRenderer.invoke('reset-streak'),
  recordAttempt: (challengeId) =>
    ipcRenderer.invoke('record-attempt', challengeId),

  // --- Workspace file management ---
  getWorkspaceFile: (challengeId) =>
    ipcRenderer.invoke('get-workspace-file', challengeId),
  saveWorkspaceFile: (challengeId, content) =>
    ipcRenderer.invoke('save-workspace-file', challengeId, content),
  ensureWorkspaceFile: (challengeId) =>
    ipcRenderer.invoke('ensure-workspace-file', challengeId),
  resetWorkspaceFile: (challengeId) =>
    ipcRenderer.invoke('reset-workspace-file', challengeId),
});
