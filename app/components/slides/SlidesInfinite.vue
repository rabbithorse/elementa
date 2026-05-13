<template>
  <!-- usage: <SlidesInfinite :slides="" /> -->
  <div class="SlidesInfinite">
    <Splide :options="options" :extensions="{ AutoScroll }" aria-label="infinite slide">
      <!-- v-forを使ってスライドを動的に生成 -->
      <SplideSlide v-for="(slide, index) in slides" :key="index">
        <NuxtImg :src="`/images/slides/slide_${slide.id}.png`" :alt="slide.name" format="webp" class="img" />
      </SplideSlide>
    </Splide>
  </div>
</template>

<script setup lang="ts">
import { AutoScroll } from '@splidejs/splide-extension-auto-scroll'

const options = ref({
  type: 'loop', // スライドのループ
  drag: 'free', // ドラッグが自由にできるように設定
  arrows: false, // 矢印非表示
  pagination: false, // ページネーション非表示
  gap: 30, // スライド間の余白（px）
  fixedWidth: '24rem', // スライドの横幅
  autoStart: true, // 自動再生を有効にする
  autoScroll: { // 自動スクロール設定
    speed: 0.7, // スクロールの速度
    pauseOnHover: false, // マウスホバー時に一時停止するかの設定
    pauseOnFocus: false, // フォーカス時に一時停止するかの設定
  },
  breakpoints: {
    768: {
      gap: 30,
      fixedWidth: '17.8rem',
    },
  },
})

interface Props {
  slides: Array<{ id: number; name: string }>
}
const Props = withDefaults(defineProps<Props>(), {
  slides: () => [],
})
</script>

<style scoped>
.SlidesInfinite {
  position: relative;
  margin: 4em auto 3em;
  @media (--mobile) {
    margin: 3em auto;
  }

  @media (--sp) {
    margin: pxToVw(50,750) auto;
  }
}
</style>
