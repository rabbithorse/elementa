<template>
  <div class="Opening" :class="{ '-loaded': isLoaded }">
    <div class="cover" />
    <div class="loading"><p class="text">Now Loading ...</p></div>
  </div>
</template>

<script setup lang="ts">
const { $gsap } = useNuxtApp()
const isLoaded = ref(false)

onMounted(() => {
  nextTick(() => {
    const tl = $gsap.timeline({
      onComplete: () => {
        isLoaded.value = true
        $gsap.to('body', {
          duration: 0.01,
          className: '-loaded',
          ease: 'Power1.easeInOut',
        })
      },
    })

    tl.to('.Opening .cover', { yPercent: -200, duration: 2.5, delay: 1, ease: 'power2.out' })
      .to('.Opening .loading .text', { opacity: 0, duration: 0.5, ease: 'power2.inOut' }, '<')
      .to('.Opening', { background: 'none', pointerEvents: 'none', duration: 0.5, ease: 'power2.inOut' }, '<')
      .to('.Opening', { opacity: 0, duration: 0.1, ease: 'power2.inOut' }, '-=1.5')
  })
})
</script>

<style scoped>
.Opening {
  position: fixed;
  top: 0;
  left: 0;
  z-index: var(--zindex-op);
  width: 100%;
  height: 100%;
  background: #fff;
  opacity: 1;
}

.Opening.-loaded {
  z-index: -1;
}

.cover {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 200%;
  background-color: #fff;
  transform: translateY(0%);

  &:before {
    position: absolute;
    top: 50%;
    left: 0;
    width: 100%;
    height: 100%;
    content: '';
    background-color: var(--color-base);
  }
}

.loading {
  position: absolute;
  top: 50%;
  left: 50%;
  font-family: var(--font-mplus);
  font-weight: 700;
  color: var(--color-base);
  text-align: center;
  pointer-events: none;
  transform: translate(-50%, -50%);
}
</style>
