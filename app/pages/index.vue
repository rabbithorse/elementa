<template>
  <div class="wrapper">
    <p class="test">HOGE</p>
    <Hero />
    <!-- <NuxtImg src="ogps/ogp.png" alt="" format="webp" /> -->
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
/* .test {
  @mixin dn;

  width: pxToVw(200);

  @media(--mobile) {
    color: blue;
  }
} */

.wrapper {
  min-height: 100vh;
  padding: 0 2rem;

  ul {
    padding-left: 1.5em;
  }
}

h1 {margin-top: 2em;}
</style>
