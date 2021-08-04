import React from 'react';
import {
  BrowserRouter,
  Switch,
  Route,
} from "react-router-dom";

import './index.scss';

import Titlebar from '@/components/Main/Frame/Titlebar'

export default function Main() {
  // return <div className="frame-main">
  //   <Titlebar />
  // </div>

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/">
          <div className="frame-main">
            <Titlebar />
          </div>
        </Route>
      </Switch>
    </BrowserRouter>
  )
}

