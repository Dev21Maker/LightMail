import React from 'react';
import { Check, AlertCircle, RotateCw, Copy } from 'lucide-react';

interface DomainSetupProps {
  domain: string;
  verificationStatus: 'pending' | 'verified' | 'failed';
  dnsRecords: DNSRecord[];
  onReset: () => void;
}

interface DNSRecord {
  type: string;
  name: string;
  content: string;
  status: 'pending' | 'verified' | 'failed';
}

export function DomainSetup({ domain, verificationStatus, dnsRecords, onReset }: DomainSetupProps) {
  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700">
        <div>
          <h3 className="font-medium text-gray-900 dark:text-gray-100">{domain}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">Domain verification status</p>
        </div>
        <div className="flex items-center gap-4">
          <div className={`flex items-center gap-2 ${
            verificationStatus === 'verified' ? 'text-green-600 dark:text-green-400' : 
            verificationStatus === 'failed' ? 'text-red-600 dark:text-red-400' : 'text-yellow-600 dark:text-yellow-400'
          }`}>
            {verificationStatus === 'verified' ? (
              <Check className="w-5 h-5" />
            ) : (
              <AlertCircle className="w-5 h-5" />
            )}
            <span className="text-sm font-medium capitalize">{verificationStatus}</span>
          </div>
          {verificationStatus === 'failed' && (
            <button
              onClick={onReset}
              className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
            >
              <RotateCw className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="font-medium text-gray-900 dark:text-gray-100">Required DNS Records</h3>
        <div className="border border-gray-200 dark:border-gray-700 rounded-lg divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-gray-900">
          {dnsRecords.map((record, index) => (
            <div key={index} className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-900 dark:text-gray-100">{record.type} Record</span>
                <span className={`text-sm ${
                  record.status === 'verified' ? 'text-green-600 dark:text-green-400' : 
                  record.status === 'failed' ? 'text-red-600 dark:text-red-400' : 'text-yellow-600 dark:text-yellow-400'
                }`}>
                  {record.status === 'verified' ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    <AlertCircle className="w-4 h-4" />
                  )}
                </span>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500 dark:text-gray-400">Name:</span>
                  <div className="flex items-center gap-2 flex-1">
                    <code className="px-2 py-1 bg-gray-50 dark:bg-gray-800 rounded text-sm text-gray-900 dark:text-gray-100 flex-1">{record.name}</code>
                    <button
                      onClick={() => handleCopy(record.name)}
                      className="p-1.5 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition-colors"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500 dark:text-gray-400">Value:</span>
                  <div className="flex items-center gap-2 flex-1">
                    <code className="px-2 py-1 bg-gray-50 dark:bg-gray-800 rounded text-sm text-gray-900 dark:text-gray-100 flex-1">{record.content}</code>
                    <button
                      onClick={() => handleCopy(record.content)}
                      className="p-1.5 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition-colors"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}