import { BoardState } from '@/components/kanban/types';

export interface PersistedState {
  board: BoardState;
  darkMode: boolean;
  lastUpdated: string;
}

export const DEFAULT_PERSISTED_STATE: PersistedState = {
  board: {
    backlog: [],
    todo: [],
    inProgress: [],
    testing: [],
    done: []
  },
  darkMode: true,
  lastUpdated: new Date().toISOString()
};