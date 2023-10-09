import Vue from 'vue';
import Vuelidate from 'vuelidate';
import App from './App.vue';
import './assets/styles/styles.scss';
import router from './router/';
import store from './store';

Vue.config.productionTip = false;

Vue.use(Vuelidate);

new Vue({
  store,
  router,
  render: function (h) {
    return h(App);
  },
}).$mount('#app');
