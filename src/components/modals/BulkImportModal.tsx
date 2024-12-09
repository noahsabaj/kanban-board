'use client';

import { Task } from '@/components/kanban/types';

interface BulkImportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
  bulkTasks: string;
  onBulkTasksChange: (value: string) => void;
}

export const BulkImportModal = ({
  isOpen,
  onClose,
  onSubmit,
  bulkTasks,
  onBulkTasksChange
}: BulkImportModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <form onSubmit={onSubmit} 
            className="space-y-4 max-w-2xl w-full bg-[#161b22] p-6 rounded-xl shadow-xl 
                    border border-gray-700">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Import User Stories</h2>
          <button 
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-300"
          >
            ✕
          </button>
        </div>
        <textarea
          value={bulkTasks}
          onChange={e => onBulkTasksChange(e.target.value)}
          placeholder={`Paste your user stories JSON array here, e.g.:
            [
              {
                "title": "Story title",
                "priority": "High",
                "type": "Feature",
                "category": "MVP Core",
                "description": "Story description",
                "acceptanceCriteria": [
                  "User can successfully do X",
                  "System validates Y",
                  "Error handling for Z is implemented"
                ],
                "points": 5
              }
            ]`}
          rows={10}
          className="w-full p-4 rounded-lg bg-[#0d1117] border border-gray-600 
                  text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500
                  font-mono text-sm"
          required
        />
        <div className="flex gap-3">
          <button
            type="submit"
            className="flex-1 bg-purple-600 text-white px-4 py-2 rounded-lg 
                    hover:bg-purple-500 transition-colors duration-200"
          >
            Import Stories
          </button>
          <button
            type="button"
            onClick={onClose}
            className="flex-1 bg-gray-700 text-white px-4 py-2 rounded-lg 
                    hover:bg-gray-600 transition-colors duration-200"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};