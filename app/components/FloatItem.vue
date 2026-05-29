<template>
  <div ref="el">
    <slot />
  </div>
</template>

<script setup lang="ts">
const { $gsap } = useNuxtApp()

const props = withDefaults(defineProps<{
  duration?: number // 浮き上がってから戻るまでの秒数(yoyo で往復)
  delay?: number // 開始ディレイ(秒)。負数で途中フェーズから開始 → 複数並べた時の同期回避に
  distance?: string // 浮き上がる距離(CSS 長さ値)
}>(), {
  duration: 1,
  delay: 0,
  distance: '1em',
})

const el = ref<HTMLElement | null>(null)
let tween: ReturnType<typeof $gsap.to> | null = null

onMounted(() => {
  if (!el.value) return
  tween = $gsap.to(el.value, {
    y: `-${props.distance}`,
    duration: props.duration,
    delay: props.delay,
    ease: 'sine.inOut',
    repeat: -1,
    yoyo: true,
  })
})

onBeforeUnmount(() => {
  tween?.kill()
})
</script>
