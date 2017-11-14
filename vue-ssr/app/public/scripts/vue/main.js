const Vue = require('vue');
const VueRouter = require('vue-router');
const store = require('./store');
const routes = require('./routes');

Vue.use(VueRouter);
const router = new VueRouter({
  routes
});

Vue.config.devtools = true;

new Vue({
  router,
  store
}).$mount('#app');
