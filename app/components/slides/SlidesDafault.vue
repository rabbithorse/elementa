<template>
  <!-- usage: <SlidesDefault image="" alt="" /> -->
  <div class="SlidesDafault">
    <Swiper
      :modules="[SwiperAutoplay, SwiperEffectCreative, SwiperPagination, SwiperNavigation]"
      :slides-per-view="1"
      :loop="true"
      :pagination="true"
      :navigation="true"
      :autoplay="{
        delay: 8000,
        disableOnInteraction: true,
      }"
      :creative-effect="{
        prev: {
          // shadow: false,
          translate: ['-20%', 0, -1],
        },
        next: {
          translate: ['100%', 0, 0],
        },
      }"
    >
      <SwiperSlide v-for="(image, index) in images" :key="index">
        <img :src="image" :alt="alt[index]">
      </SwiperSlide>
    </swiper>
  </div>
</template>

<script setup lang="ts">
interface Props {
  images: Array<string>
  thumb: Array<string>
  alt: Array<string>
}
const Props = withDefaults(defineProps<Props>(), {
  images: () => [],
  thumb: () => [],
  alt: () => [],
})
</script>

<style scoped>
</style>
