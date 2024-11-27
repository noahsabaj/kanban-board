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
    <div className="flex items-center gap-4 mb-6 bg-[#1a1f24] p-3 rounded-lg border border-gray-700/50">
      <div className="flex items-center gap-2">
        <Filter size={18} className="text-gray-400" />
        <span className="text-sm text-gray-400">Priority:</span>
        <div className="flex gap-2">
          {priorities.map((priority) => (
            <button
              key={priority}
              onClick={() => onPrioritySelect(selectedPriority === priority ? null : priority)}
              className={`p-2 rounded-md transition-all ${
                selectedPriority === priority 
                  ? 'bg-purple-500/20 border-purple-500/50' 
                  : 'bg-[#1e2227] hover:bg-[#262a30]'
              } border border-gray-600/50`}
            >
              {priority}
            </button>
          ))}
        </div>
      </div>

      <div className="h-6 w-px bg-gray-700 mx-2" />

      <div className="flex items-center gap-2">
        <ArrowUpDown size={18} className="text-gray-400" />
        <span className="text-sm text-gray-400">Sort:</span>
        <select
          value={sortType}
          onChange={(e) => onSortChange(e.target.value as SortType)}
          className="bg-[#1e2227] border border-gray-600/50 rounded-md p-2 text-sm text-gray-200
                    hover:bg-[#262a30] transition-all focus:outline-none focus:ring-1 focus:ring-purple-500/50
                    appearance-none pl-3 pr-8 [&>option]:bg-[#1e2227]"
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