import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

//code splitting
import Loadable from 'react-loadable';
import Loading from '../loading.js';
function AsyncLoadable(component) {
  return Loadable({
    loader: () => component,
    loading: Loading,
    delay: 300 
  })
}

// const AsyncEssayForm = AsyncLoadable(import('../components/EssayForm'));
// const AsyncClock = AsyncLoadable(import('../components/Clock'));
const AsyncApp = AsyncLoadable(import('../App'));

export default () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={AsyncApp} />
      
    </Switch>
  </BrowserRouter>
)

/* <Route path="/about" exact component={AsyncClock} />
      <Route path="/inbox" exact component={AsyncEssayForm} /> */
