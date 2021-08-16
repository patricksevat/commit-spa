import React, { createContext, FunctionComponent, useEffect, useState } from 'react';
import { ICommitState, IProviderState } from '../types/commits';
import { nowTimestamp } from '../utils/date-time';
import { CommitService } from '../services/CommitService';

const initialState: IProviderState = {
  error: '',
  commits: [],
  since: nowTimestamp(),
}

export const StateContext = createContext(initialState);

export const StateProvider: FunctionComponent = ({ children }) => {
  const [error, setError] = useState(initialState.error);
  const [commits, setCommits] = useState(initialState.commits);
  const [since, setSince] = useState(initialState.since);
  useEffect(() => {
    async function getAndSetCommits() {
      const commits = await CommitService.fetchCommits(since);
      setCommits(commits);
    }

    getAndSetCommits();
  }, [since])

  return (
    <StateContext.Provider value={{...initialState, setSince}}>
      { children }
    </StateContext.Provider>
  )
}
