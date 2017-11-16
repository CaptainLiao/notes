const app = require('../app');
const pageNotFound = require('../pages/pageNotFound');

module.exports = [{
  path: '/',
  component: app,
  children: [{
    path: '/home',
    component: () => require('../pages/home/index')
  }]
}, {
  path: '*',
  component: pageNotFound
}];