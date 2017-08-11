import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
//code splitting
import AsyncLoadable from '../components/AsyncLoadable';
// page

const MAvatar = AsyncLoadable(import('../components/MAvatar'));
const AsyncApp = AsyncLoadable(import('../App'));
const Footer = AsyncLoadable(import('../components/footer/footer.js'));

const LearnCar = AsyncLoadable(import('../views/learnCar/learnCar.js'));
const CarTest = AsyncLoadable(import('../views/learnCar/test.js'));


// 每个<Route>默认的props含有一下三个对象：
// history,loacation,match
const NoMatch = ({ history, location }) => (
  <div>
    <h3>404 NOT FOUND</h3>
    <p>No page match for <code>{location.pathname + location.search}</code></p>
  </div>
);

const routes = [
  {
    path: '/',
    isExact: true,
    main: LearnCar
  },
  {
    path: '/locations/:id',
    isExact: false,
    main: AsyncApp
  },
  {
    path: '/about',
    isExact: false,
    main: MAvatar
  },
  {
    path: '/car/test',
    isExact: false,
    main: CarTest
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

