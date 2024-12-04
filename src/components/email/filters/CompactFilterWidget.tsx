import React, { useState, useEffect, useRef } from 'react';
import { Filter, X, ChevronDown } from 'lucide-react';
import { EmailFilter } from '../../../types/filters';
import { AccountFilter } from './AccountFilter';
import { PriorityFilter } from './PriorityFilter';

interface CompactFilterWidgetProps {
  filters: EmailFilter;
  onFiltersChange: (filters: EmailFilter) => void;
}

export function CompactFilterWidget({ filters, onFiltersChange }: CompactFilterWidgetProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const filterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
        setIsExpanded(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const activeFiltersCount = [
    filters.accounts.length > 0,
    filters.priority.length > 0,
    filters.showUnread,
    filters.showAttachments,
  ].filter(Boolean).length;

  return (
    <div className="relative" ref={filterRef}>
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 ${
          isExpanded 
            ? 'bg-primary-100 text-primary-700 dark:bg-primary-900/50 dark:text-primary-300' 
            : 'hover:bg-gray-100 dark:hover:bg-gray-800'
        }`}
      >
        <Filter className={`w-5 h-5 transition-colors duration-200 ${
          isExpanded 
            ? 'text-primary-600 dark:text-primary-400' 
            : 'text-gray-500 dark:text-gray-400'
        }`} />
        {activeFiltersCount > 0 && (
          <span className={`flex items-center justify-center w-5 h-5 text-xs font-medium rounded-full transition-colors duration-200 ${
            isExpanded
              ? 'bg-primary-200 text-primary-700 dark:bg-primary-800 dark:text-primary-300'
              : 'bg-primary-100 text-primary-600 dark:bg-primary-900/50 dark:text-primary-300'
          }`}>
            {activeFiltersCount}
          </span>
        )}
      </button>

      {isExpanded && (
        <div className="absolute right-0 mt-2 w-72 bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-lg shadow-lg z-50">
          <div className="flex items-center justify-between p-3 border-b">
            <h3 className="font-medium">Filters</h3>
            <button
              onClick={() => setIsExpanded(false)}
              className="p-1 hover:bg-gray-100 rounded-full"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="p-3 space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Account</label>
              <AccountFilter
                selectedAccounts={filters.accounts}
                onChange={(accounts) => onFiltersChange({ ...filters, accounts })}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Priority</label>
              <PriorityFilter
                selectedPriorities={filters.priority}
                onChange={(priority) => onFiltersChange({ ...filters, priority })}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Additional Filters</label>
              <div className="flex flex-col gap-2">
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

          <div className="p-3 bg-gray-50 border-t rounded-b-lg">
            <button
              onClick={() => onFiltersChange({
                accounts: [],
                priority: [],
                showUnread: false,
                showAttachments: false,
              })}
              className="w-full px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              Clear all filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
}