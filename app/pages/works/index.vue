<template>
  <div class="wrapper">
    <section class="works">
      <div class="inner">
        <hgroup class="pageTtl">
          <h1 class="en">Works</h1>
          <p class="ja">運用タイトル</p>
        </hgroup>

        <template v-if="works && works.contents.length">
          <ul class="worksList">
            <li v-for="post in works.contents" :key="post.id" class="item">
                <p class="title">{{ post.title }}</p>
                <img v-if="post?.img" :src="`${post.img.url}?w=1000&fm=webp`" alt="" loading="lazy" class="cover">
                <ul v-if="post.platform.length" class="platformList">
                  <li v-for="platform in post.platform" :key="platform" class="tag">
                    {{ platform }}
                  </li>
                </ul>
                <p class="text">{{ post.text }}</p>
              <NuxtLink :to="`${post.url}`" class="btn">公式サイトへ<i class="fa-utility fa-semibold fa-arrow-up-right-from-square"></i></NuxtLink>
            </li>
          </ul>
        </template>

        <p v-else class="empty">運用タイトルはありません。</p>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import type { Works } from '~~/types/Works'

const { data: works } = await useAsyncData(
  async () => {
    const { data } = await useMicroCMSGetList<Works>({
      endpoint: 'works',
      queries: {
        orders: '-order',
      },
    })
    return {
      contents: data.value?.contents ?? [],
    }
  }
)
useSeoMeta({
  title: `運用タイトル | ${inject('globalSiteName')}`,
  ogTitle: `運用タイトル | ${inject('globalSiteName')}`,
  ogUrl: `${inject('globalSiteUrl')}/works/`,
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

.worksList {
  display: flex;
  flex-wrap: wrap;
  gap: 1.65em;
  width: 100%;
  max-width: 113.7rem;
  margin: 4em auto 0;
  font-size: clamp(1.2rem, pxToVw(20,1400), 2rem);
  font-weight: 600;
  line-height: 1;
  color: #000;
  list-style-type: none;

  @media (--sp) {
    font-size: clamp(1.2rem, pxToVw(16,450), 2rem);
  }

  & > .item {
    width: calc(50% - 0.825em);
    padding: 2em;
    text-align: center;
    border: .4rem solid #000;
    border-radius: 0.5em;

    @media (--mobile) {
      padding: 2em 1em;
    }

    @media (--sp) {
      width: 100%;
      padding: 1em;
      border-width: .2rem;
    }

    & > .title {
      margin-bottom: 1em;
      font-size: 1.3em;
      font-weight: 700;
    }

    & > .platformList {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5em;
      justify-content: flex-start;
      width: 100%;
      margin-top: 1em;
      list-style-type: none;

      & > .tag {
        padding: 0.25em 0.75em;
        font-size: 0.9em;
        color: #fff;
        background-color: var(--color-base);
        border-radius: 2em;
      }
      
    }

    & > .text {
      margin-top: 1em;
      font-size: 1em;
      line-height: 1.6;
      color: var(--color-text-700);
      text-align: left;
    }

    & > .btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 11em;
      height: 3em;
      margin-top: 1em;
      font-size: 1.2em;
      font-weight: bold;
      color: #fff;
      text-decoration: none;
      background-color: #000;
      border-radius: 0.33em;
      transition: transform .25s;
      transform: scale(1);

      & > i {
        margin-left: 0.5em;
      }

      &:hover {
        transform: scale(.96);
      }
    }
  }
}
</style>
