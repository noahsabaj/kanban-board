'use client';

import { useState, useEffect } from 'react';
import { Task, BoardState, Priority } from '@/components/kanban/types';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { DEFAULT_PERSISTED_STATE, PersistedState } from '@/lib/types';
import { Header } from '@/components/kanban/Header';
import { BoardLayout } from '@/components/kanban/BoardLayout';
import { CreateTaskModal } from '@/components/modals/CreateTaskModal';
import { TaskModal } from '@/components/modals/TaskModal';
import { BoardMetrics } from '@/components/kanban/BoardMetrics';
import { BulkImportModal } from '@/components/modals/BulkImportModal';
import { FilterControls, SortType } from '@/components/kanban/FilterControls';
import { MotivationBanner } from '@/components/ui/MotivationBanner';
import { DefinitionOfDone } from '@/components/kanban/DefinitionOfDone';
import { loadBoard, saveTask, deleteTask, updateTaskStatus } from '@/lib/storage';

export default function Home() {
  const [persistedState, setPersistedState] = useLocalStorage<PersistedState>(
    'kanbanState',
    DEFAULT_PERSISTED_STATE
  );

  const [board, setBoard] = useState<BoardState>(DEFAULT_PERSISTED_STATE.board);
  const [darkMode, setDarkMode] = useState(persistedState.darkMode);
  const [isCreating, setIsCreating] = useState(false);
  const [isBulkImporting, setIsBulkImporting] = useState(false);
  const [bulkTasks, setBulkTasks] = useState('');
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [totalPoints, setTotalPoints] = useState<Record<string, number>>({});
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPriority, setSelectedPriority] = useState<Priority | null>(null);
  const [sortType, setSortType] = useState<SortType>('priority-desc');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  useEffect(() => {
    const tasks = loadBoard();
    setBoard(tasks);
  }, []);

  useEffect(() => {
    setPersistedState({
      board,
      darkMode,
      lastUpdated: new Date().toISOString()
    });
  }, [board, darkMode, setPersistedState]);

  const calculatePoints = (column: Task[]): number => {
    return column.reduce((sum, task) => sum + (task.points || 0), 0);
  };

  useEffect(() => {
    const points = Object.entries(board).reduce<Record<string, number>>((acc, [column, tasks]) => {
      acc[column] = calculatePoints(tasks);
      return acc;
    }, {});
    setTotalPoints(points);
  }, [board]);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    document.documentElement.setAttribute('data-theme', newMode ? 'dark' : 'light');
  };

  const filterAndSortTasks = (tasks: Task[]) => {
    let filteredTasks = [...tasks];
    
    if (selectedPriority) {
      filteredTasks = filteredTasks.filter(task => task.priority === selectedPriority);
    }
  
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      filteredTasks = filteredTasks.filter(task => 
        task.title.toLowerCase().includes(searchLower) ||
        task.category.toLowerCase().includes(searchLower) ||
        task.description?.toLowerCase().includes(searchLower)
      );
    }

    const priorityOrder: Record<Priority, number> = {
      'Critical': 4,
      'High': 3,
      'Medium': 2,
      'Low': 1
    };
  
    switch (sortType) {
      case 'priority-desc':
        return filteredTasks.sort((a, b) => priorityOrder[b.priority] - priorityOrder[a.priority]);
      case 'priority-asc':
        return filteredTasks.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
      case 'alphabetical':
        return filteredTasks.sort((a, b) => a.title.localeCompare(b.title));
      default:
        return filteredTasks;
    }
  };

  const handleCreateTask = (task: Task) => {
    saveTask(task, 'backlog');
    setBoard(prev => ({
      ...prev,
      backlog: [...prev.backlog, task]
    }));
    setIsCreating(false);
  };

  const handleEditTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingTask) return;
    
    const updatedTask: Task = {
      ...editingTask,
      lastModified: new Date().toISOString()
    };

    let currentStatus: keyof BoardState = 'backlog';
    Object.entries(board).forEach(([status, tasks]) => {
      if (tasks.some((t: { id: number; }) => t.id === updatedTask.id)) {
        currentStatus = status as keyof BoardState;
      }
    });

    saveTask(updatedTask, currentStatus);
    
    setBoard(prev => {
      const newBoard = { ...prev };
      Object.entries(newBoard).forEach(([key, tasks]) => {
        newBoard[key as keyof BoardState] = tasks.map(t => 
          t.id === updatedTask.id ? updatedTask : t
        );
      });
      return newBoard;
    });
    
    setIsEditing(false);
    setEditingTask(null);
    setSelectedTask(updatedTask);
  };

  const handleDeleteTask = (taskId: number) => {
    deleteTask(taskId);
    setBoard(prev => {
      const newBoard = { ...prev };
      Object.entries(newBoard).forEach(([key, tasks]) => {
        newBoard[key as keyof BoardState] = tasks.filter(t => t.id !== taskId);
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
      
      tasksWithIds.forEach(task => saveTask(task, 'backlog'));
      setBoard(prev => ({
        ...prev,
        backlog: [...prev.backlog, ...tasksWithIds]
      }));
      setIsBulkImporting(false);
      setBulkTasks('');
    } catch (error) {
      console.error('Failed to import tasks:', error);
      alert('Invalid JSON format. Please check your input.');
    }
  };

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, task: Task) => {
    e.dataTransfer.setData('task', JSON.stringify(task));
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, column: keyof BoardState) => {
    e.preventDefault();
    const task = JSON.parse(e.dataTransfer.getData('task')) as Task;
    const updatedTask = {
      ...task,
      lastModified: new Date().toISOString()
    };
    
    updateTaskStatus(updatedTask.id, column);
    setBoard(prev => {
      const newBoard = { ...prev };
      Object.entries(newBoard).forEach(([key, tasks]) => {
        newBoard[key as keyof BoardState] = tasks.filter(t => t.id !== task.id);
      });
      
      newBoard[column] = [...newBoard[column], updatedTask];
      return newBoard;
    });
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const startEditing = (task: Task) => {
    setEditingTask(task);
    setIsEditing(true);
  };

  return (
    <main className="min-h-screen p-6 flex flex-col justify-between bg-[var(--background)] text-[var(--foreground)]">
      <div className="max-w-[1800px] mx-auto w-full">
        <Header 
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          darkMode={darkMode}
          onDarkModeToggle={toggleDarkMode}
          onImport={() => setIsBulkImporting(true)}
          onCreateTask={() => setIsCreating(true)}
        />

        <div className="flex justify-between items-center mb-6">
          <FilterControls
            selectedPriority={selectedPriority}
            onPrioritySelect={setSelectedPriority}
            sortType={sortType}
            onSortChange={setSortType}
          />
          <BoardMetrics board={board} />
        </div>

        <BoardLayout 
          board={Object.entries(board).reduce<BoardState>((acc, [key, tasks]) => ({
            ...acc,
            [key]: filterAndSortTasks(tasks)
          }), DEFAULT_PERSISTED_STATE.board)}
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

      <div className="mt-8">
          <DefinitionOfDone />
          <MotivationBanner />
        </div>
    </main>
  );
}