import React, { useState } from 'react';
import { DomainForm } from './DomainForm';
import { DomainSetup } from './DomainSetup';
import { verifyDomain } from '../../../services/cloudflare';
import { Settings } from 'lucide-react';

export function CustomEmailDomain() {
  const [isLoading, setIsLoading] = useState(false);
  const [domain, setDomain] = useState<string | null>(null);
  const [verificationStatus, setVerificationStatus] = useState<'pending' | 'verified' | 'failed'>('pending');
  const [activeTab, setActiveTab] = useState<'setup' | 'settings'>('setup');

  const dnsRecords = [
    {
      type: 'MX',
      name: '@',
      content: 'mx.mailflow.com',
      status: 'pending' as const,
    },
    {
      type: 'TXT',
      name: '@',
      content: 'v=spf1 include:_spf.mailflow.com ~all',
      status: 'pending' as const,
    },
    {
      type: 'CNAME',
      name: 'mail',
      content: 'mailflow.com',
      status: 'pending' as const,
    },
  ];

  const handleDomainSubmit = async (newDomain: string) => {
    setIsLoading(true);
    try {
      const result = await verifyDomain(newDomain);
      setDomain(newDomain);
      setVerificationStatus(result.success ? 'verified' : 'failed');
    } catch (error) {
      setVerificationStatus('failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Custom Email Domain</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Set up your own domain to send and receive emails
              </p>
            </div>
            <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 text-sm rounded-full">
              Beta
            </span>
          </div>
        </div>

        {domain && (
          <div className="border-b border-gray-200 dark:border-gray-700">
            <nav className="flex">
              <button
                onClick={() => setActiveTab('setup')}
                className={`px-6 py-3 text-sm font-medium border-b-2 -mb-px ${
                  activeTab === 'setup'
                    ? 'border-blue-600 dark:border-blue-400 text-blue-600 dark:text-blue-400'
                    : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
                }`}
              >
                Domain Setup
              </button>
              <button
                onClick={() => setActiveTab('settings')}
                className={`px-6 py-3 text-sm font-medium border-b-2 -mb-px ${
                  activeTab === 'settings'
                    ? 'border-blue-600 dark:border-blue-400 text-blue-600 dark:text-blue-400'
                    : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
                }`}
              >
                Settings
              </button>
            </nav>
          </div>
        )}

        <div className="p-6">
          {!domain ? (
            <DomainForm onSubmit={handleDomainSubmit} isLoading={isLoading} />
          ) : activeTab === 'setup' ? (
            <DomainSetup
              domain={domain}
              verificationStatus={verificationStatus}
              dnsRecords={dnsRecords}
              onReset={() => {
                setDomain(null);
                setVerificationStatus('pending');
              }}
            />
          ) : (
            <div className="space-y-6">
              <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                    <Settings className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-gray-100">Domain Settings</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Configure your domain settings</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100">Default Domain</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Use this domain as default for sending emails</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 dark:bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-100 dark:peer-focus:ring-blue-900 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 dark:after:border-gray-600 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100">Email Forwarding</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Forward emails to another address</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 dark:bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-100 dark:peer-focus:ring-blue-900 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 dark:after:border-gray-600 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}