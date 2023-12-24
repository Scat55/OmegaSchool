import Vue from 'vue';
import App from './App.vue';
import './assets/styles/styles.scss';
import router from './router/';
import store from './store';
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'
Vue.use(VueMaterial)

// import Vue2Editor from 'vue2-editor';

Vue.config.productionTip = false;

// Vue.use(Vue2Editor);

new Vue({
  store,
  router,
  render: function (h) {
    return h(App);
  },
}).$mount('#app');
