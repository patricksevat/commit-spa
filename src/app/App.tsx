import React, { FunctionComponent } from 'react';
import { StateProvider } from '../hooks/StateContext';
import { AppLayout } from '../layouts/AppLayout';
import { TranslationsProvider } from '../hooks/TranslationContext';
import AppRouter from './AppRouter';

export const App: FunctionComponent = () => {
  return (
    <TranslationsProvider>
      <StateProvider>
        <AppLayout>
          <AppRouter/>
        </AppLayout>
      </StateProvider>
    </TranslationsProvider>
  )
}
