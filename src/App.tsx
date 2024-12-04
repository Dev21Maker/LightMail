import React, { useState } from 'react';
import { Header } from './components/layout/Header';
import { Sidebar } from './components/layout/Sidebar';
import { SentView } from './components/email/views/SentView';
import { TrashView } from './components/email/views/TrashView';
import { FavoritesView } from './components/email/views/FavoritesView';
import { SettingsView } from './components/settings/SettingsView';
import { ComposeModal } from './components/compose/ComposeModal';
import { EmailList } from './components/email/EmailList';
import { EmailPreview } from './components/email/EmailPreview';
import { inboxEmails } from './data/emails';
import { EmailFilter } from './types/filters';
import { EmailProvider } from './context/EmailContext';
import { ThemeProvider } from './context/ThemeContext';
import { Menu } from 'lucide-react';
import { useTranslation } from 'react-i18next';

function AppContent() {
  const [showCompose, setShowCompose] = useState(false);
  const [currentView, setCurrentView] = useState('inbox');
  const [showSidebar, setShowSidebar] = useState(true);
  const [filters, setFilters] = useState<EmailFilter>({
    accounts: [],
    priority: [],
    showUnread: false,
    showAttachments: false,
  });
  const { t } = useTranslation();

  const filteredEmails = inboxEmails.filter((email) => {
    if (filters.showUnread && !email.isUnread) return false;
    if (filters.showAttachments && !email.hasAttachment) return false;
    if (filters.accounts.length && !filters.accounts.includes(email.from || '')) return false;
    if (filters.priority.length && !filters.priority.includes(email.priority || 'none')) return false;
    return true;
  });

  const renderView = () => {
    switch (currentView) {
      case 'sent':
        return <SentView />;
      case 'trash':
        return <TrashView />;
      case 'favorites':
        return <FavoritesView />;
      case 'settings':
        return <SettingsView />;
      default:
        return (
          <div className="grid grid-cols-12 h-full">
            <div className="col-span-4 border-r border-gray-200 dark:border-gray-700">
              <EmailList emails={filteredEmails} />
            </div>
            <div className="col-span-8">
              <EmailPreview />
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <div className="fixed top-0 left-0 right-0 z-10 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center p-4">
          <button
            onClick={() => setShowSidebar(!showSidebar)}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg mr-4"
          >
            <Menu className="w-5 h-5 text-gray-700 dark:text-gray-300" />
          </button>
          <h1 className="text-xl font-semibold text-gray-900 dark:text-white">{t('LightMail')}</h1>
        </div>
      </div>
      <div className="pt-16 flex">
        <div className={`${showSidebar ? 'w-64' : 'w-0'} transition-all duration-300 overflow-hidden`}>
          <Sidebar 
            currentView={currentView}
            onViewChange={setCurrentView}
          />
        </div>
        <div className="flex-1">
          <Header 
            onCompose={() => setShowCompose(true)} 
            filters={filters}
            onFiltersChange={setFilters}
          />
          <main className="h-[calc(100vh-8rem)]">
            {renderView()}
          </main>
        </div>
      </div>
      {showCompose && (
        <ComposeModal onClose={() => setShowCompose(false)} />
      )}
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <EmailProvider>
        <AppContent />
      </EmailProvider>
    </ThemeProvider>
  );
}

export default App;