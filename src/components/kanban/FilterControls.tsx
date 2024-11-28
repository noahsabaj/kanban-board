'use client';

import { Filter, SortAsc, SortDesc, ArrowUpDown } from 'lucide-react';
import { Priority } from '../kanban/types';

export type SortType = 'priority-desc' | 'priority-asc' | 'alphabetical' | 'none';

interface FilterControlsProps {
  selectedPriority: Priority | null;
  onPrioritySelect: (priority: Priority | null) => void;
  sortType: SortType;
  onSortChange: (sort: SortType) => void;
}

const priorities: Priority[] = ['🔥', '⭐', '👍', '📝'];

export const FilterControls = ({
  selectedPriority,
  onPrioritySelect,
  sortType,
  onSortChange
}: FilterControlsProps) => {
  return (
    <div className="flex items-center gap-4 mb-6 bg-[var(--filter-background)] p-3 rounded-lg border border-[var(--card-border)]">
      <div className="flex items-center gap-2">
        <Filter size={18} className="text-[var(--foreground)] opacity-60" />
        <span className="text-sm text-[var(--foreground)] opacity-60">Priority:</span>
        <div className="flex gap-2">
          {priorities.map((priority) => (
            <button
              key={priority}
              onClick={() => onPrioritySelect(selectedPriority === priority ? null : priority)}
              className={`p-2 rounded-md transition-all border
                ${selectedPriority === priority 
                  ? 'bg-purple-500/20 border-purple-500/50 text-purple-500' 
                  : 'bg-[var(--task-background)] border-[var(--task-border)] hover:bg-[var(--task-hover)]'
                }`}
            >
              {priority}
            </button>
          ))}
        </div>
      </div>

      <div className="h-6 w-px bg-[var(--card-border)]" />

      <div className="flex items-center gap-2">
        <ArrowUpDown size={18} className="text-[var(--foreground)] opacity-60" />
        <span className="text-sm text-[var(--foreground)] opacity-60">Sort:</span>
        <select
          value={sortType}
          onChange={(e) => onSortChange(e.target.value as SortType)}
          className={`bg-[var(--task-background)] border border-[var(--task-border)] rounded-md p-2 
                    text-sm text-[var(--foreground)] hover:bg-[var(--task-hover)] transition-all 
                    focus:outline-none focus:ring-1 focus:ring-purple-500/50 appearance-none pl-3 pr-8`}
          style={{
            WebkitAppearance: "none",
            MozAppearance: "none"
          }}
        >
          <option value="priority-desc">Priority: High to Low</option>
          <option value="priority-asc">Priority: Low to High</option>
          <option value="alphabetical">Alphabetical</option>
          <option value="none">Default</option>
        </select>
      </div>
    </div>
  );
};