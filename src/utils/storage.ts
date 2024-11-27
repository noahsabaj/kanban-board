export const clearBoardData = () => {
  if (typeof window !== 'undefined') {
    window.localStorage.removeItem('kanbanState');
    window.location.reload();
  }
};

export const exportBoardData = () => {
  if (typeof window !== 'undefined') {
    const data = window.localStorage.getItem('kanbanState');
    if (data) {
      const blob = new Blob([data], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `kanban-backup-${new Date().toISOString()}.json`;
      a.click();
      URL.revokeObjectURL(url);
    }
  }
};

export const importBoardData = (jsonString: string) => {
  try {
    const data = JSON.parse(jsonString);
    window.localStorage.setItem('kanbanState', JSON.stringify(data));
    window.location.reload();
  } catch (error) {
    console.error('Error importing board data:', error);
    alert('Invalid backup file format');
  }
};