
import App from '../App';
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Clock from '../components/Clock.js'
import EssayForm from '../components/EssayForm';

export default () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={App} />
      <Route path="/about" exact component={Clock} />
      <Route path="/inbox" exact component={EssayForm} />
    </Switch>
  </BrowserRouter>
)
