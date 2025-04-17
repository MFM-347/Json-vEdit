import './style.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.min.css'
import App from './App.vue'
import { ViteSSG } from 'vite-ssg'
import vHome from '@/pages/vHome.vue'

export const createApp = ViteSSG(App, {
  routes: [
    {
      path: '/',
      name: 'home',
      component: vHome,
    },
    {
      path: '/editor',
      name: 'editor',
      component: () => import('@/pages/vEditor.vue'),
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('@/pages/vAbout.vue'),
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import('@/pages/v404.vue'),
    },
  ],
  base: import.meta.env.BASE_URL,
})
