// src/AppRouter.tsx

import React, { FunctionComponent, Suspense } from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import { OverviewPage } from '../pages/OverviewPage/OverviewPage';

const AppRouter: FunctionComponent = () => {
  return (
    <Router>
      <Suspense fallback={<span>Loading...</span>}>
        <Switch>
          <Route path="/" component={OverviewPage}/>
          <Redirect to='/' />
        </Switch>
      </Suspense>
    </Router>
  )
}

export default AppRouter