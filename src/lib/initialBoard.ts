import { BoardState } from "@/components/kanban/types";

export const emptyBoard: BoardState = {
  backlog: [],
  todo: [],
  inProgress: [],
  testing: [],
  done: []
};