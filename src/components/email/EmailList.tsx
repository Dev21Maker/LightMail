import React from 'react';
import { Star, Paperclip, RotateCcw, Flag } from 'lucide-react';
import { Email } from '../../types/email';
import { useEmailContext } from '../../context/EmailContext';

interface EmailListProps {
  emails: Email[];
  view?: 'inbox' | 'sent' | 'trash' | 'favorites';
  showRestore?: boolean;
}

export function EmailList({ emails, view = 'inbox', showRestore }: EmailListProps) {
  const { state, dispatch } = useEmailContext();

  const handleStarClick = (emailId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch({ type: 'TOGGLE_FAVORITE', emailId });
  };

  return (
    <div className="h-full overflow-y-auto border-r border-gray-200 dark:border-gray-700">
      {emails.map((email) => (
        <div
          key={email.id}
          className={`
            flex items-center gap-2 p-2 cursor-pointer
            hover:bg-gray-50 dark:hover:bg-gray-800
            ${email.isUnread ? 'font-semibold bg-blue-50 dark:bg-blue-900/20' : ''}
            ${state.selectedEmail === email.id ? 'bg-blue-100 dark:bg-blue-900/40' : ''}
            border-b border-gray-100 dark:border-gray-800
          `}
          onClick={() => dispatch({ type: 'SELECT_EMAIL', emailId: email.id })}
        >
          <div className="flex-shrink-0 flex items-center gap-1">
            <button
              onClick={(e) => handleStarClick(email.id, e)}
              className={`p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700
                ${state.favorites.includes(email.id) ? 'text-yellow-500' : 'text-gray-400'}
              `}
            >
              <Star className="w-4 h-4" />
            </button>
            {email.priority === 'high' && (
              <Flag className="w-4 h-4 text-red-500" />
            )}
            {email.hasAttachment && (
              <Paperclip className="w-4 h-4 text-gray-400" />
            )}
            {showRestore && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  // Handle restore
                }}
                className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <RotateCcw className="w-4 h-4 text-gray-400" />
              </button>
            )}
          </div>
          
          <div className="min-w-0 flex-1">
            <div className="flex justify-between items-center text-sm">
              <span className="truncate">{view === 'sent' ? email.to : email.from}</span>
              <span className="text-xs text-gray-500 dark:text-gray-400 flex-shrink-0">
                {email.time}
              </span>
            </div>
            <div className="text-sm truncate">{email.subject}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400 truncate">
              {email.preview}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}