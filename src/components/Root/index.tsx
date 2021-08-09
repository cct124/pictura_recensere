import React from 'react';
import { HashRouter, Switch, Route } from "react-router-dom";

import './index.scss';

import Main from '@/components/Main'
import CreateCanvas from '@/components/CreateCanvas'

export default function Root() {
  return (
    <HashRouter>
      <Switch>
        <Route exact path="/">
          <Main />
        </Route>
        <Route exact path="/CreateCanvas">
          <CreateCanvas />
        </Route>
      </Switch>
    </HashRouter>
  )
}

