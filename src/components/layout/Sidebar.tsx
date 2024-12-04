import React from 'react';
import { Inbox, Send, Trash, Tag, Plus, Settings, HelpCircle, Star } from 'lucide-react';
import { useEmailContext } from '../../context/EmailContext';
import { useTranslation } from 'react-i18next';

interface SidebarProps {
  currentView: string;
  onViewChange: (view: string) => void;
}

const menuItems = [
  { icon: Inbox, label: 'common.inbox', view: 'inbox', count: 12 },
  { icon: Star, label: 'common.favorites', view: 'favorites' },
  { icon: Send, label: 'common.sent', view: 'sent' },
  { icon: Trash, label: 'common.trash', view: 'trash' },
  { icon: Tag, label: 'common.labels', view: 'labels' },
];

export function Sidebar({ currentView, onViewChange }: SidebarProps) {
  const { state } = useEmailContext();
  const favoritesCount = state.favorites.length;
  const { t } = useTranslation();

  return (
    <aside className="w-[280px] fixed left-0 top-16 bottom-0 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 flex flex-col">
      <div className="flex-1 overflow-y-auto">
        <nav className="p-4">
          {menuItems.map((item) => (
            <button
              key={item.label}
              onClick={() => onViewChange(item.view)}
              className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg 
                ${currentView === item.view 
                  ? 'bg-blue-50 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300' 
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                }`}
            >
              <item.icon className="w-5 h-5" />
              <span>{t(item.label)}</span>
              {item.view === 'inbox' && item.count && (
                <span className={`ml-auto text-sm px-2 rounded-full
                  ${currentView === item.view
                    ? 'bg-blue-100 dark:bg-blue-800 text-blue-700 dark:text-blue-300'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  {item.count}
                </span>
              )}
              {item.view === 'favorites' && favoritesCount > 0 && (
                <span className={`ml-auto text-sm px-2 rounded-full
                  ${currentView === item.view
                    ? 'bg-blue-100 dark:bg-blue-800 text-blue-700 dark:text-blue-300'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  {favoritesCount}
                </span>
              )}
            </button>
          ))}
        </nav>
      </div>
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <button
          onClick={() => onViewChange('settings')}
          className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg 
            ${currentView === 'settings'
              ? 'bg-blue-50 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300'
              : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
            }`}
        >
          <Settings className="w-5 h-5" />
          <span>{t('common.settings')}</span>
        </button>
        <button
          className="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
        >
          <HelpCircle className="w-5 h-5" />
          <span>{t('common.help')}</span>
        </button>
      </div>
    </aside>
  );
}