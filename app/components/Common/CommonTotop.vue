<template>
  <div class="CommonTotop">
    <button ref="scrollTopButton" @click="scrollTop">
      <p>TOP</p>
    </button>
  </div>
</template>

<script setup lang="ts">
const { $gsap } = useNuxtApp()
const scrollTopButton = ref<HTMLButtonElement | null>(null)

const scrollTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  })
}

onMounted(() => {
  if (scrollTopButton.value) {
    $gsap.set(scrollTopButton.value, { autoAlpha: 0 })
    window.addEventListener('scroll', checkScroll)
  }
})

onUnmounted(() => {
  window.removeEventListener('scroll', checkScroll)
})

const checkScroll = () => {
  if (scrollTopButton.value) {
    if (window.scrollY > 100) {
      $gsap.to(scrollTopButton.value, { autoAlpha: 1, duration: 0.5 })
    }
    else {
      $gsap.to(scrollTopButton.value, { autoAlpha: 0, duration: 0.5 })
    }
  }
}
</script>

<style scoped>
button {
  position: fixed;
  right: var(--bs);
  bottom: var(--bs);
  display: grid;
  place-items: center;
  width: calc(var(--bs) *2);
  height: calc(var(--bs) *2);
  border: solid 1px #fff;
  border-radius: 50%;

  @media (--mobile) {
    right: calc(var(--bs) *.5);
    bottom: calc(var(--bs) *.5);
  }

  &:after {
    position: absolute;
    top: -25%;
    width: calc(var(--bs) *.5);
    height: max-content;
    content: url('/images/common/pic-totop.svg');
    transition: translate .5s;
    translate: 0;
  }

  &:hover {
    &:after {
      translate: 0 calc(var(--bs) *-.1);
    }
  }

  & p {
    font-size: x-small;
    color: #fff;
    letter-spacing: .1em;
  }
}

.isStatic {
  display: flex;
  justify-content: flex-end;
  background-color: #fff;

  & button {
    position: static;
    margin: 0 var(--bs) var(--bs) 0;
  }
}
</style>
