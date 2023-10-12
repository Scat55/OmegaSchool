import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

let store = new Vuex.Store({
    state: {
        status: false,
        users: [],
        isAuth: false,
        zadania: [{
            id: 1,
            title: "Сложение двух числе",
            topic: "Математика",
            complexity: "1",
            bodyTask: "sadkjruesiljfkldxlrjk5hjlghjldfxrhljg drg heslrg ersg hkle lkdfxhgljrfhdls ghrfj edrgehsjlgh ldj f gsjl hsdfjl; g dfg jldsf gdr gdf ;lgjdf hgjdfhjgdfl; d gjldfh gkjsdf gjl;dfh gldf nlg hdfgh dflhg ldfhgl hdfg hdfl gsd",
            status: false,
        }, {
            id: 2,
            title: "sdrgrsdgsdrgxdrgxrtdht",
            topic: "Физика",
            complexity: "1",
            bodyTask: "ХРЕН Нужно будет сложить два числа",
            status: false,
        }, {
            id: 3,
            title: "Сложение двух числе",
            topic: "Математика",
            complexity: "1",
            bodyTask: "Нужно будет сложить два числаФЫ",
            status: false,
        }, {
            id: 4,
            title: "Сложение двух числе",
            topic: "Химия",
            complexity: "3",
            bodyTask: "Нужно будет свфыложить два ыфвыфвфывфычисла",
            status: false,
        }, {
            id: 5,
            title: "Сложение двух числе",
            topic: "Математика",
            complexity: "1",
            bodyTask: "Нужно будет сложить два числа",
            status: false,
        }, {
            id: 6,
            title: "Сложение двух числе",
            topic: "Физика",
            complexity: "1",
            bodyTask: "Нужно будет сложить два числа",
            status: false,
        }, {
            id: 7,
            title: "Сложение двух числе",
            topic: "Математика",
            complexity: "1",
            bodyTask: "Нужно будет сложить два числа",
            status: false,
        }, {
            id: 8,
            title: "Сложение двух числе",
            topic: "Химия",
            complexity: "1",
            bodyTask: "Нужно будет сложить два числа",
            status: false,
        },]
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
        GET_USERS_FROM_API({commit}) {
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
