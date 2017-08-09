import React from 'react';
import { BrowserRouter, Route, NavLink } from 'react-router-dom';


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
const Footer = AsyncLoadable(import('../components/footer/footer'));

// 路由映射到组件
const routers = () => (
  <BrowserRouter>
    <div>
      <Route exact path="/" component={AsyncApp} />
      <Route path="/locations/:id" component={AppBarIcon} />
      <Route path="/about" component={MAvatar} />

      <Footer />
    </div>
  </BrowserRouter>
)

export default routers;

