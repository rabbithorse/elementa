<template>
  <div class="Hero">
    <div class="bg">
      <NuxtImg src="/top/bg-top_dammy.png" alt="" format="webp" />
    </div>
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

    & > img {
      width: 100%;
      object-fit: cover;
    }
  }
}

.catch {
  position: absolute;
  top: 50%;
  left: 0;
  width: 50%;
  padding: 0 0 0 1.5em;
  font-size: pxToVw(65,1400);
  font-weight: bold;
  color: #fff;
  transform: translateY(-50%);
}
</style>
