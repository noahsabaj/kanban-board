export type Priority = '🔥' | '⭐' | '👍' | '📝';
export type TaskType = '🎮' | '🐛' | '🔧' | '📱';

export interface Task {
    id: number;
    title: string;
    priority: Priority;
    type: TaskType;
    category: string;
    description?: string;
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