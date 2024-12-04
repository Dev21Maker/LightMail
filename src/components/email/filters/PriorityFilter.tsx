import React, { useState } from 'react';
import { ChevronDown, Flag } from 'lucide-react';
import { Priority, FilterOption } from '../../../types/filters';

interface PriorityFilterProps {
  selectedPriorities: Priority[];
  onChange: (priorities: Priority[]) => void;
}

const priorityOptions: FilterOption[] = [
  { value: 'high', label: 'High Priority', icon: Flag },
  { value: 'medium', label: 'Medium Priority', icon: Flag },
  { value: 'low', label: 'Low Priority', icon: Flag },
  { value: 'none', label: 'No Priority', icon: Flag },
];

export function PriorityFilter({ selectedPriorities, onChange }: PriorityFilterProps) {
  const [isOpen, setIsOpen] = useState(false);

  const togglePriority = (value: Priority) => {
    const newPriorities = selectedPriorities.includes(value)
      ? selectedPriorities.filter((p) => p !== value)
      : [...selectedPriorities, value];
    onChange(newPriorities);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-3 py-2 border rounded-lg hover:border-primary-500 transition-colors"
      >
        <span className="text-sm">
          {selectedPriorities.length
            ? `${selectedPriorities.length} priority level${selectedPriorities.length > 1 ? 's' : ''}`
            : 'All priorities'}
        </span>
        <ChevronDown className="w-4 h-4 text-gray-500" />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border rounded-lg shadow-lg z-10">
          {priorityOptions.map((option) => (
            <label
              key={option.value}
              className="flex items-center gap-3 px-3 py-2 hover:bg-gray-50 cursor-pointer"
            >
              <input
                type="checkbox"
                checked={selectedPriorities.includes(option.value as Priority)}
                onChange={() => togglePriority(option.value as Priority)}
                className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
              />
              <Flag className={`w-4 h-4 ${
                option.value === 'high' ? 'text-red-500' :
                option.value === 'medium' ? 'text-yellow-500' :
                option.value === 'low' ? 'text-green-500' :
                'text-gray-400'
              }`} />
              <span className="text-sm">{option.label}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
}