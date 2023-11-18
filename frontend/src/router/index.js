import Vue from 'vue';
import VueRouter from 'vue-router';

import ProfilePage from '../views/ProfilePage.vue';
import AuthPage from '../views/AuthPage.vue';
import HomePage from '../views/HomePage.vue';
import TaskPage from '../views/TaskPage.vue';
import TaskDetail from '@/components/TaskDetail.vue';
import taskToExpert from '../views/TaskToExpert';
import AllTaskTeacher from '../views/AllTaskTeacher';
import CheckingTasksPage from '../views/CheckingTasksPage';
import ComandAuth from '@/views/ComandAuth.vue';
import ComandPage from '@/views/ComandPage.vue';
import AuthCom from '../views/AuthCom.vue';

import store from '../store/index';
Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomePage,
  },
  {
    path: '/profile/:id',
    name: 'profile',
    component: ProfilePage,
    beforeEnter(to, from, next) {
      if (store.state.isAuth) {
        next(true);
      } else {
        next(false);
        alert('Войдите в аккаунт');
        next({ path: '/auth' });
      }
    },
  },
  {
    path: '/auth',
    name: 'auth',
    component: AuthPage,
  },
  {
    path: '/task',
    name: 'task',
    component: TaskPage,
    beforeEnter(to, from, next) {
      if (store.state.isAuth) {
        next(true);
      } else {
        next(false);
        alert('Войдите в аккаунт');
        next({ path: '/auth' });
      }
    },
  },
  {
    path: '/task/:id?',
    component: TaskDetail,
    name: 'taskDetail',
  },
  {
    path: '/taskToExpert/:id?',
    component: taskToExpert,
  },
  {
    path: '/taskToTeacher/:id?',
    component: AllTaskTeacher,
  },
  {
    path: '/taskToChek/:id/:userID',
    component: CheckingTasksPage,
  },
  {
    path: '/comand',
    component: ComandAuth,
  },
  {
    path: '/comandPage/:id?',
    component: ComandPage,
  },
  {
    path: '/authCom',
    component: AuthCom,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;

// const router = new VueRouter({
//   mode: 'history',
//   base: process.env.BASE_URL,
//   routes: [
//     {
//       path: '/',
//       name: 'home',
//       component: HomePage,
//     },
//     {
//       path: '/profile',
//       name: 'profile',
//       component: ProfilePage,
//     },
//     {
//       path: '/testProfile/:id',
//       name: 'testProfile',
//       meta: { auth: true },
//       component: testProfile,
//     },
//     {
//       path: '/auth',
//       name: 'auth',
//       component: AuthPage,
//     },
//     {
//       path: '/task',
//       name: 'task',
//       component: TaskPage,
//     },
//     {
//       path: '/task/:id',
//       component: TaskDetail,
//       name: 'taskDetail',
//     },
//   ],
// });

// router.beforeEach((to, from, next) => {});

// export default router;
