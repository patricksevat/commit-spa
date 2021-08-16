// src/AppRouter.tsx

import React, { FunctionComponent, Suspense } from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import { OverviewPage } from './pages/OverviewPage/OverviewPage';
import { AppLayout } from './layouts/AppLayout';
import { StateProvider } from './hooks/StateContext';

// TODO refactor, AppRouter should just do Routing, create App.tsx
const AppRouter: FunctionComponent = () => {
  return (
    <Router>
        <Suspense fallback={<span>Loading...</span>}>
          <StateProvider>
            <AppLayout>
              <Switch>
                <Route path="/" component={OverviewPage}/>
                <Redirect to='/' />
              </Switch>
            </AppLayout>
          </StateProvider>
        </Suspense>
    </Router>
  )
}

export default AppRouter
