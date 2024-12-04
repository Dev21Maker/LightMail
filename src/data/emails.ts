import { Email } from '../types/email';

export const inboxEmails: Email[] = [
  {
    id: '1',
    from: 'alice@example.com',
    to: 'me@example.com',
    subject: 'Project Update - Q1 2024',
    preview: 'Hi team, I wanted to share the latest updates on our Q1 progress...',
    time: '10:30 AM',
    isStarred: true,
    hasAttachment: true,
    isUnread: true,
    priority: 'high'
  },
  {
    id: '2',
    from: 'bob@example.com',
    to: 'me@example.com',
    subject: 'Team Meeting Notes',
    preview: 'Here are the key points from today\'s team meeting...',
    time: '9:15 AM',
    isStarred: false,
    hasAttachment: false,
    isUnread: true,
    priority: 'medium'
  },
  {
    id: '3',
    from: 'carol@example.com',
    to: 'me@example.com',
    subject: 'Design Review',
    preview: 'Please review the latest design mockups attached...',
    time: 'Yesterday',
    isStarred: false,
    hasAttachment: true,
    isUnread: false,
    priority: 'low'
  }
];

export const sentEmails: Email[] = [
  {
    id: 's1',
    from: 'me@example.com',
    to: 'sarah@example.com',
    subject: 'Re: Project Timeline Update',
    preview: 'Thanks for your email. I\'ve reviewed the timeline and...',
    time: '11:45 AM',
    isStarred: false,
    hasAttachment: false,
    isUnread: false,
    priority: 'medium'
  },
  {
    id: 's2',
    from: 'me@example.com',
    to: 'team@example.com',
    subject: 'Weekly Status Report',
    preview: 'Here\'s my status update for this week...',
    time: 'Yesterday',
    isStarred: false,
    hasAttachment: true,
    isUnread: false,
    priority: 'high'
  }
];

export const deletedEmails: Email[] = [
  {
    id: 't1',
    from: 'Newsletter',
    subject: 'Your Weekly Update',
    preview: 'Check out the latest news and updates from our team...',
    time: '3 days ago',
    isStarred: false,
    hasAttachment: false,
    isUnread: false,
  },
];

export const spamEmails: Email[] = [
  {
    id: 'sp1',
    from: 'Unknown Sender',
    subject: 'You Won!!!',
    preview: 'Congratulations! You have been selected as the winner...',
    time: '1 day ago',
    isStarred: false,
    hasAttachment: false,
    isUnread: true,
  },
];