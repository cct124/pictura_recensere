import React from 'react';
import { HashRouter, Switch, Route } from "react-router-dom";

import './index.scss';

import Main from '@/components/Main'
import CreateCanvas from '@/components/CreateCanvas'

export default function Root() {
  // return <div className="frame-main">
  //   <Titlebar />
  // </div>
  console.log(window.location);

  return (
    <HashRouter>
      <Switch>
        <Route exact path="/" component={Main} />
        <Route exact path="/one" component={CreateCanvas} />
      </Switch>
    </HashRouter>
  )
}

