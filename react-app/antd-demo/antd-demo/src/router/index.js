import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';


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

const routes = [
  {
    pattern: '/',
    isExact: true,
    main: AsyncApp
  },
  {
    pattern: '/locations/:id',
    isExact: false,
    main: AppBarIcon
  },
  {
    pattern: '/about',
    isExact: false,
    main: MAvatar
  }
];

// 路由映射到组件
const routers = () => (
  <BrowserRouter>
    <div>
      {
        routes.map((route, index) => (
          <Route
            key={index}
            path={route.pattern}
            component={route.main}
            exact={route.isExact} />
        ))
      }

      <Footer />
    </div>
  </BrowserRouter>
)

export default routers;

