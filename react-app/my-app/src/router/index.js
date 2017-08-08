import App from '../App';
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Loadable from 'react-loadable';
import Loading from '../components/loading.js';

// code splitting
function AsyncLoadable(component) {
  return Loadable({
    loader: () => component,
    loading: Loading,
    delay: 200 
  })
}

const AsyncEssayForm = AsyncLoadable(import('../components/EssayForm'));

const AsyncClock = AsyncLoadable(import('../components/Clock'));

export default () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={App} />
      <Route path="/about" exact component={AsyncClock} />
      <Route path="/inbox" exact component={AsyncEssayForm} />
    </Switch>
  </BrowserRouter>
)
