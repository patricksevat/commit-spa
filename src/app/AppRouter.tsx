// src/AppRouter.tsx

import React, { FunctionComponent, Suspense } from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import { OverviewPage } from '../pages/OverviewPage/OverviewPage'
import { AppLayout } from '../layouts/AppLayout'
import { DetailPage } from '../pages/DetailPage/DetailPage'

const AppRouter: FunctionComponent = () => {
  return (
    <Router>
      <Suspense fallback={<span>Loading...</span>}>
        <AppLayout>
          <Switch>
            <Route path="/" exact component={OverviewPage} />
            <Route path="/commit/:id" exact component={DetailPage} />
            <Redirect to="/" />
          </Switch>
        </AppLayout>
      </Suspense>
    </Router>
  )
}

export default AppRouter
