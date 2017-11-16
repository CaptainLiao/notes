import app from '../app'
import pageNotFound from '../pages/pageNotFound'
import home from '../pages/home/index'

export default [
  {
    path: '/',
    component: home
  }, 
  {
    path: '/home',
    component: home
  }, 
  {
    path: '/page',
    component: pageNotFound
  }
];