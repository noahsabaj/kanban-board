'use client';

import { BoardState, Task } from '@/components/kanban/types';
import { KanbanColumn } from './KanbanColumn';

interface BoardLayoutProps {
  board: BoardState;
  totalPoints: { [key: string]: number };
  darkMode: boolean;
  searchTerm: string;
  onDrop: (e: React.DragEvent, column: keyof BoardState) => void;
  onDragOver: (e: React.DragEvent) => void;
  onDragStart: (e: React.DragEvent, task: Task) => void;
  onTaskClick: (task: Task) => void;
}

export const BoardLayout = ({
  board,
  totalPoints,
  darkMode,
  searchTerm,
  onDrop,
  onDragOver,
  onDragStart,
  onTaskClick
}: BoardLayoutProps) => {
  return (
    <div className="grid grid-cols-5 gap-6">
      {Object.entries(board).map(([columnId, tasks]) => (
        <KanbanColumn
          key={columnId}
          columnId={columnId}
          tasks={tasks}
          totalPoints={totalPoints[columnId] || 0}
          darkMode={darkMode}
          onDrop={onDrop}
          onDragOver={onDragOver}
          onDragStart={onDragStart}
          onTaskClick={onTaskClick}
          searchTerm={searchTerm}
        />
      ))}
    </div>
  );
};