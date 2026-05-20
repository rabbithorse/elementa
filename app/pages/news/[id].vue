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
  padding: 3em 1em 8em;

  @media (--sp) {
    padding: 2em 1em 5em;
  }
}

.inner {
  width: 100%;
  max-width: 80rem;
  margin: 0 auto;
  font-size: clamp(1.4rem, pxToVw(18,1400), 1.8rem);

  @media (--sp) {
    font-size: clamp(1.3rem, pxToVw(15,450), 1.8rem);
  }
}

.head {
  padding-bottom: 2em;
  margin-bottom: 2em;
  text-align: center;
  border-bottom: .1rem solid var(--color-hr_light);
}

.date {
  display: inline-block;
  font-size: .9em;
  font-weight: bold;
  letter-spacing: .08em;
  color: var(--color-base);
}

.title {
  margin-top: .6em;
  font-size: 1.8em;
  font-weight: bold;
  line-height: 1.4;
  word-break: auto-phrase;

  @media (--sp) {
    font-size: 1.5em;
  }
}

.cover {
  display: block;
  width: 100%;
  height: auto;
  margin-top: 2em;
  border-radius: .6em;
}

.body {
  font-size: 1em;
  line-height: 1.9;

  & :deep(p) {
    margin-top: 1em;

    &:first-child {
      margin-top: 0;
    }
  }

  & :deep(h2) {
    padding-bottom: .4em;
    margin: 2.5em 0 1em;
    font-size: 1.4em;
    font-weight: bold;
    line-height: 1.4;
    border-bottom: .2rem solid var(--color-base);
  }

  & :deep(h3) {
    margin: 2em 0 .8em;
    font-size: 1.2em;
    font-weight: bold;
    line-height: 1.4;
    color: var(--color-base);
  }

  & :deep(ul),
  & :deep(ol) {
    padding-left: 1.5em;
    margin: 1em 0;
  }

  & :deep(li) {
    margin-top: .3em;
  }

  & :deep(blockquote) {
    padding: 1em 1.2em;
    margin: 1.5em 0;
    font-size: .95em;
    background-color: var(--color-bg_light);
    border-left: .3rem solid var(--color-base);
  }

  & :deep(a) {
    color: var(--color-base);
    text-decoration: underline;
    transition: opacity .25s;

    &:hover {
      opacity: .7;
    }
  }

  & :deep(img) {
    display: block;
    max-width: 100%;
    height: auto;
    margin: 1.5em auto;
    border-radius: .4em;
  }

  & :deep(table) {
    width: 100%;
    margin: 1.5em 0;
    border-collapse: collapse;
  }

  & :deep(th),
  & :deep(td) {
    padding: .6em 1em;
    border: .1rem solid var(--color-hr_light);
  }

  & :deep(th) {
    background-color: var(--color-bg_light);
    text-align: left;
  }
}

.btnArea {
  margin-top: 4em;
  text-align: center;

  @media (--sp) {
    margin-top: 3em;
  }
}

.btn {
  position: relative;
  display: inline-flex;
  align-items: center;
  min-height: 4.5em;
  padding: .8em 1.6em .8em 3.2em;
  font-size: clamp(1.4rem, pxToVw(18,1400), 1.8rem);
  font-weight: 600;
  color: #fff;
  text-decoration: none;
  background-color: #000;
  border-radius: .4em;
  transition: opacity .25s;

  &::before {
    position: absolute;
    top: 50%;
    left: 1em;
    margin-right: .5em;
    font-family: 'Font Awesome 7 Pro', sans-serif;
    font-weight: 900;
    content: '\f104';
    transform: translateY(-50%);
  }

  &:hover {
    opacity: .8;
  }
}
</style>
