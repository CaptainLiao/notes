import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import App from '../App'
import Article from '../components/article/article'
import Lists from '../components/lists/lists'

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

export default routers;