import path from 'path'
import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import Pages from 'vite-plugin-pages'
import WindiCSS from 'vite-plugin-windicss'
import VueComponents from 'unplugin-vue-components/vite'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import AutoImport from 'unplugin-auto-import/vite'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@/': `${path.resolve(__dirname, 'src')}/`,
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'https://shared-tw.herokuapp.com',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, ''),
      },
    },
  },
  plugins: [
    Vue(),
    Pages(),
    Icons(),
    AutoImport({
      imports: [
        'vue',
        'vue-router',
      ],
      dts: true,
    }),
    VueComponents({
      dts: true,
      resolvers: [
        IconsResolver({
          componentPrefix: '',
        }),
      ],
    }),
    WindiCSS(),
  ],
})
