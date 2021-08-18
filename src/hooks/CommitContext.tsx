import React, { createContext, FunctionComponent, useContext, useEffect, useState } from 'react';
import { ICommitProviderState } from '../types/commits';
import { epochStartTimeStamp, nowTimestamp } from '../utils/date-time';
import { CommitService } from '../services/CommitService';
import { TranslationContext } from './TranslationContext';

const initialState: ICommitProviderState = {
  error: '',
  numberOfPages: undefined,
  currentPage: 1,
  commits: [],
  since: epochStartTimeStamp(),
  until: nowTimestamp(),
  fetching: false,
}

export const CommitContext = createContext(initialState);

export const CommitStateProvider: FunctionComponent = ({ children }) => {
  // Differentiate between unformattedCommits and formatted commits so we can apply translations
  // to commits without having to make another API call retrieving the same commits
  // as Context consumers only consume (formatted) commits there should be no performance penalty for re-rendering
  const [unformattedCommits, setUnformattedCommits] = useState(initialState.commits)
  const [commits, setCommits] = useState(initialState.commits);
  const [fetching, setFetching] = useState(false);
  const [error, setError] = useState(initialState.error);

  const [since, setSince] = useState(initialState.since);
  const [until, setUntil] = useState(initialState.until);
  const [numberOfPages, setNumberOfPages] = useState(initialState.numberOfPages);
  const [currentPage, setCurrentPage] = useState(initialState.currentPage);

  const { language } = useContext(TranslationContext);

  useEffect(() => {
    async function getAndSetCommits() {
      setFetching(true);
      const { commits, error, numberOfPages } = await CommitService.fetchCommits({
        since,
        until,
        page: currentPage
      });
      setNumberOfPages(numberOfPages);
      setError(error);
      setUnformattedCommits(commits);
      setFetching(false);
    }

    getAndSetCommits();
  }, [since, until, currentPage])

  useEffect(() => {
    setCommits(CommitService.formatCommits(unformattedCommits, language))
  }, [language, unformattedCommits])

  return (
    <CommitContext.Provider value={{error, commits, since, setSince, until, setUntil, numberOfPages, currentPage, setCurrentPage, fetching}}>
      { children }
    </CommitContext.Provider>
  )
}
