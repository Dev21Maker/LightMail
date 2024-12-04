import React, { useState } from 'react';
import { X, Paperclip, Image, Bold, Italic, List, Link } from 'lucide-react';
import { AccountSelector } from './AccountSelector';
import { ConnectedAccount } from '../../types/email';

interface ComposeModalProps {
  onClose: () => void;
}

const connectedAccounts: ConnectedAccount[] = [
  {
    id: '1',
    type: 'google',
    name: 'Work Account',
    email: 'user@company.com',
    connected: '2024-02-15',
  },
  {
    id: '2',
    type: 'google',
    name: 'Personal Account',
    email: 'personal@gmail.com',
    connected: '2024-02-15',
  },
];

export function ComposeModal({ onClose }: ComposeModalProps) {
  const [selectedAccount, setSelectedAccount] = useState<string>(connectedAccounts[0].id);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="w-full max-w-3xl bg-white dark:bg-gray-900 rounded-lg shadow-xl">
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold">New Message</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full"
          >
            <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          </button>
        </div>

        <div className="p-4">
          <div className="space-y-4">
            <div>
              <AccountSelector
                accounts={connectedAccounts}
                selectedId={selectedAccount}
                onSelect={setSelectedAccount}
              />
            </div>

            <div>
              <input
                type="text"
                placeholder="To"
                className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
              />
            </div>

            <div>
              <input
                type="text"
                placeholder="Subject"
                className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
              />
            </div>

            <div>
              <div className="border border-gray-200 dark:border-gray-700 rounded-lg">
                <div className="flex items-center gap-1 p-2 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
                  <button className="p-1.5 hover:bg-gray-200 dark:hover:bg-gray-700 rounded">
                    <Bold className="w-4 h-4 text-gray-700 dark:text-gray-300" />
                  </button>
                  <button className="p-1.5 hover:bg-gray-200 dark:hover:bg-gray-700 rounded">
                    <Italic className="w-4 h-4 text-gray-700 dark:text-gray-300" />
                  </button>
                  <button className="p-1.5 hover:bg-gray-200 dark:hover:bg-gray-700 rounded">
                    <List className="w-4 h-4 text-gray-700 dark:text-gray-300" />
                  </button>
                  <button className="p-1.5 hover:bg-gray-200 dark:hover:bg-gray-700 rounded">
                    <Link className="w-4 h-4 text-gray-700 dark:text-gray-300" />
                  </button>
                </div>
                <textarea
                  rows={12}
                  className="w-full p-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none rounded-b-lg resize-none"
                  placeholder="Write your message..."
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between p-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-2">
            <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded">
              <Paperclip className="w-5 h-5 text-gray-700 dark:text-gray-300" />
            </button>
            <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded">
              <Image className="w-5 h-5 text-gray-700 dark:text-gray-300" />
            </button>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
            >
              Discard
            </button>
            <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg">
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}