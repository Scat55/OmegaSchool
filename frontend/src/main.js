import Vue from 'vue';
import App from './App.vue';
import './assets/styles/styles.scss';
import router from './router/';
import store from './store';
import VueLaTeX2JS from 'latex2vue';
Vue.config.productionTip = false;
Vue.use(VueLaTeX2JS);

new Vue({
  store,
  router,
  render: function (h) {
    return h(App);
  },
}).$mount('#app');
