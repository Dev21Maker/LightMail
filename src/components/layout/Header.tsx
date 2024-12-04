import React from 'react';
import { Search, Mail, User, PenSquare } from 'lucide-react';
import { CompactFilterWidget } from '../email/filters/CompactFilterWidget';
import { EmailFilter } from '../../types/filters';

interface HeaderProps {
  onCompose: () => void;
  filters: EmailFilter;
  onFiltersChange: (filters: EmailFilter) => void;
}

export function Header({ onCompose, filters, onFiltersChange }: HeaderProps) {
  return (
    <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 p-4">
      <div className="flex items-center justify-between gap-4">
        <div className="flex-1 relative">
          <div className="relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search emails..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <CompactFilterWidget
            filters={filters}
            onFiltersChange={onFiltersChange}
          />
          
          <button
            onClick={onCompose}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            <PenSquare className="w-4 h-4" />
            <span>Compose</span>
          </button>

          <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full">
            <User className="w-5 h-5 text-gray-700 dark:text-gray-300" />
          </button>
        </div>
      </div>
    </div>
  );
}