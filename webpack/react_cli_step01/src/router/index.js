import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

//code splitting
import DynamicLoad from '../components/dynamicLoad/dynamicLoad';


// page

import App from '../app'

const Article = DynamicLoad(import('../components/article/article'));
const Lists = DynamicLoad(import('../components/lists/lists'));


const routes = [
  {
    path: '/',
    isExact: true,
    main: App
  },
  {
    path: '/lists',
    isExact: false,
    main: Lists
  },
  {
    path: '/article',
    isExact: false,
    main: Article
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
    </div>
  </BrowserRouter>
)

export default routers();