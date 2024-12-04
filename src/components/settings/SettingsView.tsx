import React from 'react';
import { ConnectedAccounts } from './ConnectedAccounts';
import { CustomEmail } from './CustomEmail';
import { GeneralSettings } from './GeneralSettings';
import { NotificationSettings } from './NotificationSettings';

export function SettingsView() {
  return (
    <div className="max-w-4xl mx-auto py-8 px-6">
      <h1 className="text-2xl font-semibold mb-6">Settings</h1>
      
      <div className="space-y-8">
        <GeneralSettings />
        <ConnectedAccounts />
        <CustomEmail />
        <NotificationSettings />
      </div>
    </div>
  );
}