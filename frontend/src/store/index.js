import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

let store = new Vuex.Store({
  state: {
    status: false,
    users: [],
    isAuth: false,
  },
  getters: {
    USERS(state) {
      return state.users;
    },
  },
  mutations: {
    // Создаем функцию добавления пользователей в state
    SET_USERS_TO_STATE: (state, users) => {
      state.users = users;
    },
  },
  actions: {
    // Получаем всех пользователей
    GET_USERS_FROM_API({ commit }) {
      return (
        axios('/userlist', {
          method: 'GET',
        })
          // Описываем мутацию добавления пользователей в state
          .then((users) => {
            commit('SET_USERS_TO_STATE', JSON.parse(users.data));
            return users;
          })
          // Обрабатываем ошибки
          .catch((error) => {
            console.log(error);
            return error;
          })
      );
    },
  },
});
export default store;
