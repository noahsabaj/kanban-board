// src/components/kanban/Header.tsx
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
        <h1 className="text-2xl font-bold bg-gradient-to-r from-accent-purple to-accent-blue bg-clip-text text-transparent">
          Kanban Board
        </h1>
        <div className="flex gap-3">
          <button
            onClick={onImport}
            className="flex items-center gap-2 bg-button-primary text-white px-4 py-2 rounded-lg
                    hover:bg-button-primary-hover transition-all duration-200 
                    shadow-lg hover:shadow-accent-purple/20"
          >
            <Upload size={18} />
            Import Stories
          </button>
          <button
            onClick={onCreateTask}
            className="flex items-center gap-2 bg-button-primary text-white px-4 py-2 rounded-lg
                    hover:bg-button-primary-hover transition-all duration-200 
                    shadow-lg hover:shadow-accent-blue/20"
          >
            <Plus size={18} />
            Add Task
          </button>
        </div>
      </div>
      <div className="flex gap-3 items-center">
        <div className="relative flex-1 max-w-md">
          <Search 
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[var(--input-placeholder)]" 
            size={18} 
          />
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg bg-input-background text-foreground
                    border border-input-border placeholder-[var(--input-placeholder)]
                    focus:ring-2 focus:ring-accent-purple/50 focus:border-transparent
                    hover:border-input-border/70 transition-all duration-200"
          />
        </div>
        <button
          onClick={onDarkModeToggle}
          className="p-2 rounded-lg bg-button-secondary border border-input-border
                  hover:bg-button-secondary-hover transition-all duration-200
                  focus:ring-2 focus:ring-accent-purple/50 focus:border-transparent"
          aria-label="Toggle theme"
        >
          {darkMode ? (
            <Sun size={18} className="text-foreground" />
          ) : (
            <Moon size={18} className="text-foreground" />
          )}
        </button>
      </div>
    </div>
  );
};