'use client';

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
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold">Kanban Board</h1>
          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Search tasks..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="px-3 py-1 rounded-lg bg-gray-700 border border-gray-600 text-white"
            />
            <button
              onClick={onDarkModeToggle}
              className="p-2 rounded-lg bg-gray-700 hover:bg-gray-600"
            >
              {darkMode ? '☀️' : '🌙'}
            </button>
          </div>
        </div>
        <div className="flex gap-4">
          <button
            onClick={onImport}
            className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-500 
                    transition-colors duration-200 shadow-lg hover:shadow-purple-500/20"
          >
            Import User Stories
          </button>
          <button
            onClick={onCreateTask}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-500 
                    transition-colors duration-200 shadow-lg hover:shadow-blue-500/20"
          >
            + Add Single Task
          </button>
        </div>
      </div>
    );
  };