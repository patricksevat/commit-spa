import { ICommitProviderState, IFormattedCommit } from '../types/commits';
import { Context } from 'react';
import { TranslationContext } from '../hooks/TranslationContext';

export const languageContextMock = {
  setLanguage: jest.fn(),
  translate: jest.fn(),
  language: jest.fn().mockReturnValue('translated-string'),
}

export function createUseContextMockImplementation(value: ICommitProviderState) {
  return function (context: Context<any>) {
    if(context === TranslationContext) {
      return languageContextMock
    }

    return value;
  }
}

export const initCommitProviderState = {
  commits: [],
  error: '',
  since: '',
  setSince: () => {},
  currentPage: 1,
  setCurrentPage: () => {},
  numberOfPages: 20,
  until: '',
  fetching: false,
  selectedCommit: undefined,
};

export const mockedCommits: IFormattedCommit[] = [{
  sha: '123',
  commit: {
    author: {
      name: 'Patrick',
      date: '2021-08-17T09:11:19.087Z',
    },
    message: 'feat(): awesome',
  },
  html_url: 'https://foo.com/commit123',
  author: {
    login: 'sevatpmc',
    url: 'https://foo.com/sevatpmc',
    avatar_url: '',
  }
}]
