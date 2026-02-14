import React from 'react';
import type { Challenge } from '../types';

interface LessonPanelProps {
  challenge: Challenge | null;
}

/**
 * Simple renderer that converts backtick-delimited code blocks
 * into styled <code> / <pre> elements.
 */
function renderDescription(text: string): React.ReactNode[] {
  const parts: React.ReactNode[] = [];
  // Split on fenced code blocks: ```...```
  const segments = text.split(/(```[\s\S]*?```)/g);

  segments.forEach((segment, i) => {
    if (segment.startsWith('```') && segment.endsWith('```')) {
      const code = segment.slice(3, -3).replace(/^(typescript|ts|javascript|js)\n/, '');
      parts.push(
        <pre key={`code-${i}`} className="lesson-code-block">
          {code.trim()}
        </pre>
      );
    } else {
      // Handle inline code with single backticks
      const inlineParts = segment.split(/(`[^`]+`)/g);
      const rendered = inlineParts.map((part, j) => {
        if (part.startsWith('`') && part.endsWith('`')) {
          return (
            <code
              key={`inline-${i}-${j}`}
              style={{
                background: 'var(--bg-surface)',
                padding: '1px 5px',
                borderRadius: '3px',
                fontFamily: 'var(--font-mono)',
                fontSize: '12px',
                color: 'var(--accent-teal)',
              }}
            >
              {part.slice(1, -1)}
            </code>
          );
        }
        return part;
      });
      parts.push(<span key={`text-${i}`}>{rendered}</span>);
    }
  });

  return parts;
}

const LessonPanel: React.FC<LessonPanelProps> = ({ challenge }) => {
  if (!challenge) {
    return (
      <div className="lesson-panel">
        <p className="lesson-empty">Select a challenge from the sidebar to begin.</p>
      </div>
    );
  }

  return (
    <div className="lesson-panel">
      <div className="lesson-header">
        <h2 className="lesson-title">{challenge.title}</h2>
        <span className={`difficulty-badge ${challenge.difficulty}`}>
          {challenge.difficulty}
        </span>
        <span className="lesson-xp">+{challenge.xp} XP</span>
      </div>

      <div className="lesson-description">
        {renderDescription(challenge.description)}
      </div>

      <div className="lesson-mission">
        <div className="lesson-mission-label">Mission</div>
        <div className="lesson-mission-text">
          {renderDescription(challenge.mission)}
        </div>
      </div>
    </div>
  );
};

export default LessonPanel;
