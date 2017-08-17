import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

//code splitting
import DynamicLoad from '../components/dynamicLoad/dynamicLoad';

// page
  // import Home from '../containers/home' 
  // import Article from '../components/article/article'
  // import Lists from '../components/lists/lists'

  let Home = DynamicLoad(import('../containers/home'));
  let Article = DynamicLoad(import('../components/article/article'));
  let Lists = DynamicLoad(import('../components/lists/lists'));


const routes = [
  {
    path: '/',
    isExact: true,
    main: Home
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