<template>
  <!-- usage: <Lightbox src="common/*****.png" thumb="common/*****.png" alt="*****" /> -->
  <div class="Lightbox">
    <button ref="openBtn" aria-label="画像を拡大して表示" @click="onScreen(true)">
      <NuxtImg :src="thumb" :alt="alt" />
    </button>

    <Teleport to="body">
      <Transition name="fade">
        <div v-show="!hidden" ref="dialog" class="popup" role="dialog" aria-modal="true" @click="onScreen(false)">
          <div class="overlay" />
          <NuxtImg :src="src" :alt="alt" />
          <button class="closeBtn" aria-label="閉じる" @click="onScreen(false)">
            <i class="fal fa-times" />
          </button>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { onKeyStroke } from '@vueuse/core'

const { $gsap } = useNuxtApp()

interface Props {
  src?: string
  thumb?: string
  alt?: string
}
const Props = withDefaults(defineProps<Props>(), {
  src: 'common/dummy.png',
  thumb: 'common/dummy.png',
  alt: '',
})

const hidden = ref(true)
const dialog = ref<HTMLElement | null>(null)
const openBtn = ref<HTMLElement | null>(null)

// 画面固定させる場合はクリックイベントを下記に変更
const onScreen = (event: boolean) => {
  hidden.value = !event
  if (event) {
    $gsap.to('body', {
      className: '-modal -loaded',
    })
    // モーダル内のフォーカスを設定
    nextTick(() => {
      if (dialog.value) {
        dialog.value.focus()
      }
    })
  }
  else {
    $gsap.to('body', {
      className: '-loaded',
    })
    // フォーカスを開くボタンに戻す
    if (openBtn.value) {
      openBtn.value.focus()
    }
  }
}

// ESCキーでモーダルを閉じる
onKeyStroke('Escape', (e) => {
  e.preventDefault()
  onScreen(false)
})
</script>

<style scoped>
.popup {
  position: fixed;
  top: 0;
  left: 0;
  z-index: var(--zindex-lightbox);
  display: block;
  width: 100vw;
  height: 100vh;
  opacity: 1;

  &.fade-enter-from, &.fade-leave-to { opacity: 0; }
  &.fade-enter-active, &.fade-leave-active { transition: opacity .25s; }

  &.fade-enter-from > img, &.fade-leave-to > img { transform: translate(-50%, -50%) scale(1.1); }
  &.fade-enter-active > img, &.fade-leave-active > img { transition: transform .25s; }

  & > .overlay {
    position: fixed;
    top: 0;
    left: 0;
    z-index: calc(var(--zindex-lightbox) + 1);
    display: block;
    width: 100vw;
    height: 100vh;
    background-color: var(--color-overlay-dark);
  }

  & > img {
    position: fixed;
    top: 50%;
    left: 50%;
    z-index: calc(var(--zindex-lightbox) + 2);
    max-width: 85vw;
    max-height: 85vh;
    filter: blur(0);
    transform: translate(-50%, -50%);
  }

  & > .closeBtn {
    position: fixed;
    top: 1rem;
    right: 1rem;
    z-index: calc(var(--zindex-lightbox) + 3);
    display: flex;
    align-items: center;
    justify-content: center;
    width: 1em;
    height: 1em;
    font-size: 4rem;
    color: #fff;
  }

}
</style>
