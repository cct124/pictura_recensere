import React from 'react';
import { HashRouter, Switch, Route } from "react-router-dom";

import './index.scss';

import Main from '@/components/Main'
import CreateCanvas from '@/components/CreateCanvas';
import ColorPicker from '@/components/ColorPicker'

/**
 * 页面根组件 用于 react-router 的控制
 * @returns 
 */
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
        <Route exact path="/ColorPicker">
          <ColorPicker />
        </Route>
      </Switch>
    </HashRouter>
  )
}

