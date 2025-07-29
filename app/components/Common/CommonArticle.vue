<template>
  <!-- example: <CommonArticle>...</CommonArticle> -->
  <article class="CommonArticle">
    <slot />
  </article>
</template>

<script setup lang="ts">
</script>

<style scoped>
.CommonArticle {
  width: 100%;
  max-width: var(--bw);
  padding: calc(var(--bs) *2) calc(var(--bs) *1.5) calc(var(--bs) *6);
  margin-inline: auto;

  @media(--mobile) {
    padding: calc(var(--bs) *4) calc(var(--bs) *1.5) calc(var(--bs) *6);
  }
}

:deep(section) {
  margin-top: calc(var(--bs) *2.5);

  @media(--mobile) {
    margin-top: calc(var(--bs) *4);
  }
}
</style>
