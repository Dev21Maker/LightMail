import React, { useState } from 'react';
import { Search, Globe } from 'lucide-react';

interface DomainFormProps {
  onSubmit: (domain: string) => void;
  isLoading: boolean;
}

export function DomainForm({ onSubmit, isLoading }: DomainFormProps) {
  const [domain, setDomain] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (domain.trim()) {
      onSubmit(domain.trim());
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
          <Globe className="w-5 h-5 text-blue-600 dark:text-blue-400" />
        </div>
        <div>
          <h3 className="font-medium text-gray-900 dark:text-gray-100">Add Your Domain</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">Enter your domain to get started</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="domain" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Domain Name
          </label>
          <div className="relative">
            <input
              type="text"
              id="domain"
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              placeholder="yourdomain.com"
              className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400"
              disabled={isLoading}
            />
            {domain && (
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <Search className="w-5 h-5 text-gray-400 dark:text-gray-500" />
              </div>
            )}
          </div>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Make sure you have access to manage DNS records for this domain
          </p>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={!domain.trim() || isLoading}
            className={`px-4 py-2 rounded-lg transition-colors ${
              !domain.trim() || isLoading
                ? 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 text-white'
            }`}
          >
            {isLoading ? 'Verifying...' : 'Add Domain'}
          </button>
        </div>
      </form>
    </div>
  );
}