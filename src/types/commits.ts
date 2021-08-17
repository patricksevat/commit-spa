import { Iso8601Timestamp, LocaleFormattedDate } from './date-time';
import { Dispatch, SetStateAction } from 'react';

export interface ICommit {
  sha: string,
  commit: {
    author: {
      name: string,
      date: Iso8601Timestamp
    },
    message: string,
  },
  html_url: string,
  author: {
    login: string, // username
    url: string,
    avatar_url: string
  }
}

export interface IFormattedCommit extends ICommit {
  commit: {
    author: {
      name: string,
      date: Iso8601Timestamp,
      formattedDate?: LocaleFormattedDate
    },
    message: string,
  }
}

export interface ICommitState {
  error: string,
  commits: ICommit[],
  since: Iso8601Timestamp,
}

export interface IProviderState extends ICommitState {
  setSince?: Dispatch<SetStateAction<string>>;
  commits: IFormattedCommit[],
}
