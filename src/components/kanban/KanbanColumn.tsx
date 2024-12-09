// src/components/kanban/KanbanColumn.tsx
'use client';

import { Task, BoardState } from '@/components/kanban/types';
import { ArrowRight, BarChart2 } from 'lucide-react';

interface ColumnProps {
  columnId: string;
  tasks: Task[];
  totalPoints: number;
  darkMode: boolean;
  onDrop: (e: React.DragEvent, column: keyof BoardState) => void;
  onDragOver: (e: React.DragEvent) => void;
  onDragStart: (e: React.DragEvent, task: Task) => void;
  onTaskClick: (task: Task) => void;
  searchTerm: string;
}

export const KanbanColumn = ({
  columnId,
  tasks,
  totalPoints,
  onDrop,
  onDragOver,
  onDragStart,
  onTaskClick,
}: ColumnProps) => {
  return (
    <div 
      className={`flex flex-col rounded-xl shadow-lg border transition-all duration-200
                bg-[var(--card-background)] border-[var(--card-border)]
                hover:border-opacity-70`}
      onDrop={(e) => onDrop(e, columnId as keyof BoardState)}
      onDragOver={onDragOver}
    >
      <div className="px-4 py-3 border-b border-[var(--card-border)]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h2 className="font-semibold text-base text-[var(--foreground)]">
              {columnId.toUpperCase()}
            </h2>
            <span className="px-2 py-0.5 text-sm rounded-full bg-[var(--task-background)] text-accent-purple">
              {tasks.length}
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <BarChart2 size={14} className="text-accent-blue opacity-60" />
            <span className="text-sm">
              <span className="text-accent-blue">{totalPoints}</span>
              <span className="text-[var(--foreground)] opacity-40 ml-1">pts</span>
            </span>
          </div>
        </div>
      </div>
      
      <div className="flex-1 p-4 space-y-3 min-h-[200px] max-h-[calc(100vh-280px)] overflow-y-auto">
        {tasks.map((task: Task) => (
          <div
            key={task.id}
            draggable
            onDragStart={(e) => onDragStart(e, task)}
            onClick={() => onTaskClick(task)}
            className={`group bg-[var(--task-background)] rounded-lg p-4 
                    border border-[var(--task-border)] shadow-sm cursor-move 
                    hover:shadow-md transition-all duration-200 
                    hover:border-accent-purple/30 relative`}
          >
            <div className="flex justify-between items-start gap-3">
              <h3 className="font-medium flex-1 text-[var(--foreground)]">{task.title}</h3>
              <div className="flex gap-2 text-sm opacity-80">
                <span>{task.priority}</span>
                <span>{task.type}</span>
              </div>
            </div>
            <div className="flex justify-between items-center mt-2">
              <span className="text-sm text-[var(--foreground)] opacity-60">{task.category}</span>
              <span className="text-sm text-accent-purple">{task.points}pts</span>
            </div>
            <div className="absolute right-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <ArrowRight size={16} className="text-[var(--foreground)] opacity-40" />
            </div>
          </div>
        ))}
        {tasks.length === 0 && (
          <div className="h-full flex items-center justify-center text-[var(--foreground)] opacity-40 text-sm">
            Drop tasks here
          </div>
        )}
      </div>
    </div>
  );
};