import React, { createContext, useContext, useReducer } from 'react';
import { Email, EmailState } from '../types/email';
import { inboxEmails } from '../data/emails';

type EmailAction = 
  | { type: 'TOGGLE_FAVORITE'; emailId: string }
  | { type: 'SET_EMAILS'; emails: Email[] }
  | { type: 'SELECT_EMAIL'; emailId: string }
  | { type: 'MARK_AS_READ'; emailId: string }
  | { type: 'MARK_AS_UNREAD'; emailId: string }
  | { type: 'TOGGLE_STAR'; emailId: string };

const initialState: EmailState = {
  emails: inboxEmails,
  favorites: [],
  selectedEmail: undefined,
};

function emailReducer(state: EmailState, action: EmailAction): EmailState {
  switch (action.type) {
    case 'TOGGLE_FAVORITE':
      const isFavorite = state.favorites.includes(action.emailId);
      return {
        ...state,
        favorites: isFavorite
          ? state.favorites.filter(id => id !== action.emailId)
          : [...state.favorites, action.emailId],
      };
    case 'SET_EMAILS':
      return {
        ...state,
        emails: action.emails,
      };
    case 'SELECT_EMAIL':
      return {
        ...state,
        selectedEmail: action.emailId,
      };
    case 'MARK_AS_READ':
      return {
        ...state,
        emails: state.emails.map(email =>
          email.id === action.emailId ? { ...email, isUnread: false } : email
        ),
      };
    case 'MARK_AS_UNREAD':
      return {
        ...state,
        emails: state.emails.map(email =>
          email.id === action.emailId ? { ...email, isUnread: true } : email
        ),
      };
    case 'TOGGLE_STAR':
      return {
        ...state,
        emails: state.emails.map(email =>
          email.id === action.emailId ? { ...email, isStarred: !email.isStarred } : email
        ),
      };
    default:
      return state;
  }
}

const EmailContext = createContext<{
  state: EmailState;
  dispatch: React.Dispatch<EmailAction>;
} | null>(null);

export function EmailProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(emailReducer, initialState);

  return (
    <EmailContext.Provider value={{ state, dispatch }}>
      {children}
    </EmailContext.Provider>
  );
}

export function useEmailContext() {
  const context = useContext(EmailContext);
  if (!context) {
    throw new Error('useEmailContext must be used within an EmailProvider');
  }
  return context;
}