'use client';

import { useState, useEffect } from 'react';
import { Task, BoardState } from '@/components/kanban/types';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { DEFAULT_PERSISTED_STATE, PersistedState } from '@/lib/types';
import { Header } from '@/components/kanban/Header';
import { BoardLayout } from '@/components/kanban/BoardLayout';
import { CreateTaskModal } from '@/components/modals/CreateTaskModal';
import { TaskModal } from '@/components/modals/TaskModal';
import { BulkImportModal } from '@/components/modals/BulkImportModal';

export default function Home() {
  const [persistedState, setPersistedState] = useLocalStorage<PersistedState>(
    'kanbanState',
    DEFAULT_PERSISTED_STATE
  );

  const [board, setBoard] = useState(persistedState.board);
  const [darkMode, setDarkMode] = useState(persistedState.darkMode);
  const [isCreating, setIsCreating] = useState(false);
  const [isBulkImporting, setIsBulkImporting] = useState(false);
  const [bulkTasks, setBulkTasks] = useState('');
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [totalPoints, setTotalPoints] = useState<{ [key: string]: number }>({});
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    setPersistedState({
      board,
      darkMode,
      lastUpdated: new Date().toISOString()
    });
  }, [board, darkMode]);

  useEffect(() => {
    calculateTotalPoints();
  }, [board]);

  const calculateTotalPoints = () => {
    const points = Object.entries(board).reduce((acc, [column, tasks]) => {
      acc[column] = tasks.reduce((sum, task) => sum + task.points, 0);
      return acc;
    }, {} as { [key: string]: number });
    setTotalPoints(points);
  };

  const handleCreateTask = (task: Task) => {
    const newBoard = {
      ...board,
      backlog: [...board.backlog, task]
    };
    setBoard(newBoard);
    setIsCreating(false);
  };

  const handleEditTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingTask) return;
    
    const updatedTask = {
      ...editingTask,
      lastModified: new Date().toISOString()
    };
    
    setBoard(prev => {
      const newBoard = { ...prev };
      Object.keys(newBoard).forEach(key => {
        newBoard[key as keyof BoardState] = newBoard[key as keyof BoardState]
          .map(t => t.id === updatedTask.id ? updatedTask : t);
      });
      return newBoard;
    });
    
    setIsEditing(false);
    setEditingTask(null);
    setSelectedTask(updatedTask);
  };

  const handleDeleteTask = (taskId: number) => {
    setBoard(prev => {
      const newBoard = { ...prev };
      Object.keys(newBoard).forEach(key => {
        newBoard[key as keyof BoardState] = newBoard[key as keyof BoardState]
          .filter(t => t.id !== taskId);
      });
      return newBoard;
    });
    setShowDeleteConfirm(false);
    setSelectedTask(null);
  };

  const handleBulkImport = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const tasks: Task[] = JSON.parse(bulkTasks);
      const timestamp = new Date().toISOString();
      const tasksWithIds = tasks.map(task => ({
        ...task,
        id: Date.now() + Math.random(),
        created: timestamp,
        lastModified: timestamp
      }));
      
      setBoard(prev => ({
        ...prev,
        backlog: [...prev.backlog, ...tasksWithIds]
      }));
      setIsBulkImporting(false);
      setBulkTasks('');
    } catch (error) {
      alert('Invalid JSON format. Please check your input.');
    }
  };

  const handleDragStart = (e: React.DragEvent, task: Task) => {
    e.dataTransfer.setData('task', JSON.stringify(task));
  };

  const handleDrop = (e: React.DragEvent, column: keyof BoardState) => {
    e.preventDefault();
    const task = JSON.parse(e.dataTransfer.getData('task')) as Task;
    const updatedTask = {
      ...task,
      lastModified: new Date().toISOString()
    };
    
    setBoard(prev => {
      const newBoard = { ...prev };
      Object.keys(newBoard).forEach(key => {
        newBoard[key as keyof BoardState] = newBoard[key as keyof BoardState]
          .filter(t => t.id !== task.id);
      });
      
      newBoard[column] = [...newBoard[column], updatedTask];
      return newBoard;
    });
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const startEditing = (task: Task) => {
    setEditingTask(task);
    setIsEditing(true);
  };

  return (
    <main className={`min-h-screen p-6 ${darkMode ? 'bg-[#0d1117] text-gray-100' : 'bg-gray-100 text-gray-900'}`}>
      <div className="max-w-[1800px] mx-auto">
        <Header 
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          darkMode={darkMode}
          onDarkModeToggle={() => setDarkMode(!darkMode)}
          onImport={() => setIsBulkImporting(true)}
          onCreateTask={() => setIsCreating(true)}
        />

        <BoardLayout 
          board={board}
          totalPoints={totalPoints}
          darkMode={darkMode}
          searchTerm={searchTerm}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragStart={handleDragStart}
          onTaskClick={setSelectedTask}
        />

        <CreateTaskModal 
          isOpen={isCreating}
          onClose={() => setIsCreating(false)}
          onSubmit={handleCreateTask}
          darkMode={darkMode}
        />

        {selectedTask && (
          <TaskModal
            task={selectedTask}
            isEditing={isEditing}
            showDeleteConfirm={showDeleteConfirm}
            editingTask={editingTask || selectedTask}
            darkMode={darkMode}
            onClose={() => {
              setSelectedTask(null);
              setIsEditing(false);
              setEditingTask(null);
            }}
            onDelete={handleDeleteTask}
            onEdit={() => startEditing(selectedTask)}
            onEditSubmit={handleEditTask}
            onEditingTaskChange={setEditingTask}
            onShowDeleteConfirm={() => setShowDeleteConfirm(true)}
          />
        )}

        <BulkImportModal
          isOpen={isBulkImporting}
          onClose={() => setIsBulkImporting(false)}
          onSubmit={handleBulkImport}
          bulkTasks={bulkTasks}
          onBulkTasksChange={setBulkTasks}
        />
      </div>
    </main>
  );
}