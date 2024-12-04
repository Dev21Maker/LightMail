import React from 'react';
import { Reply, Forward, MoreHorizontal, Download, RotateCcw, ShieldCheck } from 'lucide-react';

interface EmailPreviewProps {
  showRestore?: boolean;
  showNotSpam?: boolean;
}

export function EmailPreview({ showRestore, showNotSpam }: EmailPreviewProps) {
  return (
    <div className="h-full bg-white dark:bg-gray-900 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">Project Update - Q1 2024</h2>
        <div className="flex items-center gap-2">
          {showRestore && (
            <button className="px-4 py-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/50 rounded-lg flex items-center gap-2">
              <RotateCcw className="w-5 h-5" />
              Restore
            </button>
          )}
          {showNotSpam && (
            <button className="px-4 py-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/50 rounded-lg flex items-center gap-2">
              <ShieldCheck className="w-5 h-5" />
              Not Spam
            </button>
          )}
          <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full">
            <Reply className="w-5 h-5 text-gray-700 dark:text-gray-300" />
          </button>
          <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full">
            <Forward className="w-5 h-5 text-gray-700 dark:text-gray-300" />
          </button>
          <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full">
            <MoreHorizontal className="w-5 h-5 text-gray-700 dark:text-gray-300" />
          </button>
        </div>
      </div>

      <div className="mb-6">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
            <span className="text-blue-700 dark:text-blue-300 font-medium">AJ</span>
          </div>
          <div>
            <h3 className="font-medium text-gray-900 dark:text-gray-100">Alice Johnson</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">alice@example.com</p>
          </div>
          <span className="ml-auto text-sm text-gray-500 dark:text-gray-400">Mar 15, 2024, 10:30 AM</span>
        </div>
      </div>

      <div className="prose dark:prose-invert max-w-none">
        <p>Hi team,</p>
        <p className="mt-4">
          I wanted to share the latest updates on our Q1 progress. We've made significant strides in several key areas:
        </p>
        <ul className="mt-4">
          <li>Completed the new feature rollout ahead of schedule</li>
          <li>User engagement metrics have increased by 25%</li>
          <li>Successfully resolved all critical bugs from the last sprint</li>
        </ul>
        <p className="mt-4">
          Please review the attached documents for detailed metrics and next steps.
        </p>
        <p className="mt-4">Best regards,<br />Alice</p>
      </div>

      <div className="mt-6 p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Download className="w-5 h-5 text-gray-500 dark:text-gray-400" />
            <div>
              <p className="font-medium text-gray-900 dark:text-gray-100">Q1-2024-Report.pdf</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">2.4 MB</p>
            </div>
          </div>
          <button className="px-4 py-2 text-sm text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/50 rounded-lg">
            Download
          </button>
        </div>
      </div>
    </div>
  );
}