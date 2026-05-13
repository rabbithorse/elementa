<template>
  <div class="wrapper">
    <section class="news">
      <div class="inner">
        <hgroup class="secTtl">
          <h1 class="en">NEWS</h1>
          <p class="ja">お知らせ</p>
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
</script>

<style scoped>
.wrapper {
  position: relative;
  width: 100%;
}

.inner {
  width: min(90%, 1200px);
  padding: 4rem 0;
  margin: 0 auto;
}

.secTtl {
  margin-bottom: 2rem;

  & > .en {
    font-size: 2.4rem;
    font-weight: bold;
    line-height: 1;
  }

  & > .ja {
    margin-top: .4em;
    font-size: 1.2rem;
  }
}

.newsList {
  list-style: none;

  & > .item {
    border-bottom: 1px solid rgb(0 0 0 / 10%);

    & > a {
      display: flex;
      gap: 0 1.5em;
      align-items: baseline;
      padding: 1.2em 0;
      color: inherit;
      text-decoration: none;
      transition: opacity .3s;

      &:hover {
        opacity: .6;
      }
    }
  }
}

.date {
  flex-shrink: 0;
  font-size: 1.2rem;
}

.title {
  font-size: 1.4rem;
  line-height: 1.6;
}

.empty {
  padding: 2em 0;
  text-align: center;
}

.Pagination {
  margin-top: 3rem;
}
</style>
