import React, { FunctionComponent } from 'react';
import { CommitStateProvider } from '../hooks/CommitContext';
import { AppLayout } from '../layouts/AppLayout';
import { TranslationsProvider } from '../hooks/TranslationContext';
import AppRouter from './AppRouter';

export const App: FunctionComponent = () => {
  return (
    <TranslationsProvider>
      <CommitStateProvider>
        <AppLayout>
          <AppRouter/>
        </AppLayout>
      </CommitStateProvider>
    </TranslationsProvider>
  )
}
