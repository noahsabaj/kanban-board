'use client';

import { Search, Moon, Sun, Plus, Upload } from 'lucide-react';

interface HeaderProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  darkMode: boolean;
  onDarkModeToggle: () => void;
  onImport: () => void;
  onCreateTask: () => void;
}

export const Header = ({
  searchTerm,
  onSearchChange,
  darkMode,
  onDarkModeToggle,
  onImport,
  onCreateTask
}: HeaderProps) => {
  return (
    <div className="flex flex-col gap-4 mb-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">
          Kanban Board
        </h1>
        <div className="flex gap-3">
          <button
            onClick={onImport}
            className="flex items-center gap-2 bg-purple-600/90 text-white px-4 py-2 rounded-lg 
                    hover:bg-purple-500 transition-all duration-200 shadow-lg hover:shadow-purple-500/20"
          >
            <Upload size={18} />
            Import Stories
          </button>
          <button
            onClick={onCreateTask}
            className="flex items-center gap-2 bg-blue-600/90 text-white px-4 py-2 rounded-lg 
                    hover:bg-blue-500 transition-all duration-200 shadow-lg hover:shadow-blue-500/20"
          >
            <Plus size={18} />
            Add Task
          </button>
        </div>
      </div>
      <div className="flex gap-3 items-center">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-800/50 border border-gray-700 
                    text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500/50 focus:border-transparent
                    transition-all duration-200"
          />
        </div>
        <button
          onClick={onDarkModeToggle}
          className="p-2 rounded-lg bg-gray-800/50 border border-gray-700 hover:bg-gray-700/50 
                  transition-all duration-200"
          aria-label="Toggle theme"
        >
          {darkMode ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </div>
    </div>
  );
};