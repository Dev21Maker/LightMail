import React from 'react';
import { Filter } from 'lucide-react';
import { AccountFilter } from './AccountFilter';
import { PriorityFilter } from './PriorityFilter';
import { EmailFilter } from '../../../types/filters';

interface FilterBarProps {
  filters: EmailFilter;
  onFiltersChange: (filters: EmailFilter) => void;
}

export function FilterBar({ filters, onFiltersChange }: FilterBarProps) {
  return (
    <div className="p-4 border-b">
      <div className="flex items-center gap-2 mb-4">
        <Filter className="w-5 h-5 text-gray-500" />
        <h3 className="font-medium">Filters</h3>
      </div>
      
      <div className="space-y-4">
        <AccountFilter
          selectedAccounts={filters.accounts}
          onChange={(accounts) => onFiltersChange({ ...filters, accounts })}
        />
        
        <PriorityFilter
          selectedPriorities={filters.priority}
          onChange={(priority) => onFiltersChange({ ...filters, priority })}
        />
        
        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={filters.showUnread}
              onChange={(e) => onFiltersChange({ ...filters, showUnread: e.target.checked })}
              className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
            />
            <span className="text-sm">Unread only</span>
          </label>
          
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={filters.showAttachments}
              onChange={(e) => onFiltersChange({ ...filters, showAttachments: e.target.checked })}
              className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
            />
            <span className="text-sm">With attachments</span>
          </label>
        </div>
      </div>
    </div>
  );
}