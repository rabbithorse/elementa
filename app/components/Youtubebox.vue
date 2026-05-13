<template>
  <!-- usage: <Youtubebox videoid="**********" /> -->
  <div class="Youtubebox">
    <button ref="openBtn" class="toggleBtn" aria-label="動画を再生する" @click="playMovie(true)">
      <i class="fal fa-play-circle" />
      <img v-if="!thumbFlag" :src="`https://img.youtube.com/vi/${videoid}/maxresdefault.jpg`" alt="動画サムネイル" />
      <NuxtImg v-else :src="thumb" alt="動画サムネイル" format="webp" />
    </button>

    <Teleport to="body">
      <Transition name="fade">
        <div v-show="!hidden" class="popup" role="dialog" aria-modal="true" @click="playMovie(false)">
          <div :style="{ height: fullheight }" class="overlay" />
          <div ref="dialog" class="container" tabindex="-1">
            <iframe
              v-if="!hidden"
              :src="`https://www.youtube.com/embed/${playerVars}`"
              frameborder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            />
          </div>
          <button class="closeBtn" aria-label="閉じる" @click="playMovie(false)">
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
  videoid: string
  thumb?: string
}
const Props = withDefaults(defineProps<Props>(), {
  videoid: '',
  thumb: '',
})
const thumbFlag = ref<string>(Props.thumb)

// 関連動画を非表示、自動再生無効、アノテーションを非表示
const playerVars = `${Props.videoid}?rel=0&autoplay=0&iv_load_policy=3`

const hidden = ref<boolean>(true)
const fullheight = ref<string>('')

onMounted(() => {
  onResize()
  window.addEventListener('resize', onResize)
})
onUnmounted(() => {
  window.removeEventListener('resize', onResize)
})
const onResize = () => {
  fullheight.value = `${window.innerHeight}px`
}

const dialog = ref<HTMLElement | null>(null)
const openBtn = ref<HTMLElement | null>(null)
// 画面固定させる場合はクリックイベントを下記に変更
const playMovie = (event: boolean) => {
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
  playMovie(false)
})
</script>

<style scoped>
.toggleBtn {
  position: relative;
  width: 100%;
  background-color: #000;

  & > i {
    position: absolute;
    inset: 50% auto auto 50%;
    z-index: 1;
    font-size: 10rem;
    color: #fff;
    transition: all .25s;
    transform: translate(-50%, -50%);
  }

  & > img {
    width: 100%;
    vertical-align: middle;
    opacity: .8;
    transition: all .25s;
  }

  &:hover {
    & > i {
      font-size: 11rem;
    }

    & > img {
      opacity: 1;
    }
  }
}

.popup {
  position: fixed;
  top: 0;
  left: 0;
  z-index: var(--zindex-yotubebox);
  display: block;
  width: 100vw;
  height: 100vh;
  padding: 5%;
  opacity: 1;
  transition: all .25s;

  &.fade-enter-from, &.fade-leave-to { opacity: 0; }
  &.fade-enter-active, &.fade-leave-active { transition: opacity .25s; }

  & > .overlay {
    position: fixed;
    top: 0;
    left: 0;
    z-index: calc(var(--zindex-yotubebox) + 1);
    display: block;
    width: 100vw;
    height: 100vh;
    cursor: pointer;
    background-color: var(--color-overlay-dark);
  }

  & > .container {
    position: relative;
    top: 50%;
    left: 50%;
    z-index: calc(var(--zindex-yotubebox) + 2);
    width: auto;
    max-width: 100%;
    height: auto;
    max-height: 100%;
    aspect-ratio: 16/9;
    overflow: hidden;
    transform: translate(-50%, -50%);

    &:deep(iframe) {
      position: absolute;
      top: 0;
      right: 0;
      width: 100%;
      height: 100%;
      filter: blur(0);
    }
  }

  & > .closeBtn {
    position: fixed;
    top: 1rem;
    right: 1rem;
    z-index: calc(var(--zindex-yotubebox) + 3);
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
