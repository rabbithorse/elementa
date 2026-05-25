<template>
  <div class="wrapper">
    <Hero />

    <section class="news">
      <div class="inner">
        <hgroup class="secTtl">
          <h2 class="en">NEWS</h2>
          <p class="ja">お知らせ</p>
        </hgroup>

        <ul v-if="news?.length" class="newsList">
          <li v-for="post in news" :key="post.id" class="headline">
            <NuxtLink :to="`/news/${post.id}`" class="link">
              <time :datetime="String(post.publishedAt)">{{ date(post.publishedAt) }}</time>
              <p class="title">{{ post.title }}</p>
            </NuxtLink>
          </li>
        </ul>
        <p v-else class="empty">お知らせはありません。</p>

        <div class="linkArea">
          <NuxtLink to="/news" class="defLink -en">MORE<i class="fas fa-arrow-right"></i></NuxtLink>
        </div>
      </div>
    </section>

    <section class="company">
      <div class="inner">
        <div class="imgArea">
          <div class="img -i01">
            <NuxtImg src="/top/pic-company_01.png" alt="" format="webp" />
          </div>
          <div class="img -i02">
            <NuxtImg src="/top/pic-company_02.png" alt="" format="webp" />
          </div>
        </div>
        <div class="textArea">
          <hgroup class="secTtl">
            <h2 class="en">COMPANY</h2>
            <p class="ja">会社情報</p>
          </hgroup>
          <p class="text">素晴らしいゲーム体験は<br>独創性と<br>最先端技術の融合によって<br>生まれる。</p>
          <p class="text-en">We believe that exceptional games are born where creativity meets technology.</p>
          <div class="linkArea">
            <NuxtLink to="/company" class="defLink -ja">Elementaについて<i class="fas fa-arrow-right"></i></NuxtLink>
          </div>
        </div>
      </div>
    </section>

    <section class="recruit">
      <div class="inner">
        <div class="textArea">
          <hgroup class="secTtl">
            <h2 class="en">RECRUIT</h2>
            <p class="ja">採用情報</p>
          </hgroup>   
          <p class="text">素晴らしいゲームは<br>情熱を持つ人から<br>生まれる。</p>
          <p class="text-en">We believe every great game starts  with passionate people.</p>
          <div class="linkArea">
            <NuxtLink to="/recruit" class="defLink -ja">採用情報を見る<i class="fas fa-arrow-right"></i></NuxtLink>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import type { News } from '~~/types/News'
import { date } from '~/composables/date'

const { data: news } = await useAsyncData('top-news', async () => {
  const { data } = await useMicroCMSGetList<News>({
    endpoint: 'news',
    queries: {
      limit: 3,
      orders: '-publishedAt',
      fields: 'id,title,publishedAt',
    },
  })
  return data.value?.contents ?? []
})
</script>

<style scoped>
.wrapper {
  position: relative;
  width: 100%;

  & .secTtl {
    display: flex;
    flex-wrap: wrap;
    gap: 2em;
    align-items: baseline;
    font-size: clamp(1.4rem, pxToVw(20,1400), 2rem);
    font-weight: bold;
    line-height: 1.2;
    color: var(--color-base);

    @media (--mobile) {
      font-size: clamp(1.2rem, pxToVw(24,750), 2rem);
    }

    & > .en {
      font-size: 2em;
      font-weight: bold;
    }

    & > .ja {
      font-size: 1em;
    }
  }
}

.news {
  padding: 0 2em;
  margin: 3em auto 0;

  @media (--mobile) {
    padding: 0 1em;
  }

  & > .inner {
    position: relative;
    max-width: 108rem;
    margin: 0 auto;
  }

  & .newsList {
    width: 100%;
    margin-top: 1em;
    font-size: clamp(1.4rem, pxToVw(24,1400), 2.4rem);
    list-style-type: none;
    border-top: .1rem solid var(--color-hr_light);

    @media (--mobile) {
      font-size: clamp(1.2rem, pxToVw(28,750), 2rem);
    }

    & > .headline {
      border-bottom: .1rem solid var(--color-hr_light);

      & > .link {
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

        & > time {
          width: 6.5em;
          font-weight: bold;
        }

        & > .title {
          flex: 1;
          font-weight: 600;
        }

        @media (--mobile) {
          gap: 1em;
        }
      }
    }
  }

  & .linkArea {
    position: absolute;
    top: .5em;
    right: 0;
  }
}

.company {
  padding: 0 2em;
  margin: 8em auto 0;

  @media (--mobile) {
    padding: 0;
    margin: 6em auto 0;
  }

  & > .inner {
    display: flex;
    flex-wrap: wrap;
    gap: 2em 3em;
    align-items: center;
    justify-content: center;
    width: 100%;
    max-width: 130rem;
    margin: 0 auto;
    background: var(--color-bg_light);
    border-radius: .9em;

    @media (--mobile) {
      gap: 1em;
      padding: 0 1em 3em;
      border-radius: 0;
    }
  }

  & .imgArea {
    display: flex;
    flex-direction: column;
    gap: 1em;
    width: pxToPer(625,1300);
    transform: translateY(-10%);

    @media (--mobile) {
      width: 100%;
      max-width: 62.5rem;
    }

    & img {
      width: 100%;
    }

    & > .img.-i01 {
      align-self: flex-end;
      width: pxToPer(350,625);
    }

    & > .img.-i02 {
      align-self: flex-start;
      width: pxToPer(515,625);
    }
  }

  & .textArea {
    width: pxToPer(450,1300);

    @media (--mobile) {
      width: 100%;
      max-width: 62.5rem;
      padding: 0 1em;
      margin: -2em auto 0;
    }

    & > .text {
      margin: 1em auto .5em;
      font-size: clamp(1.4rem, pxToVw(30,1400), 3rem);
      font-weight: bold;

      @media (--mobile) {
        font-size: clamp(1.4rem, pxToVw(28,750), 3rem);
      }
    }

    & > .text-en {
      margin-top: 1em;
      font-size: clamp(1rem, pxToVw(16,1400), 1.6rem);
      color: var(--color-base);

      @media (--mobile) {
        font-size: clamp(1.2rem, pxToVw(24,750), 1.6rem);
      }
    }

    & > .linkArea {
      margin-top: 2em;
      text-align: right;
    }
  }
}

.recruit {
  margin: 4em auto 0;
  background: url('/images/top/bg-recruit.png') no-repeat left center / cover;

  @media (--mobile) {
    /* padding-top: 20em; */
  }

  @media (--sp) {
    padding-top: 46vw;
    background-position: top left;
    background-size: 130% auto;
  }

  & > .inner {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 50%;
    max-width: 71rem;
    padding: 4em 3em;
    margin: 0 0 0 auto;
    background: var(--color-opacity_light);

    @media (--mobile) {
      width: 65%;
      padding: 3em 2em;
    }

    @media (--sp) {
      width: 100%;
      max-width: inherit;
      padding: 3em 2em;
      background-color: #fff;
    }
  }

  & .textArea {
    & > .text {
      margin: 1em auto .5em;
      font-size: clamp(1.4rem, pxToVw(30,1400), 3rem);
      font-weight: bold;

      @media (--mobile) {
        font-size: clamp(1.4rem, pxToVw(28,750), 3rem);
      }
    }

    & > .text-en {
      margin-top: 1em;
      font-size: clamp(1rem, pxToVw(16,1400), 1.6rem);
      color: var(--color-base);

      @media (--mobile) {
        font-size: clamp(1.2rem, pxToVw(24,750), 1.6rem);
      }
      
    }

    & > .linkArea {
      margin-top: 2em;
      text-align: right;
    }
  }
}
</style>