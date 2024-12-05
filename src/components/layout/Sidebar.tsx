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
    <aside className="w-[280px] fixed left-0 top-16 bottom-0 bg-card border-r border-border flex flex-col">
      <div className="flex-1 overflow-y-auto">
        <nav className="p-4 space-y-1">
          {menuItems.map((item) => (
            <button
              key={item.label}
              onClick={() => onViewChange(item.view)}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors 
                ${currentView === item.view 
                  ? 'bg-primary text-white hover:bg-primary/15' 
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                }`}
            >
              <item.icon className={`w-5 h-5 shrink-0 ${currentView === item.view ? 'text-white' : 'text-muted-foreground'}`} />
              <span className="truncate">{t(item.label)}</span>
              {item.view === 'inbox' && item.count && (
                <span className={`ml-auto text-sm px-2 py-0.5 rounded-full
                  ${currentView === item.view
                    ? 'bg-primary text-white'
                    : 'bg-muted/50 text-muted-foreground'
                  }`}
                >
                  {item.count}
                </span>
              )}
              {item.view === 'favorites' && favoritesCount > 0 && (
                <span className={`ml-auto text-sm px-2 py-0.5 rounded-full
                  ${currentView === item.view
                    ? 'bg-primary text-white'
                    : 'bg-muted/50 text-muted-foreground'
                  }`}
                >
                  {favoritesCount}
                </span>
              )}
            </button>
          ))}
        </nav>
      </div>
      <div className="p-4 border-t border-border space-y-1">
        <button
          onClick={() => onViewChange('settings')}
          className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors
            ${currentView === 'settings'
              ? 'bg-primary text-white hover:bg-primary/15'
              : 'text-muted-foreground hover:bg-muted hover:text-foreground'
            }`}
        >
          <Settings className={`w-5 h-5 shrink-0 ${currentView === 'settings' ? 'text-white' : 'text-muted-foreground'}`} />
          <span className="truncate">{t('common.settings')}</span>
        </button>
        <button
          className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
        >
          <HelpCircle className="w-5 h-5 shrink-0" />
          <span className="truncate">{t('common.help')}</span>
        </button>
      </div>
    </aside>
  );
}