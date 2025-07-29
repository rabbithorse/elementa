<template>
  <div class="CommonPdf">
    <time>{{ date }}</time>
    <NuxtLink :to="'/pdf/news/archives/' + file" target="_blank">{{ title }}</NuxtLink>
    <i class="far fa-file-pdf" />
  </div>
</template>

<script setup lang="ts">
interface Props {
  date: string
  file: string
  title: string
}

const Props = withDefaults(defineProps<Props>(), {
  date: '',
  file: '',
  title: '',
})
</script>

<style scoped>
div {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}

a {
  display: block;
  flex-grow: 1;
  padding: calc(var(--bs) *.25) calc(var(--bs) *2);
  font-feature-settings: "palt" 1;
  line-height: 1.4;
  text-align: left;
}

i {
  color: rgb(172 16 16);
}

time {
  font-family: Oswald, sans-serif;
}
</style>
