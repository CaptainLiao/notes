import React from 'react';
import { BrowserRouter, Route, Switch, NavLink } from 'react-router-dom';


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

// page
const AppBarIcon = AsyncLoadable(import('../components/AppBarIcon'));
const MAvatar = AsyncLoadable(import('../components/MAvatar'));
const AsyncApp = AsyncLoadable(import('../App'));

const Links = () => (
  <nav>
    <NavLink exact to="/" activeClassName="selected">Home</NavLink>
    <NavLink to={{pathname: '/about'}} activeClassName="selected">About</NavLink>
    <NavLink to="/locations/5" activeClassName="selected">locations</NavLink>

  </nav>
)

const Haha = () => <div> aaa </div>;
const routers = () => (
  <BrowserRouter>
    <div>
      <Links />

      <Route exact path="/" component={AsyncApp} />
      <Route  path="/locations/:id" component={AppBarIcon} />
      <Route  path="/about" component={MAvatar} />
    </div>
  </BrowserRouter>
)

export default routers;

