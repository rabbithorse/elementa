<template>
  <div class="NavsDrawer">
    <div class="menu -sp">
      <div class="overlay" :class="{ '-active': activeState }" @click="toggleActive" />
      <button class="toggleBtn" name="toggleBtn" aria-label="toggleBtn" :class="{ '-active': activeState }" @click="toggleActive">
        <span><i :class="{ 'fa-solid fa-bars': !activeState, 'fa-solid fa-xmark': activeState }" /></span>
      </button>
      <div class="modal" :class="{ '-active': activeState }">
        <nav class="navigation" @wheel="stopPropagation">
          <NavsMenu @push="deactivate" />
        </nav>
      </div>      
    </div>
    <div class="menu -pc">
      <header ref="headerEl" class="header" :class="{ '-kv': isKv }">
        <NuxtImg v-if="isKv" src="/common/pic-logo_white.png" alt="ElementA" format="webp" class="logo" />
        <NuxtImg v-else src="/common/pic-logo_black.png" alt="ElementA" format="webp" class="logo" />
        <nav class="navigation">
          <NavsMenu />
        </nav>
      </header>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onKeyStroke } from '@vueuse/core'
const activeState = ref<boolean>(false)
const deactivate = () => {
  activeState.value = false
}
const toggleActive = () => {
  activeState.value = !activeState.value
}

const stopPropagation = (event: WheelEvent) => {
  event.stopPropagation()
}

// ヘッダーが Hero(.Hero) の領域と重なっているあいだ .-kv を付与する
const isKv = ref<boolean>(false)
const headerEl = ref<HTMLElement | null>(null)
const route = useRoute()
let rafId: number | null = null

const updateKv = () => {
  rafId = null
  const hero = document.querySelector('.Hero') as HTMLElement | null
  if (!hero || !headerEl.value) {
    isKv.value = false
    return
  }
  const heroRect = hero.getBoundingClientRect()
  const headerRect = headerEl.value.getBoundingClientRect()
  isKv.value = heroRect.bottom > headerRect.top && heroRect.top < headerRect.bottom
}

const schedule = () => {
  if (rafId !== null) return
  rafId = requestAnimationFrame(updateKv)
}

onMounted(() => {
  schedule()
  window.addEventListener('scroll', schedule, { passive: true })
  window.addEventListener('resize', schedule)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', schedule)
  window.removeEventListener('resize', schedule)
  if (rafId !== null) cancelAnimationFrame(rafId)
})

watch(() => route.path, () => {
  nextTick(schedule)
})
</script>

<style scoped>
.NavsDrawer {
  --distance: 70%; /* ドロワーの幅 */

  & > .menu.-sp {
    display: none;

    @media (--mobile) {
      display: block;
    }
  }

  & > .menu.-pc {
    display: block;

    @media (--mobile) {
      display: none;
    }
  }
}

.toggleBtn {
  position: fixed;
  top: 0;
  right: 0;
  z-index: var(--zindex-nav);
  width: 4.2em;
  height: 4.5em;
  outline: none;
  transition: .25s cubic-bezier(0.25, 0.1, 0.25, 1.0);

  & > span {
    position: absolute;
    top: 0;
    left: 0;
    z-index: calc(var(--zindex-nav) + 1);
    display: block;
    width: 100%;
    height: 100%;
    background-color: var(--color-base);

    & .fa-solid {
      position: absolute;
      top: 50%;
      left: 50%;
      font-size: 3.6rem;
      color: #fff;
      transform: translate(-50%, -50%);
    }
  }
  &.-active { right: calc(var(--distance) - .1%); }
}

.modal {
  position: fixed;
  top: 0;
  right: 0;
  z-index: calc(var(--zindex-nav) + 2);
  display: flex;
  align-items: center;
  justify-content: center;
  width: var(--distance);
  height: 100%;
  padding: 3rem;
  background-color: var(--color-base);
  box-shadow: 0 0 20px rgb(var(--color-base) 0);
  transition: .25s cubic-bezier(0.25, 0.1, 0.25, 1.0);
  transform: translateX(100%);

  &.-active {
    box-shadow: 0 0 20px rgb(var(--color-base) 1);
    transform: translateX(0%);
  }

  & > .navigation {
    display: flex;
    justify-content: flex-start;
    width: 100%;
    max-height: 100%;
    overflow: auto;
    pointer-events: auto;

    & > :deep(ul) {
      display: flex;
      flex-direction: column;
      width: 90%;
      margin: 0 auto;
      list-style-type: none;

      & > li {
        margin-top: 1em;
        border-bottom: solid 1px #fff;

        & > a {
          display: block;
          width: 100%;
          padding: 1em;
          font-weight: 800;
          color: #fff;
          text-decoration: none;
          opacity: 1;
          transition: all .25s;

          &:hover {
            opacity: .9;
          }
        }
      }
    }
  }
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  z-index: calc(var(--zindex-nav) - 1);
  width: 100%;
  height: 100%;
  cursor: pointer;
  visibility: hidden;
  background-color: var(--color-overlay-dark);
  opacity: 0;
  transition: all .25s;

  &.-active {
    visibility: visible;
    opacity: 1;
  }
}

@keyframes basic-in {
    0% { opacity:0; transform: translateX(100%); }
  100% { opacity:1; transform: translateX(0%);  }
}

.header {
  position: fixed;
  top: 0;
  left: 0;
  z-index: var(--zindex-nav);
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 1em 2em;
  background: #fff;

  &.-kv {
    background: none;
    & .logo.-white { display: block; }
    & .logo.-black { display: none; }

    & .navigation {
      & > :deep(ul) {
        & > li {
          & > a {
            color: #fff;
          }
        }
      }
    }
  }

  & > .logo {
    width: pxToVw(184,1400);
    max-width: 18.4rem;
    & .logo.-white { display: none; }
    & .logo.-black { display: block; }
  }

  & > .navigation {
    display: flex;
    justify-content: flex-start;
    width: fit-content;

    & > :deep(ul) {
      display: flex;
      flex-direction: row;
      width: fit-content;
      margin: 0 auto;
      font-size: clamp(1.2rem, pxToVw(24,1400), 2.4rem);
      list-style-type: none;

      & > li {
        & + li {
          margin-left: 2em;
        }

        & > a {
          display: block;
          width: 100%;
          padding: .5em 0;
          font-weight: bold;
          color: #000;
          text-decoration: none;
          transition: color .25s;

          &:hover {
            color: var(--color-base);
          }
        }
      }
    }
  }
}

</style>
