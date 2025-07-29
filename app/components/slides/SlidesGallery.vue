<template>
  <div class="SlidesGallery">
    <Swiper
      :modules="[SwiperAutoplay, SwiperEffectCreative, SwiperNavigation, SwiperThumbs]"
      :slides-per-view="1"
      :loop="true"
      :thumbs="{ swiper: thumbnailSlide }"
      :autoplay="{
        delay: 8000,
        disableOnInteraction: true,
      }"
      :creative-effect="{
        prev: {
          translate: ['-20%', 0, -1],
        },
        next: {
          translate: ['100%', 0, 0],
        },
      }"
    >
      <SwiperSlide v-for="(image, index) in images" :key="index" class="viewSlide">
        <img :src="image" :alt="alt[index]" class="item">
      </SwiperSlide>
    </Swiper>
    <Swiper
      ref="thumbnailSlide"
      :modules="[SwiperThumbs]"
      :watch-slides-progress="true"
      :slides-per-view="4"
      :clickable="true"
      :space-between="10"
    >
      <SwiperSlide v-for="(image, index) in images" :key="index" class="thumbnailSlide">
        <img :src="image" :alt="alt[index]" class="item">
      </SwiperSlide>
    </Swiper>
  </div>
</template>

<script setup lang="ts">
interface Props {
  images: Array<string>
  thumb?: Array<string>
  alt: Array<string>
}
const Props = withDefaults(defineProps<Props>(), {
  images: () => [],
  thumb: () => [],
  alt: () => [],
})

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const thumbnailSlide = ref<any>(null)

onMounted(() => {
  if (thumbnailSlide.value && thumbnailSlide.value.$el) {
    thumbnailSlide.value = thumbnailSlide.value.$el.swiper
  }
})
</script>

<style scoped>
.SlidesGallery {
  --color-goods: #000;

  img { max-width: 100%; }
}

.viewSlide {
  > .item {
    display: block;
    max-width: calc(100% - 2px);
    margin: 0 auto;
    font-size: 0;
    border: 1px solid var(--color-goods);
  }
}

.thumbnailSlide {
  margin-top: .3em;

  >.item {
    width: calc(100% - 2px);
    border: 1px solid var(--color-goods);
  }

  &.swiper-slide-thumb-active {
    >.item { border: 1px solid red; }
  }
}
</style>
