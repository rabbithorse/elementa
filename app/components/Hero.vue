<template>
  <div class="Hero">
    <NuxtImg src="/top/bg-top_dammy.png" alt="" format="webp" class="bg" />
    <h1 class="catch">楽しさを、<br>人生のエレメントに</h1>
  </div>
</template>

<style scoped>
.Hero {
  position: relative;
  width: 100%;
  height: auto;
  aspect-ratio: 16 / 9;

  & > .bg {
    width: 100%;
    height: auto;
    object-fit: cover;
  }
}

.catch {
  position: absolute;
  top: 50%;
  left: 0;
  width: 50%;
  padding: 0 0 0 2em;
  font-size: clamp(1.5rem, pxToVw(48,750), 3.2rem);
  font-weight: bold;
  color: #fff;
  transform: translateY(-50%);
}
</style>
