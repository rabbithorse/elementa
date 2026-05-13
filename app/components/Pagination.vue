<template>
  <nav class="Pagination" aria-label="ページネーション">
    <ul class="pager">
      <li v-if="current > 1" class="page -arrow">
        <NuxtLink :to="getPath(current - 1)" aria-label="前のページへ"><i class="fas fa-angle-left" /></NuxtLink>
      </li>
      <li v-if="current > 3" class="page">
        <NuxtLink :to="getPath(1)">1</NuxtLink>
      </li>
      <li v-if="current > 4" class="omission">…</li>
      <li
        v-for="p in pager"
        v-show="current - 3 <= p && p <= current + 1"
        :key="p"
        class="page"
        :class="{ '-active': current === p + 1 }"
      >
        <NuxtLink :to="getPath(p + 1)">{{ p + 1 }}</NuxtLink>
      </li>
      <li v-if="current + 3 < pager.length" class="omission">…</li>
      <li v-if="current + 2 < pager.length" class="page">
        <NuxtLink :to="getPath(pager.length)">{{ pager.length }}</NuxtLink>
      </li>
      <li v-if="current < pager.length" class="page -arrow">
        <NuxtLink :to="getPath(current + 1)" aria-label="次のページへ"><i class="fas fa-angle-right" /></NuxtLink>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
interface Props {
  pager: number[]
  current: number
  basePath?: string
  pagePath?: string
}

const props = withDefaults(defineProps<Props>(), {
  pager: () => [],
  current: 1,
  basePath: '/news',
  pagePath: 'newslist',
})

const getPath = (p: number) => (p === 1 ? props.basePath : `/${props.pagePath}/${p}`)
</script>

<style scoped>
.pager {
  display: flex;
  flex-direction: row;
  gap: 0 .5em;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: auto;
  font-size: 1.2rem;
  line-height: 1;
  list-style-type: none;

  & > li {
    display: inline-block;

    &.page > a {
      display: block;
      padding: .3em .5em;
      line-height: 1;
      text-decoration: none;
      background-color: #fff;
      box-shadow: 0 0 .2em rgb(0 0 0 / 10%);
      transition: opacity .3s;

      &:hover {
        opacity: .5;
      }
    }

    &.-active > a {
      pointer-events: none;
      background-color: #f5d800;
    }

    &.-arrow > a {
      background-color: transparent;
      box-shadow: none;
    }

    &.omission {
      padding: 0 .6em .3em;
    }
  }
}
</style>
