export interface EmailProviderConfig {
  name: string;
  domains: string[];
  icon?: string;
  imap: {
    host: string;
    port: number;
    secure: boolean;
  };
  pop3: {
    host: string;
    port: number;
    secure: boolean;
  };
  smtp: {
    host: string;
    port: number;
    secure: boolean;
  };
}

export const emailProviders: { [key: string]: EmailProviderConfig } = {
  gmail: {
    name: 'Gmail',
    domains: ['gmail.com', 'googlemail.com'],
    imap: {
      host: 'imap.gmail.com',
      port: 993,
      secure: true,
    },
    pop3: {
      host: 'pop.gmail.com',
      port: 995,
      secure: true,
    },
    smtp: {
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
    },
  },
  outlook: {
    name: 'Outlook',
    domains: ['outlook.com', 'hotmail.com', 'live.com'],
    imap: {
      host: 'outlook.office365.com',
      port: 993,
      secure: true,
    },
    pop3: {
      host: 'outlook.office365.com',
      port: 995,
      secure: true,
    },
    smtp: {
      host: 'smtp.office365.com',
      port: 587,
      secure: false,
    },
  },
  yahoo: {
    name: 'Yahoo Mail',
    domains: ['yahoo.com', 'yahoo.co.uk', 'yahoo.co.jp'],
    imap: {
      host: 'imap.mail.yahoo.com',
      port: 993,
      secure: true,
    },
    pop3: {
      host: 'pop.mail.yahoo.com',
      port: 995,
      secure: true,
    },
    smtp: {
      host: 'smtp.mail.yahoo.com',
      port: 587,
      secure: false,
    },
  },
  aol: {
    name: 'AOL Mail',
    domains: ['aol.com'],
    imap: {
      host: 'imap.aol.com',
      port: 993,
      secure: true,
    },
    pop3: {
      host: 'pop.aol.com',
      port: 995,
      secure: true,
    },
    smtp: {
      host: 'smtp.aol.com',
      port: 587,
      secure: false,
    },
  },
  icloud: {
    name: 'iCloud Mail',
    domains: ['icloud.com', 'me.com', 'mac.com'],
    imap: {
      host: 'imap.mail.me.com',
      port: 993,
      secure: true,
    },
    pop3: {
      host: 'pop.mail.me.com',
      port: 995,
      secure: true,
    },
    smtp: {
      host: 'smtp.mail.me.com',
      port: 587,
      secure: false,
    },
  },
};
