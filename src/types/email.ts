export interface Email {
  id: string;
  from?: string;
  to?: string;
  subject: string;
  preview: string;
  time: string;
  isStarred: boolean;
  hasAttachment: boolean;
  isUnread: boolean;
  priority?: 'high' | 'medium' | 'low' | 'none';
}

export interface EmailState {
  emails: Email[];
  favorites: string[];
  selectedEmail?: string;
}

export interface Config {
  user: string;
  password: string;
  host: string;
  port: number;
  tls: boolean;
}

export interface OAuthCredentials {
  clientId: string;
  clientSecret: string;
  redirectUri: string;
  tokens: {
    access_token: string;
    refresh_token: string;
    scope: string;
    token_type: string;
    expiry_date: number;
  };
}

export interface EmailAccount {
  id: string;
  provider: 'gmail' | 'outlook' | 'imap' | 'pop3';
  name: string;
  email: string;
  connected: string;
  protocol: 'imap' | 'pop3';
  credentials: Config | OAuthCredentials;
}