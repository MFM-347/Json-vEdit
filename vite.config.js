import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import generateSitemap from 'vite-ssg-sitemap'
import pluginPurgeCss from '@myelophone/vite-plugin-purgecss'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    pluginPurgeCss({ variables: true }),
  ],
  ssgOptions: {
    beastiesOptions: {
      preload: 'media',
      reduceInlineStyles: false,
    },
    script: 'async',
    formatting: 'minify',
    onFinished() {
      generateSitemap({
      hostname: 'https://json-v-edit.vercel.app/',
      changefreq: 'weekly',
      generateRobotsTxt: true,
      })
    },
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
