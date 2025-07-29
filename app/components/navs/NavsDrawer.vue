<template>
  <div class="NavsDrawer">
    <div class="overlay" :class="{ '-active': activeState }" @click="toggleActive" />
    <button class="toggleBtn" name="toggleBtn" aria-label="toggleBtn" :class="{ '-active': activeState }" @click="toggleActive">
      <span><i :class="{ 'fa-solid fa-bars': !activeState, 'fa-solid fa-xmark': activeState }" /></span>
    </button>
    <div class="modal" :class="{ '-active': activeState }">
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
.NavsDrawer {
  --distance: 70%; /* ドロワーの幅 */
}

.toggleBtn {
  position: fixed;
  top: 1em;
  right: 0;
  z-index: var(--zindex-nav);
  width: 4.2em;
  height: 4.5em;
  outline: none;
  transition: .25s cubic-bezier(0.25, 0.1, 0.25, 1.0);

  > span {
    position: absolute;
    top: 0;
    left: 0;
    z-index: calc(var(--zindex-nav) + 1);
    display: block;
    width: 100%;
    height: 100%;
    background-color: var(--color-navy);

    .fa-solid {
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
  background-color: var(--color-navy);
  box-shadow: 0 0 20px rgb(var(--color-navy) 0);
  transition: .25s cubic-bezier(0.25, 0.1, 0.25, 1.0);
  transform: translateX(100%);

  &.-active {
    box-shadow: 0 0 20px rgb(var(--color-navy) 1);
    transform: translateX(0%);
  }

  > .navigation {
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

      > li {
        margin-top: 1em;
        border-bottom: solid 1px #fff;

        > a {
          display: block;
          width: 100%;
          padding: 1em;
          color: #fff;
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
</style>
