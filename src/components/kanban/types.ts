// src/components/kanban/types.ts
export type Priority = 'Critical' | 'High' | 'Medium' | 'Low';
export type TaskType = 
  | 'Feature'      // New functionality
  | 'Bug'          // Defect fixes
  | 'Technical'    // Infrastructure/refactoring
  | 'Platform'     // Environment/deployment
  | 'Documentation'// Documentation updates
  | 'Security'     // Security/compliance work
  | 'Performance'  // Optimization tasks
  | 'Research'     // Investigation/spikes
  | 'Design'       // UI/UX work
  | 'Testing'      // Test infrastructure/automation
  | 'Other';       // Anything else

export interface Task {
    id: number;
    title: string;
    priority: Priority;
    type: TaskType;
    category: string;
    description?: string;
    acceptanceCriteria?: string[];
    points: number;
    created: string;
    lastModified: string;
}

export interface BoardState {
    backlog: Task[];
    todo: Task[];
    inProgress: Task[];
    testing: Task[];
    done: Task[];
}