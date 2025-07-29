<template>
  <!-- example: <CommonPost title="hoge" cover="">...</CommonPost> -->
  <div class="CommonPost">
    <div class="catch">
      <NuxtImg :src="cover" alt="cover" />
    </div>
    <article>
      <slot />
    </article>
  </div>
</template>

<script setup lang="ts">
interface Props {
  cover?: string
}

const Props = withDefaults(defineProps<Props>(), {
  cover: '/common/pic-cover.jpg',
})
</script>

<style scoped>
.CommonPost {
  width: 100%;
  margin-inline: auto;
}

:deep(.postHeader) {
  margin: var(--bs) 0 calc(var(--bs) *2);
  text-align: center;

  & h1 {
    font-size: 4.8rem;
    line-height: .8;
  }
}

.catch {
  display: flex;
  place-items: center;
  place-items: center center;
  height: 300px;
  overflow: hidden;
  background-position: 50%;
  background-size: cover;

  @media (--mobile) {
    display: none;
  }

  & img {
    width: 100%;
    object-fit: cover;
    filter: blur(8px);
    transform: scale(1.1);
  }
}

article {
  position: relative;
  z-index: 2;
  width: 100%;
  max-width: 1300px;
  min-height: 50svh;
  padding:var(--bs) calc(var(--bs) *2) calc(var(--bs) *2);
  margin: calc(var(--bs) *-4) auto calc(var(--bs) *2);
  background-color: #fff;

  @media (--mobile) {
    position: static;
    max-width: calc(100% - var(--bs) *4);
    margin: 0 auto var(--bs);
  }
}
</style>
