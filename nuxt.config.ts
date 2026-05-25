// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  vite: {
    build: {
      terserOptions: {
        compress: {
          drop_console: process.env.NODE_ENV === 'production', // 本番環境での console.log 削除
        },
      },
      chunkSizeWarningLimit: 2000,
    },
  },
  nitro: {
    prerender: {
      routes: [
        '/_ipx/f_webp&q_80/common/pic-logo_black.png',
        '/_ipx/f_webp&q_80/common/pic-logo_white.png',
      ],
    },
  },
  router: {
    options: {
      scrollBehaviorType: 'smooth', // ページ内リンクのスムーズスクロール
    },
  },
  // SSGなのにAPIリクエストが飛んでしまうとき（古いver.のバグかも知れない）に有効化する。
  routeRules: {
    '/': { prerender: true, static: true, },
    '/**': { prerender: true, static: true, },
  },
  hooks: {
    'pages:extend'(pages) {
      pages.push({
        name: 'newslist',
        path: '/newslist/:p',
        file: '~/pages/news/index.vue',
      })
    },
  },
  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
  },
  css: [
    'ress/dist/ress.min.css',
    '~/assets/styles/main.css',
  ],
  postcss: {
    plugins: {
      '@csstools/postcss-global-data': { files: ['app/assets/styles/media.css'] },
      'postcss-mixins': { mixinsFiles: ['app/assets/styles/mixins.css'] },
      'postcss-custom-media': {},
      'postcss-functions': {
        functions: {
          pxToVw: (size: number, stdWidth: number = 1400): string => `${Math.floor((size / stdWidth) * 10000) / 100}vw`, // usage: .hoge { pxToVw(100); }
          pxToPer: (size: number, stdWidth: number = 750): string => `${Math.floor((size / stdWidth) * 200) / 2}%`, // usage: .hoge { pxToPer(100); }
        },
      },
      'autoprefixer': {},
      'cssnano': { preset: 'default' },
    },
  },
  plugins: [
    '~/plugins/gsap.client.ts',
  ],
  experimental: {
    defaults: {
      nuxtLink: {
        prefetch: true,
        prefetchOn: { visibility: false, interaction: true },
      },
    },
  },
  modules: [
    '@nuxt/eslint',
    '@nuxt/image',
    '@nuxtjs/sitemap',
    '@vueuse/nuxt',
    '@formkit/nuxt',
    'nuxt-gtag',
    'nuxt-microcms-module', // microCMSを使う際に有効化
    'nuxt-splide',
    'nuxt-lenis',
  ],
  eslint: {
    config: {
      stylistic: true,
    },
  },
  formkit: {
    autoImport: true,
    configFile: './formkit.config.ts',
  },
  image: {
    dir: '../public/images',
    quality: 80,
  },
  splide: {
    theme: 'default',
  },
  microCMS: {  // microCMSを使う際に .env を用意して有効化
    serviceDomain: process.env.SERVICE_DOMAIN,
    apiKey: process.env.API_KEY,
    target: 'server',
  },
  gtag: {
    id: 'G-CZ166WZQTV',
  },
  site: {
    url: 'https://elementa.co.jp', // globalSiteUrl と一致させる
    name: 'Elementa', // globalSiteName と一致させる
  },
})
