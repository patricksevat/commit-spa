import React, { createContext, FunctionComponent, useContext, useEffect, useState } from 'react';
import { ICommitProviderState } from '../types/commits';
import { nowTimestamp } from '../utils/date-time';
import { CommitService } from '../services/CommitService';
import { TranslationContext } from './TranslationContext';

const initialState: ICommitProviderState = {
  error: '',
  commits: [],
  since: nowTimestamp(),
}

export const CommitContext = createContext(initialState);

export const CommitStateProvider: FunctionComponent = ({ children }) => {
  const [error, setError] = useState(initialState.error);
  const [commits, setCommits] = useState(initialState.commits);
  const [since, setSince] = useState(initialState.since);
  const { language } = useContext(TranslationContext);

  useEffect(() => {
    async function getAndSetCommits() {
      const { commits, error } = await CommitService.fetchCommits(since);
      setError(error);
      setCommits(CommitService.formatCommits(commits, language));
    }

    getAndSetCommits();
    // TODO since won't be enough, we will probably also need pagination
  }, [since, language])

  return (
    <CommitContext.Provider value={{error, commits, since, setSince}}>
      { children }
    </CommitContext.Provider>
  )
}
