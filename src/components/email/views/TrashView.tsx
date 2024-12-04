import React from 'react';
import { EmailList } from '../EmailList';
import { EmailPreview } from '../EmailPreview';
import { deletedEmails } from '../../../data/emails';

export function TrashView() {
  return (
    <div className="flex-1 grid grid-cols-12">
      <div className="col-span-4 h-[calc(100vh-64px)]">
        <EmailList 
          emails={deletedEmails} 
          view="trash"
          showRestore={true}
        />
      </div>
      <div className="col-span-8 h-[calc(100vh-64px)]">
        <EmailPreview showRestore={true} />
      </div>
    </div>
  );
}