'use client';

import { Task, Priority, TaskType } from '@/components/kanban/types';
import { useState } from 'react';

interface CreateTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (task: Task) => void;
  darkMode: boolean;
}

export const CreateTaskModal = ({ isOpen, onClose, onSubmit }: CreateTaskModalProps) => {
  const [newTask, setNewTask] = useState({
    title: '',
    priority: 'Medium' as Priority,
    type: 'Feature' as TaskType,
    category: 'MVP Core',
    description: '',
    acceptanceCriteria: [''],
    points: 0
  });

  const handleAddCriteria = () => {
    setNewTask(prev => ({
      ...prev,
      acceptanceCriteria: [...(prev.acceptanceCriteria || []), '']
    }));
  };

  const handleRemoveCriteria = (index: number) => {
    setNewTask(prev => ({
      ...prev,
      acceptanceCriteria: prev.acceptanceCriteria?.filter((_, i) => i !== index) || []
    }));
  };

  const handleCriteriaChange = (index: number, value: string) => {
    setNewTask(prev => ({
      ...prev,
      acceptanceCriteria: prev.acceptanceCriteria?.map((criteria, i) =>
        i === index ? value : criteria
      ) || []
    }));
  };

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
      priority: 'Medium',
      type: 'Feature',
      category: 'MVP Core',
      description: '',
      acceptanceCriteria: [''],
      points: 0
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <form onSubmit={handleSubmit} 
            className="space-y-4 max-w-md w-full bg-[#161b22] p-6 rounded-xl shadow-xl 
                    border border-gray-700 max-h-[90vh] overflow-y-auto">
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
          <option value="Critical">Critical</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
        <select
          value={newTask.type}
          onChange={e => setNewTask(prev => ({ ...prev, type: e.target.value as TaskType }))}
          className="w-full p-2 rounded-lg bg-[#0d1117] border border-gray-600 
                  text-white focus:ring-2 focus:ring-blue-500"
        >
          <option value="Feature">Feature</option>
          <option value="Bug">Bug</option>
          <option value="Technical">Technical</option>
          <option value="Platform">Platform</option>
          <option value="Documentation">Documentation</option>
          <option value="Security">Security</option>
          <option value="Performance">Performance</option>
          <option value="Research">Research</option>
          <option value="Design">Design</option>
          <option value="Testing">Testing</option>
          <option value="Other">Other</option>
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
        <div className="space-y-2">
          <label className="text-sm text-gray-400">Acceptance Criteria</label>
          {newTask.acceptanceCriteria?.map((criteria, index) => (
            <div key={index} className="flex gap-2">
              <input
                type="text"
                value={criteria}
                onChange={(e) => handleCriteriaChange(index, e.target.value)}
                placeholder={`Criteria ${index + 1}`}
                className="flex-1 p-2 rounded-lg bg-[#0d1117] border border-gray-600
                        text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={() => handleRemoveCriteria(index)}
                className="px-2 py-1 text-red-400 hover:text-red-300"
              >
                ✕
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddCriteria}
            className="text-sm text-blue-400 hover:text-blue-300"
          >
            + Add Criteria
          </button>
        </div>
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