import { createRouter, createWebHashHistory } from 'vue-router';
import Home from '../views/Home.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/result/:item/:city',
    name: 'Result',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Result.vue'),
  },
  {
    path: '/hotel',
    name: 'Hotel',
    component: () => import('../views/Hotel.vue'),
  },
  {
    path: '/traffic',
    name: 'Traffic',
    component: () => import('../views/Traffic.vue'),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
