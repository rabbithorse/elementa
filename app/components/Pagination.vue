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
.Pagination {
  margin-top: 4em;

  @media (--sp) {
    margin-top: 2.5em;
  }
}

.pager {
  display: flex;
  flex-wrap: wrap;
  gap: .4em;
  align-items: center;
  justify-content: center;
  width: 100%;
  font-size: clamp(1.4rem, pxToVw(18,1400), 1.8rem);
  font-weight: 600;
  line-height: 1;
  list-style-type: none;

  @media (--sp) {
    font-size: clamp(1.2rem, pxToVw(15,450), 1.8rem);
  }

  & > li {
    &.page > a {
      display: flex;
      align-items: center;
      justify-content: center;
      min-width: 2.4em;
      height: 2.4em;
      padding: 0 .6em;
      color: var(--color-base);
      text-decoration: none;
      background-color: #fff;
      border: .1rem solid var(--color-base);
      border-radius: .4em;
      transition: color .25s, background-color .25s;

      &:hover {
        color: #fff;
        background-color: var(--color-base);
      }
    }

    &.-active > a {
      color: #fff;
      pointer-events: none;
      background-color: var(--color-base);
    }

    &.-arrow > a {
      color: var(--color-base);
      background-color: transparent;
      border-color: transparent;

      &:hover {
        color: var(--color-base);
        background-color: var(--color-bg_light);
      }
    }

    &.omission {
      display: flex;
      align-items: center;
      justify-content: center;
      min-width: 1.6em;
      height: 2.4em;
      color: var(--color-hr_light);
    }
  }
}
</style>
