<template>
  <div class="NavsPopup">
    <button class="toggleBtn" name="toggleBtn" aria-label="toggleBtn" :class="{ '-active': activeState }" @click="toggleActive">
      <span><i class="fa-solid fa-bars" /></span>
    </button>
    <div class="modal" :class="{ '-active': activeState }">
      <button class="closeBtn" name="closeBtn" aria-label="closeBtn" @click="toggleActive">
        <i class="fa-solid fa-xmark" />
      </button>
      <nav class="navigation">
        <NavsMenu @push="deactivate" />
      </nav>
    </div>
  </div>
</template>

<script setup lang="ts">
const activeState = ref<boolean>(false)
const deactivate = () => {
  activeState.value = false
}

const toggleActive = () => {
  activeState.value = !activeState.value
}
</script>

<style scoped>
.NavsPopup {
  & .fa-solid {
    position: absolute;
    top: 50%;
    left: 50%;
    font-size: 3.6rem;
    color: #fff;
    transform: translate(-50%, -50%);
  }
}

.toggleBtn {
  position: fixed;
  top: 6em;
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
    background-color: var(--color-navy);
  }
}

.modal {
  position: fixed;
  top: 0;
  right: 0;
  z-index: -1;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  padding: 3rem;
  pointer-events: none;
  background-color: var(--color-navy);
  opacity: 0;
  transition: .25s cubic-bezier(0.25, 0.1, 0.25, 1.0);
  transform: scale(0);

  &.-active {
    z-index: calc(var(--zindex-nav) + 3);
    pointer-events: all;
    opacity: 1;
    transform: scale(1);
  }

  & > .closeBtn {
    position: absolute;
    top: 0;
    right: 0;
    width: 4.2em;
    height: 4.5em;
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
          color: #fff;
          opacity: 1;
          transition: all .25s;

          &:hover { opacity: .9; }
          &.nuxt-link-exact-active.nuxt-link-active { color: red; }
        }
      }
    }
  }
}
</style>
