import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    users: [],
  },
  getters: {
    USERS(state) {
      return state.users;
    },
  },
  mutations: {},
  actions: {
    // Получаем всех пользователей
    SET_USERS_FROM_API: () => {
      axios.get('/userlist').then((resp) => {
        console.log(resp.data);
      });
    },
  },
});
