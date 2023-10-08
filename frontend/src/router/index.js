import Vue from 'vue';
import VueRouter from 'vue-router';

import ProfilePage from '../views/ProfilePage.vue';
import AuthPage from '../views/AuthPage.vue';
import HomePage from '../views/HomePage.vue';
import TaskPage from "@/views/TaskPage.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'nome',
    component: HomePage,
  },
  {
    path: '/profile',
    name: 'profile',
    component: ProfilePage,
  },
  {
    path: '/auth',
    name: 'auth',
    component: AuthPage,
  },
  {
    path: '/tasks',
    name: 'tasks',
    component: TaskPage,
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
