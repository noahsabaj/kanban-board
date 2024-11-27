'use client';

import { Task, Priority, TaskType } from '@/components/kanban/types';
import { useState } from 'react';

interface CreateTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (task: Task) => void;
  darkMode: boolean;
}

export const CreateTaskModal = ({ isOpen, onClose, onSubmit, darkMode }: CreateTaskModalProps) => {
  const [newTask, setNewTask] = useState({
    title: '',
    priority: '👍' as Priority,
    type: '🎮' as TaskType,
    category: 'MVP Core',
    description: '',
    points: 0
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...newTask,
      id: Date.now(),
      created: new Date().toISOString(),
      lastModified: new Date().toISOString()
    });
    setNewTask({
      title: '',
      priority: '👍',
      type: '🎮',
      category: 'MVP Core',
      description: '',
      points: 0
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <form onSubmit={handleSubmit} 
            className="space-y-4 max-w-md w-full bg-[#161b22] p-6 rounded-xl shadow-xl 
                    border border-gray-700">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Create New Task</h2>
          <button 
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-300"
          >
            ✕
          </button>
        </div>
        <input
          type="text"
          value={newTask.title}
          onChange={e => setNewTask(prev => ({ ...prev, title: e.target.value }))}
          placeholder="Task title"
          className="w-full p-2 rounded-lg bg-[#0d1117] border border-gray-600 
                  text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500"
          required
        />
        <select
          value={newTask.priority}
          onChange={e => setNewTask(prev => ({ ...prev, priority: e.target.value as Priority }))}
          className="w-full p-2 rounded-lg bg-[#0d1117] border border-gray-600 
                  text-white focus:ring-2 focus:ring-blue-500"
        >
          <option value="🔥">🔥 High</option>
          <option value="⭐">⭐ Medium</option>
          <option value="👍">👍 Normal</option>
          <option value="📝">📝 Low</option>
        </select>
        <select
          value={newTask.type}
          onChange={e => setNewTask(prev => ({ ...prev, type: e.target.value as TaskType }))}
          className="w-full p-2 rounded-lg bg-[#0d1117] border border-gray-600 
                  text-white focus:ring-2 focus:ring-blue-500"
        >
          <option value="🎮">🎮 Feature</option>
          <option value="🐛">🐛 Bug</option>
          <option value="🔧">🔧 Technical</option>
          <option value="📱">📱 Platform</option>
        </select>
        <input
          type="text"
          value={newTask.category}
          onChange={e => setNewTask(prev => ({ ...prev, category: e.target.value }))}
          placeholder="Category"
          className="w-full p-2 rounded-lg bg-[#0d1117] border border-gray-600 
                  text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="number"
          value={newTask.points}
          onChange={e => setNewTask(prev => ({ ...prev, points: parseInt(e.target.value) || 0 }))}
          placeholder="Story Points"
          className="w-full p-2 rounded-lg bg-[#0d1117] border border-gray-600 
                  text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500"
          min="0"
          required
        />
        <textarea
          value={newTask.description}
          onChange={e => setNewTask(prev => ({ ...prev, description: e.target.value }))}
          placeholder="Description"
          rows={3}
          className="w-full p-2 rounded-lg bg-[#0d1117] border border-gray-600 
                  text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500"
        />
        <div className="flex gap-3">
          <button
            type="submit"
            className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg 
                    hover:bg-blue-500 transition-colors duration-200"
          >
            Save Task
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