import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import Temp from "@/store/TempBD/Temp";

Vue.use(Vuex);

let store = new Vuex.Store({
    state: {
        status: false,
        users: [],
        isAuth: localStorage.getItem('local'),
        Temp,
    },
    getters: {
        USERS(state) {
            return state.users;
        },
        // Задания которые на проверке
        filterCheckedTask: (state) => filter =>{
            return state.Temp.addTask.filter(task => task.statusCheck === filter)
        }
    },
    mutations: {
        // Создаем функцию добавления пользователей в state
        SET_USERS_TO_STATE: (state, users) => {
            state.users = users;
        },
    },
    actions: {
        // Получаем всех пользователей
        GET_USERS_FROM_API({commit}) {
            return (
                axios('/api/user_list', {
                    method: 'GET',
                })
                    // Описываем мутацию добавления пользователей в state
                    .then((users) => {
                        commit('SET_USERS_TO_STATE', users.data);
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
