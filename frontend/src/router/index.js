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

import AuthCommandPage from '@/views/Auth.vue';
import ComandPage from '@/views/ComandPage.vue';
import ErrorPage from '@/views/ErrorPage.vue';
import taskComand from '@/views/allTaskForComand';
import Manual from '@/views/manualComand';

import Admin from '@/views/Admin';
import AdminRegForm from '@/components/AdminRegForm.vue';
import AuthAdmin from '@/views/AuthAdmin.vue';
import store from '../store/index';
import Feedback from '@/views/Feedback.vue';

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
    path: '/comandPage/:id?',
    component: ComandPage,
  },
  {
    path: '/authCommand',
    component: AuthCommandPage,
  },
  {
    path: '*',
    component: ErrorPage,
  },
  {
    path: '/comandTask',
    component: taskComand,
  },
  {
    path: '/manual',
    component: Manual,
  },
  {
    path: '/admin',
    component: Admin,
    beforeEnter(to, from, next) {
      if (store.state.isAdminAuth) {
        next(true);
      } else {
        next(false);
        next({ path: '/AdminRegForm' });
      }
    },
  },
  {
    path: '/feedback',
    component: Feedback,
  },
  {
    path: '/AdminRegForm',
    component: AdminRegForm,
  },
  {
    path: '/adminAuth',
    component: AuthAdmin,
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
