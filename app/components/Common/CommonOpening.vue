<template>
  <div class="CommonOpening" :class="{ '-loaded': isLoaded }">
    <div class="cover" />
    <div class="loading"><p>Now Loading ...</p></div>
  </div>
</template>

<script setup lang="ts">
const { $gsap } = useNuxtApp()
const isLoaded = ref(false)

onMounted(() => {
  nextTick(() => {
    // ローディングの模擬（実際のアプリケーションでは、必要なデータの読み込みなどを行います）
    setTimeout(() => {
      $gsap.to('.CommonOpening', {
        duration: 0.25,
        opacity: 0,
        ease: 'Power1.easeInOut',
        onComplete: () => {
          isLoaded.value = true
          $gsap.to('body', {
            duration: 0.1,
            className: '-loaded',
            ease: 'Power1.easeInOut',
          })
        },
      })
    }, 2500) // 2.5秒後にアニメーションを開始
  })
})
</script>

<style scoped>
.CommonOpening {
  position: fixed;
  top: 0;
  left: 0;
  z-index: var(--zindex-op);
  width: 100%;
  height: 100%;
  background-color: #fff;
  opacity: 1;
  transition: opacity 0.1s ease;
}

.CommonOpening.-loaded {
  z-index: -1;
  pointer-events: none;
}

.cover {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #fff;
}

.loading {
  position: absolute;
  top: 50%;
  left: 50%;
  text-align: center;
  pointer-events: none;
  transform: translate(-50%, -50%);
}
</style>
