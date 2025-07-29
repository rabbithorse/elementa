<template>
  <div>
    <CommonHeader title="NEWS" ruby="ニュースリリース" />
    <CommonArticle>
      <template v-if="news">
        <ul class="newsList">
          <li v-for="post in newsContents" :key="post.id" class="item" :title="post.title">
            <NuxtLink :to="`/news/${post.id}`">
              <div class="thumbnail">
                <template v-if="post.cover">
                  <img :src="`${post.cover.url}?fm=webp&q=25&fit=clip&w=400&h=400`" alt="image" />
                </template>
                <template v-else>
                  <img src="./images/news/pic-nocover.png" alt="image" />
                </template>
              </div>
              <p>{{ truncate(ref(post.title), 32) }}</p>
              <time :datetime="post.publishedAt">{{ date(post.publishedAt) }} </time>
            </NuxtLink>
          </li>
        </ul>
        <CommonPagination v-if="news?.totalCount > LIMIT" :pager="news?.pager" :current="Number(page)" />
      </template>
    </CommonArticle>
  </div>
</template>

<script setup lang="ts">
import type { News } from '~~/types/News'

const route = useRoute()

// リアクティブなページ番号とオフセット
const page = computed(() => Number(route.params.p) || 1)
const LIMIT = 20
const OFFSET = computed(() => (page.value - 1) * LIMIT)
const newsContents = ref<News[]>([])
// キーにページ番号を含めることで、ページが変わったらデータを再取得
const { data: news } = await useAsyncData(
  // 重要: キーにページ番号を含める
  `news-page-${page.value}`,

  async () => {
    const response = await useMicroCMSGetList<News>({
      endpoint: 'news',
      queries: {
        limit: LIMIT,
        offset: OFFSET.value, // computedの値を使用
        orders: '-publishedAt',
      },
    })

    return {
      data: response.data,
      totalCount: response.data?.value ? response.data.value.totalCount : 0,
      pager: response.data?.value ? [...Array(Math.ceil(response.data.value.totalCount / LIMIT)).keys()] : [],
    }
  },
  {
    // route.params.pの変更を監視（重要）
    watch: [() => route.params.p],
  },
)

newsContents.value = news.value?.data.value?.contents || []

useSeoMeta({
  title: `ニュースリリース | ${inject('globalSiteName')}`,
  ogTitle: `ニュースリリース | ${inject('globalSiteName')}`,
  ogUrl: inject('globalSiteUrl') + useRoute().path,
})
</script>

<style scoped>
.CommonPagination {
  margin-top: calc(var(--bs) *2);
}

a {
  color: var(--color-navy);
  text-decoration: none;

  &:hover {
    color: var(--color-hover);
  }
}


.newsList {
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--bs);
  list-style-type: none;

  @media(--mobile) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  & .item {
    display: contents;

    & > a {
      display: grid;
      grid-template-rows: subgrid;
      grid-row: span 3;
      gap: calc(var(--bs) *.5);
      align-items: start;
      height: 100%;
      text-decoration: none;
      background-color: #fff;
      box-shadow: 0 0 12px color-mix(in srgb, #000 5%, transparent);
      transition: box-shadow .25s;

      & .thumbnail {
        place-items: center;
        aspect-ratio: 16 / 9;
        overflow: hidden;

        & img {
          width: 100%;
          min-height: 100px;
          aspect-ratio: 16 / 9;
          object-fit: cover;
          transition: scale .25s;
        }
      }

      & p {
        padding: 0 calc(var(--bs) *.5);
        line-height: 1.6;
      }

      & time {
        align-self: flex-end;
        padding-top: calc(var(--bs) *.5);
        padding-right: calc(var(--bs) *.5);
        padding-bottom: calc(var(--bs) *.5);
        font-family: Oswald, sans-serif;
        font-size: 2rem;
        font-weight: bold;
        line-height: 1;
        text-align: right;
        font-display: swap;
      }

      @media(--mobile) {
        & p, & time {
          font-size: smaller;
        }
      }

      &:hover {
        color: var(--color-hover);
        box-shadow: none;

        & .thumbnail {
          & img {
            scale: 1.05;
          }
        }
      }
    }
  }
}
</style>
