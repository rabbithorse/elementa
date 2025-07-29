<template>
  <ul class="Share">
    <li class="twitter">
      <NuxtLink :to="shareData" target="_blank"><i class="fa-brands fa-x-twitter" />Share<i class="fa-solid fa-arrow-right" /></NuxtLink>
    </li>
    <li class="youtube">
      <NuxtLink :to="`https://www.youtube.com/@${youtube}`" target="_blank"><i class="fa-brands fa-youtube" />YouTube<i class="fa-solid fa-arrow-right" /></NuxtLink>
    </li>
  </ul>
</template>

<script setup lang="ts">
interface Props {
  youtube?: string
  text?: string
  url?: string
  hash?: string
}
const Props = withDefaults(defineProps<Props>(), {
  youtube: '',
  text: '',
  url: '',
  hash: '',
})
const hashFlag = ref<string>(Props.hash)

const shareData = ref<string>('')
if (hashFlag.value) {
  shareData.value = `https://twitter.com/intent/tweet?text=${Props.text}&url=${Props.url}&hashtags=${Props.hash}`
}
else {
  shareData.value = `https://twitter.com/intent/tweet?text=${Props.text}&url=${Props.url}`
}
</script>

<style scoped>
.Share {
  display: flex;
  flex-direction: row;
  gap: 1em;
  justify-content: center;
  padding: 2em 0;
  margin: 0 auto;
  text-align: center;
  list-style-type: none;
}

li {
  > a {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 1em 2em;
    font-size: 1.4rem;
    font-size: clamp(1rem, pxToVw(14, 375), 1.4rem);
    font-weight: bold;
    color: #101010;
    text-decoration: none;
    background-color: #fff;
    border-radius: 3em;
    box-shadow: 0 0.1em 0.2em var(--color-overlay-dark);
    transition: all .3s;

    > .fa-brands {
      margin-right: .5em;
      font-size: 1.5em;
    }

    > .fa-arrow-right {
      padding-top: 0.2em;
      margin-left: .8em;
      font-size: .85em;
    }

    &:hover {
      color: #fff;
    }
  }

  &.twitter {
    a:hover {
      color: #fff;
      background-color: var(--color-twitter);
    }
  }

  &.youtube {
    a:hover {
      color: #fff;
      background-color: var(--color-youtube);
    }
  }
}
</style>
