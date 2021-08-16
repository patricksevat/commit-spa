import React, { createContext, FunctionComponent, useEffect, useState } from 'react';
import { IProviderState } from '../types/commits';
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
      const { commits, error } = await CommitService.fetchCommits(since);
      setError(error);
      setCommits(commits);
    }

    getAndSetCommits();
    // TODO since won't be enough, we will probably also need pagination
  }, [since])

  return (
    <StateContext.Provider value={{error, commits, since, setSince}}>
      { children }
    </StateContext.Provider>
  )
}
