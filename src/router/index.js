import { createRouter, createWebHistory } from 'vue-router'
import vHome from '@/views/vHome.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: vHome,
    },
    {
      path: '/editor',
      name: 'editor',
      component: () => import('../views/vEditor.vue'),
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import('../views/v404.vue'),
    },
  ],
})

export default router
