import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { emailService } from '../../services/emailService';
import { emailProviders, EmailProviderConfig } from '../../config/emailProviders';

interface ImapAccountDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onAccountAdded: () => void;
}

export function ImapAccountDialog({ isOpen, onClose, onAccountAdded }: ImapAccountDialogProps) {
  const [selectedProvider, setSelectedProvider] = useState<string>('custom');
  const [protocol, setProtocol] = useState<'imap' | 'pop3'>('imap');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    imapHost: '',
    imapPort: '993',
    pop3Host: '',
    pop3Port: '995',
    smtpHost: '',
    smtpPort: '587',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (selectedProvider !== 'custom') {
      const provider = emailProviders[selectedProvider];
      setFormData(prev => ({
        ...prev,
        imapHost: provider.imap.host,
        imapPort: provider.imap.port.toString(),
        pop3Host: provider.pop3.host,
        pop3Port: provider.pop3.port.toString(),
        smtpHost: provider.smtp.host,
        smtpPort: provider.smtp.port.toString(),
      }));
    }
  }, [selectedProvider]);

  const detectProvider = (email: string) => {
    const domain = email.split('@')[1]?.toLowerCase();
    if (domain) {
      for (const [key, provider] of Object.entries(emailProviders)) {
        if (provider.domains.includes(domain)) {
          setSelectedProvider(key);
          return;
        }
      }
    }
    setSelectedProvider('custom');
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const email = e.target.value;
    setFormData(prev => ({ ...prev, email }));
    detectProvider(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const credentials = {
        [protocol]: {
          user: formData.email,
          password: formData.password,
          host: protocol === 'imap' ? formData.imapHost : formData.pop3Host,
          port: parseInt(protocol === 'imap' ? formData.imapPort : formData.pop3Port),
          tls: true,
        },
        smtp: {
          host: formData.smtpHost,
          port: parseInt(formData.smtpPort),
          secure: parseInt(formData.smtpPort) === 465,
          user: formData.email,
          password: formData.password,
        },
      };

      await emailService.addAccount({
        id: Date.now().toString(),
        provider: selectedProvider === 'custom' ? protocol : selectedProvider,
        protocol,
        name: formData.email,
        email: formData.email,
        connected: new Date().toISOString(),
        credentials,
      });

      onAccountAdded();
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to connect to email server');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 dark:bg-black/70 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-900 rounded-lg p-6 w-full max-w-md relative shadow-xl dark:shadow-2xl border border-gray-200 dark:border-gray-700">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">Connect Email Account</h2>

        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 p-3 rounded-lg mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Email Address</label>
            <Input
              type="email"
              value={formData.email}
              onChange={handleEmailChange}
              required
              className="dark:bg-gray-800 dark:text-gray-100 dark:border-gray-700"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Password</label>
            <Input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
              className="dark:bg-gray-800 dark:text-gray-100 dark:border-gray-700"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Email Provider</label>
            <select
              className="w-full rounded-md border border-input p-2 dark:bg-gray-800 dark:text-gray-100 dark:border-gray-700"
              value={selectedProvider}
              onChange={(e) => setSelectedProvider(e.target.value)}
            >
              <option value="custom">Custom Configuration</option>
              {Object.entries(emailProviders).map(([key, provider]) => (
                <option key={key} value={key}>{provider.name}</option>
              ))}
            </select>
          </div>

          {selectedProvider === 'custom' && (
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Protocol</label>
              <div className="flex gap-4 text-gray-700 dark:text-gray-300">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="protocol"
                    value="imap"
                    checked={protocol === 'imap'}
                    onChange={(e) => setProtocol(e.target.value as 'imap' | 'pop3')}
                    className="mr-2 dark:bg-gray-800 dark:border-gray-700"
                  />
                  IMAP
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="protocol"
                    value="pop3"
                    checked={protocol === 'pop3'}
                    onChange={(e) => setProtocol(e.target.value as 'imap' | 'pop3')}
                    className="mr-2 dark:bg-gray-800 dark:border-gray-700"
                  />
                  POP3
                </label>
              </div>
            </div>
          )}

          {selectedProvider === 'custom' && (
            <>
              {protocol === 'imap' ? (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">IMAP Server</label>
                    <Input
                      type="text"
                      value={formData.imapHost}
                      onChange={(e) => setFormData({ ...formData, imapHost: e.target.value })}
                      placeholder="imap.example.com"
                      required
                      className="dark:bg-gray-800 dark:text-gray-100 dark:border-gray-700"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">IMAP Port</label>
                    <Input
                      type="text"
                      value={formData.imapPort}
                      onChange={(e) => setFormData({ ...formData, imapPort: e.target.value })}
                      placeholder="993"
                      required
                      className="dark:bg-gray-800 dark:text-gray-100 dark:border-gray-700"
                    />
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">POP3 Server</label>
                    <Input
                      type="text"
                      value={formData.pop3Host}
                      onChange={(e) => setFormData({ ...formData, pop3Host: e.target.value })}
                      placeholder="pop3.example.com"
                      required
                      className="dark:bg-gray-800 dark:text-gray-100 dark:border-gray-700"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">POP3 Port</label>
                    <Input
                      type="text"
                      value={formData.pop3Port}
                      onChange={(e) => setFormData({ ...formData, pop3Port: e.target.value })}
                      placeholder="995"
                      required
                      className="dark:bg-gray-800 dark:text-gray-100 dark:border-gray-700"
                    />
                  </div>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">SMTP Server</label>
                  <Input
                    type="text"
                    value={formData.smtpHost}
                    onChange={(e) => setFormData({ ...formData, smtpHost: e.target.value })}
                    placeholder="smtp.example.com"
                    required
                    className="dark:bg-gray-800 dark:text-gray-100 dark:border-gray-700"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">SMTP Port</label>
                  <Input
                    type="text"
                    value={formData.smtpPort}
                    onChange={(e) => setFormData({ ...formData, smtpPort: e.target.value })}
                    placeholder="587"
                    required
                    className="dark:bg-gray-800 dark:text-gray-100 dark:border-gray-700"
                  />
                </div>
              </div>
            </>
          )}

          <div className="pt-4">
            <Button 
              type="submit" 
              disabled={loading}
              className="w-full dark:bg-blue-600 dark:hover:bg-blue-700 dark:text-white"
            >
              {loading ? 'Connecting...' : 'Connect Account'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
