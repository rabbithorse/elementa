<template>
  <div class="wrapper">
    <article class="post">
      <div class="inner">
        <header class="head">
          <time v-if="post?.publishedAt" :datetime="String(post.publishedAt)" class="date">{{ date(post.publishedAt) }}</time>
          <h1 class="title">{{ post?.title }}</h1>
          <img v-if="post?.img" :src="`${post.img.url}?w=1000&fm=webp`" alt="" loading="lazy" class="cover">
        </header>

        <div v-if="post?.body" class="body" v-html="post.body" />

        <div class="btnArea">
          <NuxtLink to="/news" class="btn">一覧へもどる</NuxtLink>
        </div>
      </div>
    </article>
  </div>
</template>

<script setup lang="ts">
import type { News } from '~~/types/News'

const { params } = useRoute()
const post = ref<News>()

if (!params.id) {
  // 有効なIDがない場合はnewsページに戻す
  navigateTo('/news')
} else {
  // params.idがある場合はcontentIdにセットする、配列の可能性があるため、文字列に変換する
  const contentId: string = Array.isArray(params.id) ? params.id[0]! : params.id  
  // IDからデータを取得する
  const { data, error } = await useMicroCMSGetListDetail<News>({
    endpoint: 'news',
    contentId,
  })

  if (error.value) {
    // IDでデータが取得できない場合はnewsページに戻す
    navigateTo('/news')
  } else {
    // データが取得できた場合はpostにセットする
    post.value = data.value
  }
}
</script>

<style scoped>
.wrapper {
  position: relative;
  width: 100%;
}

.inner {
  width: min(90%, 800px);
  padding: 4rem 0;
  margin: 0 auto;
}

.head {
  margin-bottom: 2rem;
  text-align: center;
}

.date {
  display: inline-block;
  font-size: 1.2rem;
  letter-spacing: .1em;
}

.title {
  margin-top: .6em;
  font-size: 2.4rem;
  font-weight: bold;
  line-height: 1.4;
  word-break: auto-phrase;
}

.subTitle {
  margin-top: 1em;
  font-size: 1.6rem;
  font-weight: bold;
  line-height: 1.6;
}

.cover {
  display: block;
  width: 100%;
  height: auto;
  margin-top: 2rem;
}

.body {
  font-size: 1.4rem;
  line-height: 1.8;

  & :deep(p) {
    margin-top: 1em;

    &:first-child {
      margin-top: 0;
    }
  }

  & :deep(a) {
    color: inherit;
    text-decoration: underline;
  }

  & :deep(img) {
    max-width: 100%;
    height: auto;
  }
}

.btnArea {
  margin-top: 4rem;
  text-align: center;
}

.btn {
  display: inline-block;
  padding: .8em 2.4em;
  font-size: 1.4rem;
  color: inherit;
  text-decoration: none;
  background-color: #fff;
  box-shadow: 0 0 .2em rgb(0 0 0 / 10%);
  transition: opacity .3s;

  &:hover {
    opacity: .6;
  }
}
</style>
