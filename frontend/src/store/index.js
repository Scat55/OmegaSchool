import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    status: false,
  },
  getters: {
    STATUS(state) {
      return state.status;
    },
  },
  mutations: {},
  actions: {},
});
