export type Priority = 'high' | 'medium' | 'low' | 'none';

export interface EmailFilter {
  accounts: string[];
  priority: ('high' | 'medium' | 'low' | 'none')[];
  showUnread: boolean;
  showAttachments: boolean;
}

export interface FilterOption {
  value: string;
  label: string;
  icon?: React.ComponentType<{ className?: string }>;
}