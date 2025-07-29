<template>
  <div class="Accordion">
    <details class="accodion">
      <summary class="toggleBtn" @click="toggleAccordion">
        {{ title }} <i :class="{ 'far fa-angle-down': !activeState, 'far fa-angle-up': activeState }" />
      </summary>
      <div ref="content" class="content">
        <slot />
      </div>
    </details>
  </div>
</template>

<script setup lang="ts">
const { $gsap } = useNuxtApp()

interface Props {
  title: string
}
const Props = withDefaults(defineProps<Props>(), {
  title: 'アコーディオン',
})

const activeState = ref(false)
const content = ref<HTMLElement | null>(null)

const toggleAccordion = () => {
  if (content.value) {
    if (activeState.value) {
      // 閉じるアニメーション
      $gsap.to(content.value, {
        height: 0,
        duration: 0.2,
        ease: 'power2.inOut',
        onComplete: () => {
          activeState.value = false
          content.value!.style.display = 'none'
        },
      })
    }
    else {
      content.value!.style.display = 'block'
      const height = content.value!.scrollHeight
      content.value!.style.height = '0px'
      // 開くアニメーション
      $gsap.to(content.value, {
        height: height,
        duration: 0.2,
        ease: 'power2.inOut',
        onComplete: () => {
          activeState.value = true
          content.value!.style.height = 'auto'
        },
      })
    }
  }
}
</script>

<style scoped>
.Accordion {
  box-shadow: 0 0 1rem var(--color-overlay-dark);
}

.toggleBtn {
  box-sizing: border-box;
  display: block;
  width: 100%;
  padding: 1em;
  font-size: 1em;
  color: #fff;
  text-align: center;
  letter-spacing: .05em;
  cursor: pointer;
  background-color: #000;
  border: none;
  outline: none;

  & > i {
    font-size: 1em;
    vertical-align: bottom;
  }
}

.content {
  display: none;
  padding: 0 1em;
  overflow: hidden;
  color: #fff;
  background-color: #000;

  & > p {
    margin: 1em 0;
  }
}
</style>
