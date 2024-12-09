'use client';

import { Task, Priority, TaskType } from '@/components/kanban/types';

interface TaskModalProps {
  task: Task;
  isEditing: boolean;
  showDeleteConfirm: boolean;
  editingTask: Task | null;
  darkMode: boolean;
  onClose: () => void;
  onDelete: (id: number) => void;
  onEdit: () => void;
  onEditSubmit: (e: React.FormEvent) => void;
  onEditingTaskChange: (task: Task) => void;
  onShowDeleteConfirm: () => void;
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleString();
};

export const TaskModal = ({
  task,
  isEditing,
  showDeleteConfirm,
  editingTask,
  darkMode,
  onClose,
  onDelete,
  onEdit,
  onEditSubmit,
  onEditingTaskChange,
  onShowDeleteConfirm
}: TaskModalProps) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className={`${darkMode ? 'bg-[#161b22]' : 'bg-white'} p-6 rounded-xl max-w-lg w-full shadow-xl border border-gray-700 max-h-[90vh] overflow-y-auto`}>
        {!isEditing && !showDeleteConfirm ? (
          <>
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-xl font-bold">{task.title}</h2>
                <span className="text-purple-400">{task.points} points</span>
                <div className="text-sm text-gray-400 mt-1">
                  Created: {formatDate(task.created)}
                  <br />
                  Last Modified: {formatDate(task.lastModified)}
                </div>
              </div>
              <div className="flex gap-2">
                <button onClick={onShowDeleteConfirm} className="text-red-400 hover:text-red-300 p-2">🗑️</button>
                <button onClick={onEdit} className="text-blue-400 hover:text-blue-300 p-2">✏️</button>
                <button onClick={onClose} className="text-gray-400 hover:text-gray-300 p-2">✕</button>
              </div>
            </div>
            <div className="flex gap-2 mb-4">
              <span className="px-2 py-1 bg-[#21262d] rounded text-sm">{task.priority}</span>
              <span className="px-2 py-1 bg-[#21262d] rounded text-sm">{task.type}</span>
              <span className="px-2 py-1 bg-[#21262d] rounded text-sm">{task.category}</span>
            </div>
            <p className="text-gray-300 whitespace-pre-wrap mb-4">{task.description || 'No description provided.'}</p>
            
            <div className="mt-4">
              <h3 className="text-sm text-gray-400 mb-2">Acceptance Criteria:</h3>
              {task.acceptanceCriteria && task.acceptanceCriteria.length > 0 ? (
                <ul className="list-disc list-inside space-y-1 text-gray-300">
                  {task.acceptanceCriteria.map((criteria, index) => (
                    <li key={index}>{criteria}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500 italic">No acceptance criteria specified</p>
              )}
            </div>
          </>
        ) : showDeleteConfirm ? (
          <div className="text-center">
            <h2 className="text-xl font-bold mb-4">Delete Task</h2>
            <p className="mb-6">Are you sure you want to delete this task?</p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => onDelete(task.id)}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Delete
              </button>
              <button
                onClick={() => onShowDeleteConfirm()}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={onEditSubmit} className="space-y-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Edit Task</h2>
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
              value={editingTask?.title}
              onChange={e => onEditingTaskChange({ ...task, title: e.target.value })}
              className="w-full p-2 rounded-lg bg-[#0d1117] border border-gray-600 text-white"
              required
            />
            <select
              value={editingTask?.priority}
              onChange={e => onEditingTaskChange({ ...task, priority: e.target.value as Priority })}
              className="w-full p-2 rounded-lg bg-[#0d1117] border border-gray-600 text-white"
            >
              <option value="🔥">🔥 High</option>
              <option value="⭐">⭐ Medium</option>
              <option value="👍">👍 Normal</option>
              <option value="📝">📝 Low</option>
            </select>
            <select
              value={editingTask?.type}
              onChange={e => onEditingTaskChange({ ...task, type: e.target.value as TaskType })}
              className="w-full p-2 rounded-lg bg-[#0d1117] border border-gray-600 text-white"
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
              value={editingTask?.category}
              onChange={e => onEditingTaskChange({ ...task, category: e.target.value })}
              placeholder="Category"
              className="w-full p-2 rounded-lg bg-[#0d1117] border border-gray-600 text-white"
            />
            <input
              type="number"
              value={editingTask?.points}
              onChange={e => onEditingTaskChange({ ...task, points: parseInt(e.target.value) || 0 })}
              placeholder="Story Points"
              className="w-full p-2 rounded-lg bg-[#0d1117] border border-gray-600 text-white"
              min="0"
              required
            />
            <textarea
              value={editingTask?.description}
              onChange={e => onEditingTaskChange({ ...task, description: e.target.value })}
              placeholder="Description"
              rows={3}
              className="w-full p-2 rounded-lg bg-[#0d1117] border border-gray-600 text-white"
            />
            
            <div className="space-y-2">
              <label className="text-sm text-gray-400">Acceptance Criteria</label>
              {editingTask?.acceptanceCriteria?.map((criteria, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    value={criteria}
                    onChange={(e) => {
                      const newCriteria = [...(editingTask.acceptanceCriteria || [])];
                      newCriteria[index] = e.target.value;
                      onEditingTaskChange({ ...task, acceptanceCriteria: newCriteria });
                    }}
                    className="flex-1 p-2 rounded-lg bg-[#0d1117] border border-gray-600 text-white"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      const newCriteria = editingTask.acceptanceCriteria?.filter((_, i) => i !== index);
                      onEditingTaskChange({
                        ...editingTask!,
                        acceptanceCriteria: newCriteria || []
                      });
                    }}
                    className="px-2 py-1 text-red-400 hover:text-red-300"
                  >
                    ✕
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => {
                  const newCriteria = [...(editingTask?.acceptanceCriteria || []), ''];
                  onEditingTaskChange({
                    ...editingTask!,
                    acceptanceCriteria: newCriteria
                  });
                }}
                className="text-sm text-blue-400 hover:text-blue-300"
              >
                + Add Criteria
              </button>
            </div>

            <div className="flex gap-3">
              <button
                type="submit"
                className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-500"
              >
                Save Changes
              </button>
              <button
                type="button"
                onClick={onClose}
                className="flex-1 bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};