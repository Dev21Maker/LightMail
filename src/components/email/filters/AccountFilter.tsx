import React, { useState } from 'react';
import { ChevronDown, Mail } from 'lucide-react';
import { FilterOption } from '../../../types/filters';

interface AccountFilterProps {
  selectedAccounts: string[];
  onChange: (accounts: string[]) => void;
}

const accountOptions: FilterOption[] = [
  { value: 'work', label: 'Work Email', icon: Mail },
  { value: 'personal', label: 'Personal Gmail', icon: Mail },
];

export function AccountFilter({ selectedAccounts, onChange }: AccountFilterProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccount = (value: string) => {
    const newAccounts = selectedAccounts.includes(value)
      ? selectedAccounts.filter((a) => a !== value)
      : [...selectedAccounts, value];
    onChange(newAccounts);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-3 py-2 border rounded-lg bg-card hover:border-primary-500 transition-colors"
      >
        <span className="text-sm text-foreground">
          {selectedAccounts.length
            ? `${selectedAccounts.length} account${selectedAccounts.length > 1 ? 's' : ''} selected`
            : 'All accounts'}
        </span>
        <ChevronDown className="w-4 h-4 text-muted-foreground" />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-card border rounded-lg shadow-lg z-10">
          {accountOptions.map((option) => (
            <label
              key={option.value}
              className="flex items-center gap-3 px-3 py-2 hover:bg-muted cursor-pointer"
            >
              <input
                type="checkbox"
                checked={selectedAccounts.includes(option.value)}
                onChange={() => toggleAccount(option.value)}
                className="rounded border-input text-primary focus:ring-ring"
              />
              {option.icon && <option.icon className="w-4 h-4 text-muted-foreground" />}
              <span className="text-sm text-foreground">{option.label}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
}