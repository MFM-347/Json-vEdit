import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import Sitemap from 'vite-plugin-sitemap'
import pluginPurgeCss from '@myelophone/vite-plugin-purgecss'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    Sitemap({
      hostname: 'https://json-v-edit.vercel.app/',
      changefreq: 'weekly',
      generateRobotsTxt: true,
      // dynamicRoutes: ['/editor', '/about'],
    }),
    pluginPurgeCss({ variables: true }),
  ],
  ssgOptions: {
    beastiesOptions: {
      preload: 'media',
    },
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
