import Vue from 'vue';
import Vuelidate from 'vuelidate';
import App from './App.vue';
import './assets/styles/styles.scss';
import router from './router/';
import store from './store';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';

Vue.config.productionTip = false;

Vue.use(Vuelidate);
Vue.use(Vuetify)

new Vue({
  Vuetify,
  store,
  router,
  render: function (h) {
    return h(App);
  },
}).$mount('#app');
