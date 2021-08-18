import React, { FunctionComponent } from 'react';
import { CommitStateProvider } from '../hooks/CommitContext';
import { TranslationsProvider } from '../hooks/TranslationContext';
import AppRouter from './AppRouter';

export const App: FunctionComponent = () => {
  return (
    <TranslationsProvider>
      <CommitStateProvider>
        <AppRouter/>
      </CommitStateProvider>
    </TranslationsProvider>
  )
}
