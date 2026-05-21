<template>
  <div>
    <Opening />
    <NavsDrawer />
    <lenis :options="LenisOptions">
      <div class="container" :class="isTop ? '-top' : '-page'">
        <NuxtPage />
      </div>
    </lenis>
    <Corpfooter />
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const isTop = computed(() => route.path === '/')

const typekitId = 'rbi5ujp' // サイトごとに書き換えるポイント ①
const fontawesomeId = '8a6fd9fb88' // サイトごとに書き換えるポイント ②
const globalSiteName = 'Elementa' // サイトごとに書き換えるポイント ③
const twitterId = '@elementa' // サイトごとに書き換えるポイント ④
const hostUrl = 'https://elementa.co.jp' // サイトごとに書き換えるポイント ⑤ ※開発時は localhost:3000 になる
const description = 'サイト説明文'

const globalSiteUrl = hostUrl
const globalOgp = hostUrl + '/images/ogps/ogp.png'
provide('globalSiteName', globalSiteName)
provide('globalSiteUrl', globalSiteUrl)
provide('globalOgp', globalOgp)

useSeoMeta({
  charset: 'utf-8',
  viewport: 'width=device-width, initial-scale=1',
  formatDetection: 'telephone=no',
  ogLocale: 'ja_JP',
  ogType: 'website',
  ogUrl: globalSiteUrl, // 個別のページは useSeoMeta で上書き
  title: globalSiteName, // 個別のページは useSeoMeta で上書き
  ogTitle: globalSiteName, // 個別のページは useSeoMeta で上書き
  ogSiteName: globalSiteName,
  description: description,
  ogDescription: description,
  ogImage: globalOgp,
  twitterCard: 'summary_large_image',
  twitterSite: twitterId,
  twitterCreator: twitterId,
})

useHead({
  htmlAttrs: { lang: 'ja', prefix: 'og: http://ogp.me/ns#' },
  script: [
    { src: `https://use.typekit.net/${typekitId}.js` },
    { src: `https://kit.fontawesome.com/${fontawesomeId}.js`, crossorigin: 'anonymous' },
  ],
  link: [
    { rel: 'apple-touch-icon', href: '/images/favicons/favicon.png' },
    { rel: 'icon', type: 'image/x-icon', href: '/images/favicons/favicon.ico' },
  ],
})

declare const Typekit: { load: (options: { async: boolean }) => void }
onMounted(() => {
  try {
    Typekit.load({ async: true })
  }
  catch (e) {
    console.log(e)
  }
})

const LenisOptions = {
  smooth: true,
  duration: 1.2,
  autoRaf: true,
  direction: 'vertical'
}
</script>

<style scoped>
.page-enter-active,
.page-leave-active {
  opacity: 1;
  transition: opacity .3s ease-out;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
}

.container {
  width: 100%;
  margin: 0 auto;
  background-color: #fff;

  &.-page {
    padding-top: 5em;
    font-size: clamp(1.2rem, pxToVw(24,1400), 2.4rem);
  }

  @media (--mobile) {
    &.-page {
      padding-top: 3em;
    }
  }
}
</style>
