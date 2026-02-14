import React from 'react';
import type { ValidationResult, Challenge } from '../types';

interface ResultsPanelProps {
  result: ValidationResult | null;
  challenge: Challenge | null;
  hintsUsed: number;
  onRequestHint: () => void;
  xpAwarded?: number;
  isFlawless?: boolean;
  newAchievements?: string[];
  streak?: number;
}

const ResultsPanel: React.FC<ResultsPanelProps> = ({
  result,
  challenge,
  hintsUsed,
  onRequestHint,
  xpAwarded,
  isFlawless,
  newAchievements,
  streak,
}) => {
  // No result yet
  if (!result) {
    return (
      <div className="results-panel">
        <p className="results-empty">
          Edit the code above, then click Check to validate.
        </p>
      </div>
    );
  }

  // Success
  if (result.success) {
    return (
      <div className="results-panel">
        <div className="results-success">
          <div className="results-success-banner">
            <h3 className="results-success-title">Challenge Complete!</h3>
            {xpAwarded !== undefined && (
              <div className="results-xp-awarded">+{xpAwarded} XP earned</div>
            )}
            {isFlawless && (
              <div className="results-flawless">
                Flawless Victory! Solved on first attempt.
              </div>
            )}
            {streak !== undefined && streak > 1 && (
              <div className="results-streak">
                🔥 {streak} challenge streak!
              </div>
            )}
          </div>

          {newAchievements && newAchievements.length > 0 && (
            <div className="results-achievements">
              <div className="results-section-title">New Achievements</div>
              {newAchievements.map((achievement, i) => (
                <div key={i} className="results-achievement">
                  🏆 {achievement}
                </div>
              ))}
            </div>
          )}

          {/* Show all tests as passed */}
          {result.testResults.length > 0 && (
            <>
              <div className="results-section-title">Tests</div>
              {result.testResults.map((test, i) => (
                <div key={i} className="test-result">
                  <span className="test-icon pass">✓</span>
                  <span className="test-description">{test.description}</span>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    );
  }

  // Failure
  const totalHints = challenge?.hints.length ?? 0;
  const hasMoreHints = hintsUsed < totalHints;

  return (
    <div className="results-panel">
      <div className="results-errors">
        {/* Compilation Errors */}
        {result.compilationErrors.length > 0 && (
          <>
            <div className="results-section-title">Compilation Errors</div>
            {result.compilationErrors.map((err, i) => (
              <div key={i} className="compilation-error">
                <span className="error-location">
                  Line {err.line}:{err.column}
                </span>{' '}
                — {err.message}
                {err.friendlyMessage && (
                  <span className="error-friendly">{err.friendlyMessage}</span>
                )}
              </div>
            ))}
          </>
        )}

        {/* Test Results */}
        {result.testResults.length > 0 && (
          <>
            <div className="results-section-title">
              Tests ({result.testResults.filter(t => t.passed).length}/{result.testResults.length} passed)
            </div>
            {result.testResults.map((test, i) => (
              <div key={i}>
                <div className="test-result">
                  <span className={`test-icon ${test.passed ? 'pass' : 'fail'}`}>
                    {test.passed ? '✓' : '✗'}
                  </span>
                  <span className="test-description">{test.description}</span>
                </div>
                {!test.passed && test.errorHint && (
                  <div className="test-hint">{test.errorHint}</div>
                )}
              </div>
            ))}
          </>
        )}

        {/* Hints */}
        {totalHints > 0 && (
          <div className="hints-section">
            <div className="results-section-title" style={{ marginTop: 0 }}>
              Hints ({hintsUsed}/{totalHints})
            </div>
            {challenge!.hints.slice(0, hintsUsed).map((hint, i) => (
              <div key={i} className="hint-item">
                💡 {hint}
              </div>
            ))}
            {hasMoreHints && (
              <button className="hint-btn" onClick={onRequestHint}>
                Show Hint {hintsUsed + 1}
              </button>
            )}
            {!hasMoreHints && hintsUsed > 0 && (
              <div style={{ fontSize: '11px', color: 'var(--text-dim)', marginTop: '4px' }}>
                All hints revealed.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ResultsPanel;
