// src/components/kanban/BoardMetrics.tsx
'use client';

import { AlertCircle } from 'lucide-react';
import { BoardState } from './types';

interface BoardMetricsProps {
  board: BoardState;
  className?: string;
}

export const BoardMetrics = ({ board, className = '' }: BoardMetricsProps) => {
  const calculateTotals = () => {
    let totalStories = 0;
    let totalPoints = 0;

    Object.values(board).forEach(tasks => {
      totalStories += tasks.length;
      totalPoints += tasks.reduce((sum: any, task: { points: any; }) => sum + (task.points || 0), 0);
    });

    return { totalStories, totalPoints };
  };

  const { totalStories, totalPoints } = calculateTotals();

  return (
    <div className={`flex items-center gap-2 px-3 py-2 rounded-lg bg-stats-background border border-stats-border ${className}`}>
      <AlertCircle size={16} className="text-accent-purple" />
      <div className="flex gap-4">
        <div className="flex items-center gap-2">
          <span className="text-sm text-foreground/60">Total Stories:</span>
          <span className="font-medium text-accent-purple">{totalStories}</span>
        </div>
        <div className="h-4 w-px bg-stats-border" />
        <div className="flex items-center gap-2">
          <span className="text-sm text-foreground/60">Total Points:</span>
          <span className="font-medium text-accent-blue">{totalPoints}</span>
        </div>
      </div>
    </div>
  );
};