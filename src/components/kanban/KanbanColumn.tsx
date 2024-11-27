'use client';

import { Task, BoardState } from '@/components/kanban/types';
import { ArrowRight } from 'lucide-react';

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
  darkMode,
  onDrop,
  onDragOver,
  onDragStart,
  onTaskClick,
  searchTerm,
}: ColumnProps) => {
  return (
    <div 
      className={`flex flex-col ${darkMode ? 'bg-[#161b22]' : 'bg-white'} 
                rounded-xl shadow-lg border border-gray-700/50 backdrop-blur-sm
                transition-all duration-200 hover:border-gray-600/50`}
      onDrop={(e) => onDrop(e, columnId as keyof BoardState)}
      onDragOver={onDragOver}
    >
      <div className="p-4 border-b border-gray-700/50">
        <div className="flex items-center justify-between">
          <h2 className="font-bold text-lg">
            {columnId.toUpperCase()}
          </h2>
          <div className="flex items-center gap-2 text-sm">
            <span className="px-2 py-1 rounded-full bg-gray-800/50 text-purple-400">
              {tasks.length}
            </span>
            <span className="px-2 py-1 rounded-full bg-gray-800/50 text-blue-400">
              {totalPoints} pts
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
            className={`group bg-gray-800/50 rounded-lg p-4 shadow-md cursor-move 
                    hover:shadow-lg transition-all duration-200 
                    border border-gray-700/50 hover:border-purple-500/30
                    hover:translate-x-1 hover:-translate-y-1`}
          >
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-medium flex-1 pr-4">{task.title}</h3>
              <div className="flex gap-2 text-sm opacity-80">
                <span>{task.priority}</span>
                <span>{task.type}</span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <div className="text-sm text-gray-400">{task.category}</div>
              <span className="text-sm text-purple-400">{task.points}pts</span>
            </div>
            <div className="absolute right-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <ArrowRight size={16} className="text-gray-400" />
            </div>
          </div>
        ))}
        {tasks.length === 0 && (
          <div className="h-full flex items-center justify-center text-gray-500 text-sm">
            Drop tasks here
          </div>
        )}
      </div>
    </div>
  );
};