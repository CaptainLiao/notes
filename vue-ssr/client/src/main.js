
import Vue from 'vue'
import VueRouter from 'vue-router'
import store from './store'
import routes from './routes'
import App from './app.vue'

Vue.use(VueRouter);

const router = new VueRouter({
  routes
});

Vue.config.devtools = true;

new Vue({
  router,
  store,
  template: '<App/>',
  components: { App }
}).$mount('#app');
