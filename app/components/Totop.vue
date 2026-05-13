<template>
  <div class="Totop">
    <button @click="scrollTop">
      <i class="fa-light fa-arrow-up-to-line" />
      <span>PAGE TOP</span>
    </button>
  </div>
</template>

<script setup lang="ts">
const scrollTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  })
}
</script>

<style scoped>
button {
  display: block;
  padding: 1em 2em 0;
  margin: 0 auto -1px;
  clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
  color: #fff;
  text-align: center;
  background-color: #101010;
  border: none;

  & > i { display: block; }

  & > span {
    font-size: .85em;
  }
}
</style>
