import { fileURLToPath, URL } from 'node:url'

import VueRouter from 'unplugin-vue-router/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'

import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

import UnoCSS from 'unocss/vite'
import { fontless } from 'fontless'

import generateSitemap from 'vite-ssg-sitemap'

// https://vite.dev/config/
export default {
  server: {
    port: 3000,
  },

  plugins: [
    VueRouter({
      dts: 'src/typed-router.d.ts',
    }),
    AutoImport({
      dts: 'src/auto-imports.d.ts',
      imports: ['vue', 'vue-router', { '@vueuse/core': ['useColorMode'] }],
      dirs: ['src/composables'],
      viteOptimizeDeps: true,
      vueTemplate: true,
    }),
    Components({
      dts: 'src/components.d.ts',
      resolvers: [IconsResolver({ prefix: '' })],
    }),
    Icons({
      autoInstall: true,
    }),

    vue(),
    vueDevTools(),

    UnoCSS(),
    fontless({
      defaults: {
        preload: true,
        weights: [400, 500, 600, 700, 800],
        styles: ['normal', 'italic'],
        fallbacks: {
          'sans-serif': ['Roboto', 'Segoe UI'],
        },
      },
      assets: {
        prefix: '/_fonts',
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
