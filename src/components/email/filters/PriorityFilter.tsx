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
        className="w-full flex items-center justify-between px-3 py-2 border rounded-lg bg-card hover:border-primary-500 transition-colors"
      >
        <span className="text-sm text-foreground">
          {selectedPriorities.length
            ? `${selectedPriorities.length} priority level${selectedPriorities.length > 1 ? 's' : ''}`
            : 'All priorities'}
        </span>
        <ChevronDown className="w-4 h-4 text-muted-foreground" />
      </button>

      {isOpen && (
        <div className="absolute left-0 right-0 mt-1 bg-card text-foreground border rounded-lg shadow-lg">
          {priorityOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => togglePriority(option.value as Priority)}
              className={`flex items-center gap-2 px-4 py-2 w-full text-left rounded-lg transition-colors 
                ${selectedPriorities.includes(option.value as Priority) 
                  ? 'bg-primary text-primary-foreground' 
                  : 'hover:bg-muted hover:text-foreground'}`}
            >
              <option.icon className={`w-4 h-4 ${
                selectedPriorities.includes(option.value as Priority)
                  ? 'text-primary-foreground'
                  : 'text-muted-foreground'
              }`} />
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}