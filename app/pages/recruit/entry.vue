<template>
  <div class="wrapper">
    <section class="recruit">
      <div class="inner">
        <hgroup class="pageTtl">
          <h1 class="en">ENTRY</h1>
          <p class="ja">募集要項</p>
        </hgroup>

        <template v-if="news && news.contents.length">
          <ul class="newsList">
            <li v-for="post in news.contents" :key="post.id" class="item">
              <NuxtLink :to="`/news/${post.id}`">
                <time :datetime="String(post.publishedAt)" class="date">{{ date(post.publishedAt) }}</time>
                <p class="title">{{ post.title }}</p>
              </NuxtLink>
            </li>
          </ul>
          <Pagination v-if="news.totalCount > LIMIT" :pager="news.pager" :current="page" />
        </template>

        <p v-else class="empty">お知らせはありません。</p>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import type { News } from '~~/types/News'

const route = useRoute()
const LIMIT = 12

const page = computed(() => Number(route.params.p) || 1)
const offset = computed(() => (page.value - 1) * LIMIT)

const { data: news } = await useAsyncData(
  `news-page-${page.value}`,
  async () => {
    const { data } = await useMicroCMSGetList<News>({
      endpoint: 'news',
      queries: {
        limit: LIMIT,
        offset: offset.value,
        orders: '-publishedAt',
        fields: 'id,title,publishedAt',
      },
    })
    const totalCount = data.value?.totalCount ?? 0
    return {
      contents: data.value?.contents ?? [],
      totalCount,
      pager: [...Array(Math.ceil(totalCount / LIMIT)).keys()],
    }
  },
  {
    watch: [() => route.params.p],
  },
)
useSeoMeta({
  title: `募集要項 | ${inject('globalSiteName')}`,
  ogTitle: `募集要項 | ${inject('globalSiteName')}`,
  ogUrl: `${inject('globalSiteUrl')}/recruit/entry/`,
})
</script>

<style scoped>
.wrapper {
  position: relative;
  width: 100%;
  padding: 3em 1em 8em;

  @media (--sp) {
    padding: 2em 1em 5em;
  }
}

.inner {
  width: 100%;
  max-width: 96rem;
  min-height: 80vh;
  margin: 0 auto;
}

.newsList {
  width: 100%;
  margin-top: 2em;
  font-size: clamp(1.4rem, pxToVw(24,1400), 2.4rem);
  list-style-type: none;
  border-top: .1rem solid var(--color-hr_light);

  & > .item {
    border-bottom: .1rem solid var(--color-hr_light);

    & > a {
      display: flex;
      flex-wrap: wrap;
      gap: 2em;
      padding: 1.5em 0 1.3em;
      line-height: 1.2;
      color: inherit;
      text-decoration: none;
      transition: color .25s;

      &:hover {
        color: var(--color-base);
      }

      @media (--mobile) {
        gap: .5em 1em;
        padding: 1.2em 0 1em;
      }
    }
  }
}

.date {
  width: 6.5em;
  font-weight: bold;
}

.title {
  flex: 1;
  font-weight: 600;
}

.empty {
  padding: 4em 0;
  font-size: 1em;
  color: var(--color-hr_light);
  text-align: center;
}

.Pagination {
  margin-top: 4em;

  @media (--sp) {
    margin-top: 2.5em;
  }
}
</style>
