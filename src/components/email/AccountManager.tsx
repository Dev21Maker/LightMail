import React, { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { emailService } from '../../services/emailService';
import { EmailAccount } from '../../types/email';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Card } from '../ui/card';

export const AccountManager: React.FC = () => {
  const { isAuthenticated, loginWithPopup } = useAuth0();
  const [accounts, setAccounts] = useState<EmailAccount[]>([]);
  const [showAddAccount, setShowAddAccount] = useState(false);
  const [imapConfig, setImapConfig] = useState({
    host: '',
    port: '993',
    user: '',
    password: '',
  });

  const handleGmailConnect = async () => {
    if (!isAuthenticated) {
      await loginWithPopup({
        scope: 'email https://www.googleapis.com/auth/gmail.readonly',
      });
    }
    // Gmail OAuth flow would continue here
  };

  const handleImapConnect = async () => {
    try {
      const newAccount: EmailAccount = {
        id: Date.now().toString(),
        type: 'email',
        provider: 'imap',
        name: imapConfig.user,
        email: imapConfig.user,
        connected: new Date().toISOString(),
        credentials: {
          imap: {
            user: imapConfig.user,
            password: imapConfig.password,
            host: imapConfig.host,
            port: parseInt(imapConfig.port),
            tls: true,
          },
        },
      };

      await emailService.addAccount(newAccount);
      setAccounts([...accounts, newAccount]);
      setShowAddAccount(false);
      setImapConfig({ host: '', port: '993', user: '', password: '' });
    } catch (error) {
      console.error('Failed to connect IMAP account:', error);
      // Handle error appropriately
    }
  };

  return (
    <div className="p-4 space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Email Accounts</h2>
        <Button onClick={() => setShowAddAccount(true)}>Add Account</Button>
      </div>

      {showAddAccount && (
        <Card className="p-4 space-y-4">
          <div className="space-y-4">
            <Button onClick={handleGmailConnect} className="w-full">
              Connect Gmail Account
            </Button>

            <div className="border-t my-4" />

            <h3 className="font-semibold">Connect IMAP Account</h3>
            <div className="space-y-2">
              <Input
                placeholder="IMAP Server (e.g., imap.gmail.com)"
                value={imapConfig.host}
                onChange={(e) => setImapConfig({ ...imapConfig, host: e.target.value })}
              />
              <Input
                placeholder="Port (default: 993)"
                value={imapConfig.port}
                onChange={(e) => setImapConfig({ ...imapConfig, port: e.target.value })}
              />
              <Input
                placeholder="Email"
                value={imapConfig.user}
                onChange={(e) => setImapConfig({ ...imapConfig, user: e.target.value })}
              />
              <Input
                type="password"
                placeholder="Password"
                value={imapConfig.password}
                onChange={(e) => setImapConfig({ ...imapConfig, password: e.target.value })}
              />
              <Button onClick={handleImapConnect} className="w-full">
                Connect IMAP Account
              </Button>
            </div>
          </div>
        </Card>
      )}

      <div className="space-y-2">
        {accounts.map((account) => (
          <Card key={account.id} className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-semibold">{account.name}</h3>
                <p className="text-sm text-gray-500">{account.email}</p>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">
                  Sync
                </Button>
                <Button variant="outline" size="sm">
                  Remove
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
