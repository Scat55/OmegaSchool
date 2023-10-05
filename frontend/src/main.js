import Vue from 'vue';
import App from './App.vue';
import './assets/styles/styles.scss';
import store from './store';

Vue.config.productionTip = false;

new Vue({
  store,
  render: function (h) {
    return h(App);
  },
}).$mount('#app');
