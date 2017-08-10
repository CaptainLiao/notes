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

// page
const AppBarIcon = AsyncLoadable(import('../components/AppBarIcon'));
const MAvatar = AsyncLoadable(import('../components/MAvatar'));
const AsyncApp = AsyncLoadable(import('../App'));
const Footer = AsyncLoadable(import('../components/footer/footer'));
const NoMatch = ({ location }) => (
  <div>
    <h4>No component match for <code>{location.pathname + location.search}</code></h4>
  </div>
);

const routes = [
  {
    path: '/',
    isExact: true,
    main: AsyncApp
  },
  {
    path: '/locations/:id',
    isExact: false,
    main: AppBarIcon
  },
  {
    path: '/about',
    isExact: false,
    main: MAvatar
  },
  {
    main: NoMatch
  }
];

// 路由映射到组件
const routers = () => (
  <BrowserRouter>
    <div>
      <Switch>
              {
        routes.map((route, index) => (
          <Route
            key={index}
            path={route.path}
            component={route.main}
            exact={route.isExact} />
        ))
      }
      </Switch>

      <Footer />
    </div>
  </BrowserRouter>
)

export default routers;

