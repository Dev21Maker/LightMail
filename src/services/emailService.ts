// import { ImapSimple, connect } from 'imap-simple';
// import { google } from 'googleapis';
import { Config } from '../types/email';
// import * as Pop3Command from 'node-pop3';
import { emailProviders } from '../config/emailProviders';

export interface EmailAccount {
  id: string;
  provider: 'gmail' | 'outlook' | 'imap' | 'pop3' | string;
  name: string;
  email: string;
  connected: string;
  protocol: 'imap' | 'pop3';
  credentials: {
    imap?: {
      user: string;
      password: string;
      host: string;
      port: number;
      tls: boolean;
    };
    pop3?: {
      user: string;
      password: string;
      host: string;
      port: number;
      tls: boolean;
    };
  };
}

export interface Email {
  id: string;
  from: string;
  to: string[];
  subject: string;
  body: string;
  date: Date;
  accountId: string;
}

class EmailService {
  private accounts: Map<string, EmailAccount> = new Map();
  // private connections: Map<string, ImapSimple | Pop3Command> = new Map();

  constructor() {
    this.loadAccountsFromStorage();
  }

  getAccounts(): EmailAccount[] {
    return Array.from(this.accounts.values());
  }

  async addAccount(account: EmailAccount): Promise<void> {
    this.accounts.set(account.id, account);
    this.saveAccountsToStorage();
    // Temporarily disabled connection
    // await this.connectToAccount(account);
  }

  async removeAccount(accountId: string): Promise<void> {
    this.accounts.delete(accountId);
    // this.connections.delete(accountId);
    this.saveAccountsToStorage();
  }

  private saveAccountsToStorage(): void {
    try {
      localStorage.setItem('emailAccounts', JSON.stringify(Array.from(this.accounts.entries())));
    } catch (error) {
      console.error('Failed to save accounts to storage:', error);
    }
  }

  private loadAccountsFromStorage(): void {
    try {
      const stored = localStorage.getItem('emailAccounts');
      if (stored) {
        const accounts = JSON.parse(stored);
        this.accounts = new Map(accounts);
      }
    } catch (error) {
      console.error('Failed to load accounts from storage:', error);
    }
  }

  // Temporarily return mock data
  async fetchEmails(accountId: string, folder: string = 'INBOX', limit: number = 50): Promise<Email[]> {
    return [
      {
        id: '1',
        from: 'test@example.com',
        to: ['user@example.com'],
        subject: 'Test Email',
        body: 'This is a test email while the email service is being configured.',
        date: new Date(),
        accountId: accountId
      }
    ];
  }
}

export const emailService = new EmailService();
