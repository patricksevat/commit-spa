// src/AppRouter.tsx

import React, { FunctionComponent, Suspense } from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import { OverviewPage } from '../pages/OverviewPage/OverviewPage';
import { AppLayout } from '../layouts/AppLayout';

const AppRouter: FunctionComponent = () => {
  return (
    <Router>
      <Suspense fallback={<span>Loading...</span>}>
        <Switch>
          <AppLayout>
            <Route path="/" component={OverviewPage}/>
            <Redirect to='/' />
          </AppLayout>
        </Switch>
      </Suspense>
    </Router>
  )
}

export default AppRouter
