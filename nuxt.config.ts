// https://nuxt.com/docs/api/configuration/nuxt-config
import fs from 'fs'
import path from 'path'

// ディレクトリ内のファイルを再帰的に取得する関数
function getAllFiles(dirPath: string, arrayOfFiles: string[] = []) {
  const files = fs.readdirSync(dirPath)

  files.forEach((file) => {
    const filePath = path.join(dirPath, file)
    if (fs.statSync(filePath).isDirectory()) {
      arrayOfFiles = getAllFiles(filePath, arrayOfFiles)
    }
    else {
      // 画像ファイルのみを対象とする
      const ext = path.extname(file).toLowerCase()
      if (['.png', '.jpg', '.jpeg', '.gif', '.webp', '.svg'].includes(ext)) {
        arrayOfFiles.push(filePath)
      }
    }
  })

  return arrayOfFiles
}

// NuxtImgのルートに変換する関数
function convertToNuxtImgRoutes(files: string[], publicDir: string) {
  return files.map((file) => {
    // 相対パスに変換（publicディレクトリからの相対パス）
    const relativePath = path.relative(publicDir, file)
    // パスの区切り文字を統一（Windowsでも/を使用）
    const normalizedPath = relativePath.replace(/\\/g, '/')
    // IPXのURLパターンに変換
    return `/_ipx/f_webp&q_80/${normalizedPath}`
  })
}

// publicディレクトリのパス
const publicDir = path.resolve(__dirname, 'public/images')

// 検索対象のディレクトリ（複数指定）
const targetDirs = [
  path.join(publicDir, 'dec'),
]

// 全画像ルートを取得
let imageRoutes: string[] = []
try {
  // 各対象ディレクトリを処理
  targetDirs.forEach((dir) => {
    if (fs.existsSync(dir)) {
      const files = getAllFiles(dir)
      const routes = convertToNuxtImgRoutes(files, publicDir)
      imageRoutes = [...imageRoutes, ...routes]
      console.log(`Found ${routes.length} images to prerender in ${path.basename(dir)} directory`)
    }
    else {
      console.warn(`Directory not found: ${dir}`)
    }
  })

  console.log(`Total: ${imageRoutes.length} images to prerender`)
}
catch (error) {
  console.error('Error generating image routes:', error)
}

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
    optimizeDeps: {
      include: [
        '@vue/devtools-core',
        '@vue/devtools-kit',
        'gsap',
        'gsap/ScrollTrigger',
      ],
    },
  },
  nitro: {
    prerender: {
      routes: [
        '/_ipx/f_webp&q_80/common/pic-logo_black.png',
        '/_ipx/f_webp&q_80/common/pic-logo_white.png',
        '/_ipx/f_webp&q_80/recruit/pic-recruit_pc.png',
        '/_ipx/f_webp&q_80/recruit/pic-recruit_sp.png',
        ...imageRoutes,
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
    id: 'G-CZ166WZQTV', // Google Analyticsの測定IDを指定、hekk配下で念のため作りましたが、必要に応じて変更してください。
  },
  site: {
    url: 'https://elementa.co.jp', // globalSiteUrl と一致させる
    name: 'ELEMENTA株式会社ーー人生に、ゲームの楽しさを', // globalSiteName と一致させる
  },
})
