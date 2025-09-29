import vue from '@vitejs/plugin-vue'
import VueRouter from 'unplugin-vue-router/vite'
import vueDevTools from 'vite-plugin-vue-devtools'
import UnoCSS from 'unocss/vite'
import { fontless } from 'fontless'
import generateSitemap from 'vite-ssg-sitemap'
import { fileURLToPath, URL } from 'node:url'

// https://vite.dev/config/
export default {
  server: {
    port: 3000,
  },

  plugins: [
    VueRouter({
      dts: 'src/typed-router.d.ts',
    }),
    vue(),
    vueDevTools(),
    UnoCSS(),
    fontless({
      provider: 'google',
      assets: {},
      defaults: {
        preload: true,
        weights: [400, 500, 600, 700, 800],
        styles: ['normal'],
        fallbacks: {
          'sans-serif': ['Roboto', 'Segoe UI'],
        },
      },
    }),
  ],

  ssgOptions: {
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
}
