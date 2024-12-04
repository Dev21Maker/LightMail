import React from 'react';
import { EmailList } from '../EmailList';
import { EmailPreview } from '../EmailPreview';
import { spamEmails } from '../../../data/emails';

export function SpamView() {
  return (
    <div className="flex-1 grid grid-cols-12">
      <div className="col-span-4 h-[calc(100vh-64px)]">
        <EmailList 
          emails={spamEmails} 
          view="spam"
          showNotSpam={true}
        />
      </div>
      <div className="col-span-8 h-[calc(100vh-64px)]">
        <EmailPreview showNotSpam={true} />
      </div>
    </div>
  );
}