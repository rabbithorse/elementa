<template>
  <!-- usage: <SlidesDafault :slides="" /> -->
  <div class="SlidesDafault">
    <Splide :options="options" aria-label="default slide">
      <!-- v-forを使ってスライドを動的に生成 -->
      <SplideSlide v-for="(slide, index) in slides" :key="index" class="item">
        <NuxtImg :src="`/images/slides/slide_${slide.id}.png`" :alt="slide.name" format="webp" class="img" />
      </SplideSlide>
    </Splide>
  </div>
</template>

<script setup lang="ts">
const options = ref({
  type: 'fade',
  rewind: true,
  autoplay: false,
  interval: 5000,
  speed: 800,
  arrows: true,
  pagination: true, // メインスライダーではページネーションを非表示
})

interface Props {
  slides: Array<{ id: number; name: string }>
}
const Props = withDefaults(defineProps<Props>(), {
  slides: () => [],
})
</script>

<style scoped>
.SlidesDafault {
  position: relative;
  margin: 4em auto 3em;
  & img { max-width: 100%; }

  @media (--mobile) {
    margin: 3em auto;
  }

  @media (--sp) {
    margin: pxToVw(50,750) auto;
  }
}
</style>
