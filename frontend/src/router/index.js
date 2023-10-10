import Vue from 'vue';
import VueRouter from 'vue-router';

import ProfilePage from '../views/ProfilePage.vue';
import AuthPage from '../views/AuthPage.vue';
import HomePage from '../views/HomePage.vue';
import TaskPage from '../views/TaskPage.vue';
import TaskDetail from '@/components/TaskDetail.vue';
import testProfile from '@/views/testProfile.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomePage,
  },
  {
    path: '/profile',
    name: 'profile',
    component: ProfilePage,
  },
  {
    path: '/testProfile/:id',
    name: 'testProfile',
    component: testProfile,
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
  },
  {
    path: '/task/:id',
    component: TaskDetail,
    name: 'taskDetail',
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
