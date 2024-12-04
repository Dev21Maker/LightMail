import React from 'react';
import { EmailList } from '../EmailList';
import { EmailPreview } from '../EmailPreview';
import { useEmailContext } from '../../../context/EmailContext';

export function FavoritesView() {
  const { state } = useEmailContext();
  const favoriteEmails = state.emails.filter(email => state.favorites.includes(email.id));

  return (
    <div className="flex-1 grid grid-cols-12">
      <div className="col-span-4 h-[calc(100vh-64px)]">
        <EmailList 
          emails={favoriteEmails} 
          view="favorites"
        />
      </div>
      <div className="col-span-8 h-[calc(100vh-64px)]">
        <EmailPreview />
      </div>
    </div>
  );
}