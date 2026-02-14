import React, { useState, useEffect, useCallback, useRef } from 'react';
import Editor from '@monaco-editor/react';
import type {
  Progress,
  LevelDefinition,
  Challenge,
  ValidationResult,
} from './types';
import Sidebar from './components/Sidebar';
import LessonPanel from './components/LessonPanel';
import ResultsPanel from './components/ResultsPanel';

interface Notification {
  type: 'success' | 'achievement' | 'info';
  title: string;
  body: string;
}

interface CompletionResult {
  xpAwarded: number;
  isFlawless: boolean;
  newAchievements: string[];
}

const App: React.FC = () => {
  // ── Core State ──
  const [progress, setProgress] = useState<Progress | null>(null);
  const [levels, setLevels] = useState<LevelDefinition[]>([]);
  const [currentChallenge, setCurrentChallenge] = useState<Challenge | null>(null);
  const [code, setCode] = useState<string>('');
  const [validationResult, setValidationResult] = useState<ValidationResult | null>(null);
  const [hintsUsed, setHintsUsed] = useState(0);
  const [notification, setNotification] = useState<Notification | null>(null);
  const [loading, setLoading] = useState(true);
  const [checking, setChecking] = useState(false);
  const [completionResult, setCompletionResult] = useState<CompletionResult | null>(null);

  const notificationTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ── Show Notification (auto-dismiss) ──
  const showNotification = useCallback((n: Notification, duration = 4000) => {
    setNotification(n);
    if (notificationTimer.current) clearTimeout(notificationTimer.current);
    notificationTimer.current = setTimeout(() => setNotification(null), duration);
  }, []);

  // ── Load Initial Data ──
  useEffect(() => {
    async function init() {
      try {
        const [prog, lvls] = await Promise.all([
          window.api.getProgress(),
          window.api.getLevels(),
        ]);
        setProgress(prog);
        setLevels(lvls);

        // Load current challenge
        const challenge = await window.api.getChallenge(
          prog.currentLevel,
          prog.currentChallenge
        );
        await loadChallenge(challenge);
      } catch (err) {
        console.error('Failed to initialize:', err);
      } finally {
        setLoading(false);
      }
    }
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── Load a Challenge into the Editor ──
  const loadChallenge = useCallback(async (challenge: Challenge) => {
    setCurrentChallenge(challenge);
    setValidationResult(null);
    setHintsUsed(0);
    setCompletionResult(null);

    try {
      await window.api.ensureWorkspaceFile(challenge.id);
      const content = await window.api.getWorkspaceFile(challenge.id);
      setCode(content);
    } catch (err) {
      console.error('Failed to load workspace file:', err);
      setCode(challenge.scaffold);
    }
  }, []);

  // ── Select Challenge from Sidebar ──
  const handleSelectChallenge = useCallback(
    async (level: number, challengeNum: number) => {
      try {
        const challenge = await window.api.getChallenge(level, challengeNum);
        await loadChallenge(challenge);
      } catch (err) {
        console.error('Failed to load challenge:', err);
      }
    },
    [loadChallenge]
  );

  // ── Check Solution ──
  const handleCheck = useCallback(async () => {
    if (!currentChallenge || checking) return;

    setChecking(true);
    setCompletionResult(null);

    try {
      // Save current code
      await window.api.saveWorkspaceFile(currentChallenge.id, code);

      // Record the attempt
      await window.api.recordAttempt(currentChallenge.id);

      // Validate
      const result = await window.api.validateSolution(currentChallenge.id, code);
      setValidationResult(result);

      if (result.success) {
        // Complete the challenge
        const completion = await window.api.completeChallenge(
          currentChallenge.id,
          currentChallenge.xp
        );
        setCompletionResult(completion);

        // Reload progress
        const updatedProgress = await window.api.getProgress();
        setProgress(updatedProgress);

        showNotification({
          type: 'success',
          title: 'Challenge Complete!',
          body: `+${completion.xpAwarded} XP${completion.isFlawless ? ' (Flawless!)' : ''}`,
        });

        // Show achievement notifications
        for (const ach of completion.newAchievements) {
          setTimeout(() => {
            showNotification(
              {
                type: 'achievement',
                title: 'Achievement Unlocked!',
                body: ach,
              },
              5000
            );
          }, 2000);
        }
      } else {
        // Reset streak on failure
        await window.api.resetStreak();
        const updatedProgress = await window.api.getProgress();
        setProgress(updatedProgress);
      }
    } catch (err) {
      console.error('Validation failed:', err);
    } finally {
      setChecking(false);
    }
  }, [currentChallenge, code, checking, showNotification]);

  // ── Request Hint ──
  const handleRequestHint = useCallback(() => {
    if (!currentChallenge) return;
    if (hintsUsed < currentChallenge.hints.length) {
      setHintsUsed(prev => prev + 1);
    }
  }, [currentChallenge, hintsUsed]);

  // ── Reset Code ──
  const handleReset = useCallback(async () => {
    if (!currentChallenge) return;
    try {
      const scaffold = await window.api.resetWorkspaceFile(currentChallenge.id);
      setCode(scaffold);
      setValidationResult(null);
      setHintsUsed(0);
      setCompletionResult(null);
    } catch (err) {
      console.error('Failed to reset:', err);
    }
  }, [currentChallenge]);

  // ── Advance to Next Challenge ──
  const handleNextChallenge = useCallback(async () => {
    if (!progress) return;
    try {
      const challenge = await window.api.getChallenge(
        progress.currentLevel,
        progress.currentChallenge
      );
      await loadChallenge(challenge);
    } catch (err) {
      console.error('Failed to advance:', err);
    }
  }, [progress, loadChallenge]);

  // ── Keyboard Shortcut: Ctrl/Cmd+Enter to check ──
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        handleCheck();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [handleCheck]);

  // ── Loading Screen ──
  if (loading || !progress) {
    return (
      <div className="loading-screen">
        <div className="loading-spinner" />
        <div className="loading-text">Loading TSchool...</div>
      </div>
    );
  }

  const isSuccess = validationResult?.success === true;

  return (
    <div className="app-layout">
      {/* Left Sidebar */}
      <Sidebar
        levels={levels}
        progress={progress}
        currentChallengeId={currentChallenge?.id ?? null}
        onSelectChallenge={handleSelectChallenge}
      />

      {/* Main Content: 3-panel stack */}
      <div className="main-content">
        {/* Top: Lesson Panel */}
        <LessonPanel challenge={currentChallenge} />

        {/* Middle: Editor */}
        <div className="editor-panel">
          <div className="editor-toolbar">
            <div className="editor-toolbar-left">
              {currentChallenge && (
                <span>
                  {currentChallenge.id}.ts
                </span>
              )}
            </div>
            <div className="editor-toolbar-right">
              <button
                className="btn btn-secondary"
                onClick={handleReset}
                disabled={!currentChallenge || checking}
              >
                Reset
              </button>
              {isSuccess ? (
                <button
                  className="btn btn-success"
                  onClick={handleNextChallenge}
                >
                  Next Challenge →
                </button>
              ) : (
                <button
                  className="btn btn-primary"
                  onClick={handleCheck}
                  disabled={!currentChallenge || checking}
                >
                  {checking ? 'Checking...' : 'Check ⌘↵'}
                </button>
              )}
            </div>
          </div>
          <Editor
            height="100%"
            language="typescript"
            theme="vs-dark"
            value={code}
            onChange={(value) => setCode(value ?? '')}
            options={{
              minimap: { enabled: false },
              fontSize: 14,
              wordWrap: 'on',
              lineNumbers: 'on',
              scrollBeyondLastLine: false,
              automaticLayout: true,
              padding: { top: 12 },
              renderLineHighlight: 'gutter',
              smoothScrolling: true,
              cursorBlinking: 'smooth',
              bracketPairColorization: { enabled: true },
              fontFamily: "'SF Mono', 'Fira Code', 'JetBrains Mono', monospace",
              fontLigatures: true,
            }}
          />
        </div>

        {/* Bottom: Results Panel */}
        <ResultsPanel
          result={validationResult}
          challenge={currentChallenge}
          hintsUsed={hintsUsed}
          onRequestHint={handleRequestHint}
          xpAwarded={completionResult?.xpAwarded}
          isFlawless={completionResult?.isFlawless}
          newAchievements={completionResult?.newAchievements}
          streak={progress.streak}
        />
      </div>

      {/* XP Float Animation */}
      {completionResult && (
        <div className="xp-float" key={Date.now()}>
          +{completionResult.xpAwarded} XP
        </div>
      )}

      {/* Notification Toast */}
      {notification && (
        <div className={`notification-toast ${notification.type}`}>
          <div className="toast-title">{notification.title}</div>
          <div className="toast-body">{notification.body}</div>
        </div>
      )}
    </div>
  );
};

export default App;
