const app = require('../app');
const pageNotFound = require('../pages/pageNotFound');

module.exports = [{
  path: '/',
  component: app,
  children: [{
    path: '/home',
    component: () => window.requireAsync('vue/pages/home/index')
  }]
}, {
  path: '*',
  component: pageNotFound
}];