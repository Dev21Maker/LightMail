import React, { useState, useEffect } from 'react';
import { Mail, Github, Mail as GoogleIcon, Trash2, Plus } from 'lucide-react';
import { emailService } from '../../services/emailService';
import { ImapAccountDialog } from './ImapAccountDialog';
import { Button } from '../ui/button';
import type { EmailAccount } from '../../services/emailService';
import { emailProviders } from '../../config/emailProviders';

export function ConnectedAccounts() {
  const [accounts, setAccounts] = useState<EmailAccount[]>([]);
  const [showImapDialog, setShowImapDialog] = useState(false);

  useEffect(() => {
    // Load accounts from emailService
    const loadAccounts = async () => {
      try {
        const accountsList = Array.from(emailService.getAccounts().values());
        setAccounts(accountsList);
      } catch (error) {
        console.error('Failed to load accounts:', error);
      }
    };
    loadAccounts();
  }, []);

  const handleRemoveAccount = async (accountId: string) => {
    try {
      await emailService.removeAccount(accountId);
      setAccounts(accounts.filter(account => account.id !== accountId));
    } catch (error) {
      console.error('Failed to remove account:', error);
    }
  };

  const handleAccountAdded = () => {
    // Refresh the accounts list
    const accountsList = Array.from(emailService.getAccounts().values());
    setAccounts(accountsList);
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'gmail':
        return <GoogleIcon className="w-5 h-5" />;
      case 'github':
        return <Github className="w-5 h-5" />;
      default:
        return <Mail className="w-5 h-5" />;
    }
  };

  return (
    <section className="rounded-lg p-6 border border-gray-200 dark:border-gray-700">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Connected Accounts</h2>
        <Button
          onClick={() => setShowImapDialog(true)}
          className="flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Account
        </Button>
      </div>
      
      <div className="space-y-4">
        {accounts.map((account) => (
          <div key={account.id} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                  {getIcon(account.provider)}
                </div>
                <div>
                  <h3 className="font-medium">{account.name}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{account.email}</p>
                </div>
              </div>
              <button
                onClick={() => handleRemoveAccount(account.id)}
                className="p-2 text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}

        {accounts.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No accounts connected. Click "Add Account" to connect your first email account.
          </div>
        )}
      </div>

      <ImapAccountDialog
        isOpen={showImapDialog}
        onClose={() => setShowImapDialog(false)}
        onAccountAdded={handleAccountAdded}
      />
    </section>
  );
}