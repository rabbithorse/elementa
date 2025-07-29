<template>
  <div class="CommonPagination">
    <ul class="pager">
      <li v-if="current > 1" class="page -arrow">
        <NuxtLink :to="getPath(current - 1)" aria-label="PREV"><i class="fas fa-angle-left" /></NuxtLink>
      </li>
      <li v-if="3 < current" class="page">
        <NuxtLink :to="getPath(1)">1</NuxtLink>
      </li>
      <li v-if="4 < current" class="omission">…</li>
      <li v-for="p in pager" v-show="current - 3 <= p && p <= current + 1" :key="p" class="page" :class="{ '-active': current === p + 1 }">
        <NuxtLink :to="getPath(p + 1)">{{ p + 1 }}</NuxtLink>
      </li>
      <li v-if="current + 3 < pager.length" class="omission">...</li>
      <li v-if="current + 2 < pager.length" class="page">
        <NuxtLink :to="getPath(pager.length)">{{ pager.length }}</NuxtLink>
      </li>
      <li v-if="current < pager.length" class="page -arrow">
        <NuxtLink :to="getPath(current + 1)" aria-label="NEXT"><i class="fas fa-angle-right" /></NuxtLink>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
interface Props {
  pager: Array<number>
  current: number
  path?: string // pagination 用のパス e.g,, newslist
}

const Props = withDefaults(defineProps<Props>(), {
  pager: () => [],
  current: 1,
  path: 'newslist',
})

// Methodsの定義
const { path } = Props
const getPath = (p: number) => {
  return `/${path}/${p}`
}

interface Emits {
  (e: 'update:current', value: number): void
}
const _emit = defineEmits<Emits>()

// 必要に応じて、emitイベントの定義
// const emit = defineEmits<{
//   (e: 'update:current', value: number): void
// }>()
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

    &.page {
      & a {
        display: block;
        padding: .3em .5em;
        line-height: 1;
        color: var(--color-text);
        text-decoration: none;
        background-color: #fff;
        box-shadow: 0 0 .2em color-mix(in srgb, var(--color-text) 10%, transparent);
        transition: opacity .3s;

        &:hover {
          text-decoration: none;
          opacity: .5;
        }
      }
    }

    &.-active a {
      text-decoration: none;
      pointer-events: none;
      background: var(--color-yellow);
    }

    &.-arrow a {
      background-color: transparent;
      box-shadow: none;
    }

    &.omission {
      padding: 0 .6em .3em;
    }
  }
}
</style>
