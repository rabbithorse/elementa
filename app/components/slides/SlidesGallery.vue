<template>
  <!-- usage: <SlidesGallery :slides="" /> -->
  <div class="SlidesGallery">
    <Splide :options="mainOptions" ref="mainSplideRef" aria-label="gallery slide" class="viewSlide">
      <!-- v-forを使ってスライドを動的に生成 -->
      <template v-if="images && images.length > 0">
        <SplideSlide v-for="(image, index) in images" :key="index" class="item">
          <NuxtImg :src="image" :alt="`Slide image ${index + 1}`" format="webp" class="img" />
        </SplideSlide>
      </template>
      <template v-else>
        <SplideSlide v-for="(slide, index) in slides" :key="index" class="item">
          <NuxtImg :src="`/images/slides/slide_${slide.id}.png`" :alt="slide.name" format="webp" class="img" />
        </SplideSlide>
      </template>
    </Splide>

    <div ref="thumbnailSplideRef" class="thumbnailSlide">
      <template v-if="images && images.length > 0">
        <button v-for="(image, index) in images" :key="index" class="item" :class="{ '-active': index === currentSlideIndex }" 
          @click="goToSlide(index)">
          <NuxtImg :src="image" :alt="`Thumbnail image ${index + 1}`" format="webp" />
        </button>
      </template>
      <template v-else>
        <button v-for="(slide, index) in slides" :key="index" class="item" :class="{ '-active': index === currentSlideIndex }" 
          @click="goToSlide(index)">
          <NuxtImg :src="`/images/slides/thumb_${slide.id}.png`" :alt="slide.name" format="webp" />
        </button>      
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  slides?: Array<{ id: number; name: string }>
  images?: Array<string>
}
const Props = withDefaults(defineProps<Props>(), {
  slides: () => [],
  images: () => [],
})

// メインスライダーのオプション
const mainOptions = ref({
  type: 'loop',
  perPage: 1,
  autoplay: false,
  interval: 5000,
  speed: 800,
  arrows: true,
  pagination: false, // メインスライダーではページネーションを非表示
});

// Splideコンポーネントの参照
const mainSplideRef = ref<SplideElement | null>(null);

// 現在アクティブなスライドのインデックス
const currentSlideIndex = ref(0);

// Splideの move イベントハンドラ
const updateCurrentSlideIndex = (newIndex: number, oldIndex: number, destIndex: number) => {
  currentSlideIndex.value = newIndex; // 移動が開始される前に新しいインデックスを設定
};

// サムネイルボタンがクリックされたときの処理
const goToSlide = (index: number) => {
  if (mainSplideRef.value) {
    mainSplideRef.value.go(index);
  }
};

let splideInstance: any = null;

onMounted(() => {
  watch(() => mainSplideRef.value?.splide, (newSplideInstance) => {
    if (newSplideInstance) {
      splideInstance = newSplideInstance;
      console.log('Splide instance available. Binding move event.');
      splideInstance.on('move', updateCurrentSlideIndex);
      currentSlideIndex.value = splideInstance.index;
    } else {
      console.warn('Splide instance not yet available or became null.');
    }
  }, { immediate: true });
});

onBeforeUnmount(() => {
  if (splideInstance) {
    console.log('Unbinding Splide move event.');
    splideInstance.off('move', updateCurrentSlideIndex);
  }
});
</script>

<style scoped>
.SlidesGallery {
  --color-goods: #000;

  & img { max-width: 100%; }
}

/* .viewSlide {
  & > .item {
    display: block;
    max-width: calc(100% - 2px);
    margin: 0 auto;
    font-size: 0;
    border: 2px solid #000;
  }
} */

.thumbnailSlide {
  margin-top: 1rem;
  display: flex;
  flex-wrap: wrap;
  list-style-type: none;
  gap: 1rem;
  justify-content: center;

  & > .item {
    width: 12.8rem;
    border: 2px solid #000;

    &.-active {
      border: 2px solid red;
    }
  }

}
</style>
