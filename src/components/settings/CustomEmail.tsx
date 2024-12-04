import React from 'react';
import { Construction } from 'lucide-react';

export function CustomEmail() {
  return (
    <section className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Custom Email Domain</h2>
        <span className="px-3 py-1 bg-primary-50 text-primary-600 text-sm rounded-full">
          Coming Soon
        </span>
      </div>
      
      <div className="border-2 border-dashed rounded-lg p-8 text-center">
        <Construction className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-700 mb-2">
          Custom Email Domains Coming Soon
        </h3>
        <p className="text-gray-500 max-w-md mx-auto">
          Soon you'll be able to use your own domain for sending and receiving emails. 
          Get notified when this feature becomes available.
        </p>
        <button className="mt-4 px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
          Join Waitlist
        </button>
      </div>
    </section>
  );
}