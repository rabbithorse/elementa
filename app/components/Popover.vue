<template>
  <!-- usage: <Popover> ... </Popover> -->
  <div class="Popover">
    <div class="toggleBtn">
      <button ref="openBtn" @click="onPopover(true)">
        <span>モーダルオープン <i class="far fa-clone" /></span>
      </button>
    </div>
    <Teleport to="body">
      <Transition name="fade">
        <section v-show="!hidden" :style="{ height: fullheight }" class="modal" role="dialog" aria-modal="true">
          <div class="overlay" @click="onPopover(false)" />
          <div ref="dialog" class="dialog" tabindex="-1">
            <div class="content" @wheel="stopPropagation">
              <slot />
            </div>
          </div>
          <button class="closeBtn" aria-label="閉じる" @click="onPopover(false)">
            <i class="fal fa-times" />
          </button>
        </section>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { onKeyStroke } from '@vueuse/core'

const { $gsap } = useNuxtApp()

const hidden = ref(true)
const fullheight = ref('')
const dialog = ref<HTMLElement | null>(null)
const openBtn = ref<HTMLElement | null>(null)

const onResize = () => {
  fullheight.value = `${window.innerHeight}px`
}

const stopPropagation = (event: WheelEvent) => {
  event.stopPropagation()
}

onMounted(() => {
  onResize()
  window.addEventListener('resize', onResize)
})
onUnmounted(() => {
  window.removeEventListener('resize', onResize)
})
// 画面固定させる場合はクリックイベントを下記に変更
const onPopover = (event: boolean) => {
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
  onPopover(false)
})
</script>

<style scoped>
.toggleBtn {
  margin: 3em auto;
  text-align: center;

  & button {
    display: inline-block;
    padding: .5em 1em;
    color: #fff;
    background-color: #000;

    & span {
      font-size: 2rem;
    }
  }
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  z-index: var(--zindex-modal);
  width: 100vw;
  pointer-events: inherit;
  visibility: visible;
  opacity: 1;
  transition: all .5s;

  &.fade-enter-from, &.fade-leave-to { opacity: 0; }
  &.fade-enter-active, &.fade-leave-active { transition: opacity .25s; }

  & > .overlay {
    position: absolute;
    top: 0;
    left: 0;
    z-index: calc(var(--zindex-modal) + 1);
    width: 100%;
    height: 100%;
    background-color: var(--color-overlay-dark);
  }

  & > .dialog {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    padding: 5% 5% 10rem;

    & > .content {
      position: relative;
      z-index: calc(var(--zindex-modal) + 2);
      width: 100%;
      max-width: 80rem;
      height: 100%;
      padding: 2rem;
      overflow: auto;
      background-color: #fff;
    }

    & > .closeBtn {
      position: absolute;
      bottom: 2rem;
      left: 50%;
      z-index: calc(var(--zindex-modal) + 3);
      display: flex;
      align-items: center;
      justify-content: center;
      width: 5rem;
      height: 5rem;
      line-height: 1;
      color: #000;
      background-color: #fff;
      border-radius: 50%;
      transition: all .3s;
      transform: translateX(-50%);

      & i { font-size: 3rem; }

      &:focus { outline: none; }

      &:hover { transform: translateX(-50%) scale(0.95); }
    }
  }
}
</style>
