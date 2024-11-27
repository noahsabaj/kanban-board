'use client';

import { Task, BoardState } from '@/components/kanban/types';

interface KanbanColumnProps {
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

const getFilteredTasks = (tasks: Task[], searchTerm: string) => {
  return tasks.filter(task => 
    task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    task.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    task.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );
};

export const KanbanColumn = ({
  columnId,
  tasks,
  totalPoints,
  darkMode,
  onDrop,
  onDragOver,
  onDragStart,
  onTaskClick,
  searchTerm
}: KanbanColumnProps) => {
  return (
    <div 
      className={`${darkMode ? 'bg-[#161b22]' : 'bg-white'} rounded-xl shadow-lg border border-gray-700`}
      onDrop={(e) => onDrop(e, columnId as keyof BoardState)}
      onDragOver={onDragOver}
    >
      <div className="p-4 border-b border-gray-700">
        <h2 className="font-bold text-lg">
          {columnId.toUpperCase()}
          <span className="ml-2 text-sm text-gray-400">
            {tasks.length} {tasks.length === 1 ? 'task' : 'tasks'}
          </span>
          <span className="ml-2 text-sm text-purple-400">
            {totalPoints} pts
          </span>
        </h2>
      </div>
      
      <div className="p-4 space-y-3 max-h-[calc(100vh-280px)] overflow-y-auto">
        {getFilteredTasks(tasks, searchTerm).map((task: Task) => (
          <div
            key={task.id}
            draggable
            onDragStart={(e) => onDragStart(e, task)}
            onClick={() => onTaskClick(task)}
            className={`${darkMode ? 'bg-[#21262d]' : 'bg-gray-50'} rounded-lg p-4 shadow-md cursor-move 
                    hover:shadow-lg transition-all duration-200 
                    border border-gray-700 hover:border-blue-500/50`}
          >
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-medium">
                {task.title}
                <span className="ml-2 text-sm text-purple-400">{task.points}pts</span>
              </h3>
              <div className="flex gap-2 text-sm">
                <span className="opacity-90">{task.priority}</span>
                <span className="opacity-90">{task.type}</span>
              </div>
            </div>
            <div className="text-sm text-gray-400">{task.category}</div>
          </div>
        ))}
      </div>
    </div>
  );
};