<template>
  <!-- example: <CommonHeader title="HOGE" ruby="ほげ" /> -->
  <header class="CommonHeader">
    <hgroup>
      <h1>{{ title }}</h1>
      <p>{{ ruby }}</p>
    </hgroup>
  </header>
</template>

<script setup lang="ts">
interface Props {
  title: string
  ruby: string
}

const Props = withDefaults(defineProps<Props>(), {
  title: '',
  ruby: '',
})
</script>

<style scoped>
.CommonHeader {
  width: 100%;
  max-width: var(--bw);
  padding: 0 calc(var(--bs) *.5);
  margin-inline: auto;
  margin-top: calc(var(--bs) *5);

  @media (--mobile) {
    margin-top: calc(var(--bs) *1);
  }
}

h1 {
  font-size: 5rem;
  font-weight: 900;
  line-height: 1.2;

  &+p {
    /* padding-left: .25em; */
  }

  @media(--mobile) {
    padding: 0 calc(var(--bs) *2);
    font-size: 4.8rem;
    line-height: 1;
    text-align: center;

    &+p {
      padding-left: 0;
      text-align: center;
    }
  }
}
</style>
