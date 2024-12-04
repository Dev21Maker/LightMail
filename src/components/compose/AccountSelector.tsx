import React from 'react';
import { ChevronDown } from 'lucide-react';
import { ConnectedAccount } from '../../types/email';

interface AccountSelectorProps {
  accounts: ConnectedAccount[];
  selectedId: string;
  onSelect: (id: string) => void;
}

export function AccountSelector({ accounts, selectedId, onSelect }: AccountSelectorProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const selectedAccount = accounts.find(acc => acc.id === selectedId) || accounts[0];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 hover:border-blue-500 dark:hover:border-blue-400 transition-colors"
      >
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
            <span className="text-xs font-medium text-blue-700 dark:text-blue-300">
              {selectedAccount.name.charAt(0)}
            </span>
          </div>
          <span className="text-sm text-gray-900 dark:text-gray-100">{selectedAccount.email}</span>
        </div>
        <ChevronDown className="w-4 h-4 text-gray-500 dark:text-gray-400" />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50">
          {accounts.map((account) => (
            <button
              key={account.id}
              onClick={() => {
                onSelect(account.id);
                setIsOpen(false);
              }}
              className="w-full flex items-center gap-2 px-3 py-2 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                <span className="text-xs font-medium text-blue-700 dark:text-blue-300">
                  {account.name.charAt(0)}
                </span>
              </div>
              <span className="text-sm text-gray-900 dark:text-gray-100">{account.email}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}