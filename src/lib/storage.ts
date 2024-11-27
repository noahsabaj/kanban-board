import { Task, BoardState } from '@/components/kanban/types';

const STORAGE_KEY = 'kanbanBoard';

export const saveBoard = (board: BoardState): void => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(board));
  } catch (error) {
    console.error('Error saving board:', error);
  }
};

export const loadBoard = (): BoardState => {
  if (typeof window === 'undefined') {
    return {
      backlog: [],
      todo: [],
      inProgress: [],
      testing: [],
      done: []
    };
  }
  
  try {
    const savedBoard = localStorage.getItem(STORAGE_KEY);
    return savedBoard ? JSON.parse(savedBoard) : {
      backlog: [],
      todo: [],
      inProgress: [],
      testing: [],
      done: []
    };
  } catch (error) {
    console.error('Error loading board:', error);
    return {
      backlog: [],
      todo: [],
      inProgress: [],
      testing: [],
      done: []
    };
  }
};

export const saveTask = (task: Task, status: keyof BoardState): void => {
  const currentBoard = loadBoard();
  const newBoard = { ...currentBoard };
  
  // Remove task from any existing column
  Object.keys(newBoard).forEach(key => {
    newBoard[key as keyof BoardState] = newBoard[key as keyof BoardState]
      .filter(t => t.id !== task.id);
  });
  
  // Add task to specified column
  newBoard[status] = [...newBoard[status], task];
  
  saveBoard(newBoard);
};

export const updateTaskStatus = (taskId: number, newStatus: keyof BoardState): void => {
  const currentBoard = loadBoard();
  const task = Object.values(currentBoard)
    .flat()
    .find(t => t.id === taskId);
    
  if (task) {
    const updatedTask = {
      ...task,
      lastModified: new Date().toISOString()
    };
    saveTask(updatedTask, newStatus);
  }
};

export const deleteTask = (taskId: number): void => {
  const currentBoard = loadBoard();
  const newBoard = { ...currentBoard };
  
  Object.keys(newBoard).forEach(key => {
    newBoard[key as keyof BoardState] = newBoard[key as keyof BoardState]
      .filter(t => t.id !== taskId);
  });
  
  saveBoard(newBoard);
};

export const exportBoardData = (): void => {
  const data = localStorage.getItem(STORAGE_KEY);
  if (data) {
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `kanban-backup-${new Date().toISOString()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }
};

export const importBoardData = (jsonString: string): void => {
  try {
    const data = JSON.parse(jsonString);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    window.location.reload();
  } catch (error) {
    console.error('Error importing board data:', error);
    alert('Invalid backup file format');
  }
};