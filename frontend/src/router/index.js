import { createRouter, createWebHistory } from 'vue-router';
import UserAuth from '@/components/UserAuth.vue';
import UserDashboard from '@/components/UserDashboard.vue';

const routes = [
  {
    path: '/user',
    name: 'UserAuth',
    component: UserAuth,
  },
  {
    path: '/userdashboard',
    name: 'UserDashboard',
    component: UserDashboard,
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/user',
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
