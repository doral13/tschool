import React, { useState, useMemo } from 'react';
import type { LevelDefinition, Progress, Difficulty } from '../types';
import { RANKS as RanksData } from '../types';

interface SidebarProps {
  levels: LevelDefinition[];
  progress: Progress;
  currentChallengeId: string | null;
  onSelectChallenge: (level: number, challenge: number) => void;
}

const DIFFICULTY_LABELS: Record<Difficulty, string> = {
  easy: 'E',
  medium: 'M',
  hard: 'H',
  boss: 'B',
};

function getCurrentRank(xp: number) {
  let current = RanksData[0];
  for (const rank of RanksData) {
    if (xp >= rank.minXP) {
      current = rank;
    }
  }
  return current;
}

function getNextRank(xp: number) {
  for (const rank of RanksData) {
    if (xp < rank.minXP) {
      return rank;
    }
  }
  return null;
}

function getXpProgress(xp: number): number {
  const current = getCurrentRank(xp);
  const next = getNextRank(xp);
  if (!next) return 100;
  const range = next.minXP - current.minXP;
  const progress = xp - current.minXP;
  return Math.min(100, (progress / range) * 100);
}

function isLevelUnlocked(levelNumber: number, progress: Progress): boolean {
  if (levelNumber === 0) return true;
  // A level is unlocked if the player's current level is >= this level number
  return progress.currentLevel >= levelNumber;
}

const Sidebar: React.FC<SidebarProps> = ({ levels, progress, currentChallengeId, onSelectChallenge }) => {
  const [expandedLevels, setExpandedLevels] = useState<Set<number>>(() => {
    return new Set([progress.currentLevel]);
  });

  const currentRank = useMemo(() => getCurrentRank(progress.xp), [progress.xp]);
  const nextRank = useMemo(() => getNextRank(progress.xp), [progress.xp]);
  const xpPercent = useMemo(() => getXpProgress(progress.xp), [progress.xp]);

  const toggleLevel = (levelNum: number) => {
    if (!isLevelUnlocked(levelNum, progress)) return;
    setExpandedLevels(prev => {
      const next = new Set(prev);
      if (next.has(levelNum)) {
        next.delete(levelNum);
      } else {
        next.add(levelNum);
      }
      return next;
    });
  };

  return (
    <div className="sidebar">
      {/* Header: Logo, Rank, XP */}
      <div className="sidebar-header">
        <h1 className="sidebar-logo">
          T<span>School</span>
        </h1>
        <div className="rank-display">
          <span className="rank-icon">{currentRank.icon}</span>
          <span>{currentRank.name}</span>
        </div>
        <div className="xp-bar-container">
          <div
            className="xp-bar-fill"
            style={{ width: `${xpPercent}%` }}
          />
        </div>
        <div className="xp-label">
          {progress.xp} XP
          {nextRank ? ` / ${nextRank.minXP} XP` : ' (MAX)'}
        </div>
        <div className={`streak-display ${progress.streak > 0 ? 'active' : ''}`}>
          <span>{progress.streak > 0 ? '🔥' : '💤'}</span>
          <span>
            Streak: {progress.streak}
            {progress.bestStreak > progress.streak && ` (best: ${progress.bestStreak})`}
          </span>
        </div>
      </div>

      {/* Level Tree */}
      <div className="level-tree">
        {levels.map(level => {
          const unlocked = isLevelUnlocked(level.number, progress);
          const expanded = expandedLevels.has(level.number);

          return (
            <div className="level-group" key={level.number}>
              <div
                className={`level-header ${!unlocked ? 'locked' : ''}`}
                onClick={() => toggleLevel(level.number)}
              >
                <span className={`level-chevron ${expanded ? 'expanded' : ''}`}>
                  {unlocked ? '▶' : '🔒'}
                </span>
                <span>
                  {level.number}. {level.title}
                </span>
              </div>
              {expanded && unlocked && (
                <div className="challenge-list">
                  {level.challenges.map(ch => {
                    const completed = progress.completedChallenges.includes(ch.id);
                    const isActive = currentChallengeId === ch.id;

                    return (
                      <div
                        key={ch.id}
                        className={`challenge-item ${isActive ? 'active' : ''} ${completed ? 'completed' : ''}`}
                        onClick={() => onSelectChallenge(level.number, ch.number)}
                      >
                        <span className={`challenge-check ${completed ? 'done' : ''}`}>
                          {completed ? '✓' : '○'}
                        </span>
                        <span className="challenge-title">{ch.title}</span>
                        <span className={`difficulty-badge ${ch.difficulty}`}>
                          {DIFFICULTY_LABELS[ch.difficulty]}
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;
