<template>
  <div class="wrapper">
    <Hero />

    <section class="news" data-reveal-fade>
      <div class="inner">
        <div class="ttlArea">
          <hgroup class="secTtl">
            <h2 class="en">NEWS</h2>
            <p class="ja">お知らせ</p>
          </hgroup>          

          <div class="linkArea">
            <NuxtLink to="/news" class="defLink -en">MORE<i class="fas fa-arrow-right"></i></NuxtLink>
          </div>
        </div>


        <ul v-if="news?.length" class="newsList">
          <li v-for="post in news" :key="post.id" class="headline" data-reveal>
            <NuxtLink :to="`/news/${post.id}`" class="link">
              <time :datetime="String(post.publishedAt)">{{ date(post.publishedAt) }}</time>
              <p class="title">{{ post.title }}</p>
            </NuxtLink>
          </li>
        </ul>
        <p v-else class="empty">お知らせはありません。</p>
        <FloatItem class="dec" :duration="4.2" :delay="-0.2">
          <NuxtImg src="/dec/top-01.png" alt="" format="webp" />
        </FloatItem>
      </div>
    </section>

    <section class="company" data-reveal-fade>
      <div class="inner">
        <div class="imgArea">
          <div class="img -i01" data-reveal>
            <NuxtImg src="/top/pic-company_01.png" alt="" format="webp" />
          </div>
          <div class="img -i02" data-reveal>
            <NuxtImg src="/top/pic-company_02.png" alt="" format="webp" />
          </div>
        </div>
        <div class="textArea" data-reveal>
          <hgroup class="secTtl">
            <h2 class="en">COMPANY</h2>
            <p class="ja">会社情報</p>
          </hgroup>
          <p class="text">素晴らしいゲーム体験は<br>独創性と<br>最先端技術の融合によって<br>生まれる。</p>
          <p class="text-en">We believe that exceptional games are born where creativity meets technology.</p>
          <div class="linkArea">
            <NuxtLink to="/company" class="defLink -ja"><span>Elementaについて</span><i class="fas fa-arrow-right"></i></NuxtLink>
          </div>
        </div>
        <div class="decArea">
          <FloatItem class="dec -d01" :duration="4.2" :delay="-0.2">
            <NuxtImg src="/dec/top-02.png" alt="" format="webp" />
          </FloatItem>
          <FloatItem class="dec -d02" :duration="4.6" :delay="-1.1">
            <NuxtImg src="/dec/top-03.png" alt="" format="webp" />
          </FloatItem>
          <FloatItem class="dec -d03" :duration="5" :delay="-2.3">
            <NuxtImg src="/dec/top-04.png" alt="" format="webp" />
          </FloatItem>
          <FloatItem class="dec -d04" :duration="4.4" :delay="-0.7">
            <NuxtImg src="/dec/top-05.png" alt="" format="webp" />
          </FloatItem>
        </div>
      </div>
    </section>

    <section class="recruit" data-reveal-fade>
      <div class="inner">
        <div class="textArea" data-reveal>
          <hgroup class="secTtl">
            <h2 class="en">RECRUIT</h2>
            <p class="ja">採用情報</p>
          </hgroup>   
          <p class="text">素晴らしいゲームは<br>情熱を持つ人から<br>生まれる。</p>
          <p class="text-en">We believe every great game starts  with passionate people.</p>
          <div class="linkArea">
            <NuxtLink to="/recruit" class="defLink -ja"><span>採用情報を見る</span><i class="fas fa-arrow-right"></i></NuxtLink>
          </div>
        </div>
        <FloatItem class="dec" :duration="4.8" :delay="-3">
          <NuxtImg src="/dec/top-06.png" alt="" format="webp" />
        </FloatItem>
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

const { $gsap } = useNuxtApp()
onMounted(() => {
  nextTick(() => {
    const els = document.querySelectorAll('[data-reveal]')
    els.forEach((el) => {
      $gsap.set(el, { opacity: 0, y: 40 })
      $gsap.to(el, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          once: true,
        },
      })
    })

    const fadeEls = document.querySelectorAll('[data-reveal-fade]')
    fadeEls.forEach((el) => {
      $gsap.set(el, { opacity: 0 })
      $gsap.to(el, {
        opacity: 1,
        duration: 1,
        ease: 'power2.inOut',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          once: true,
        },
        onStart: () => {
          el.classList.add('-revealed')
        },
      })
    })
  })
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
    font-weight: 800;
    line-height: 1.2;
    color: var(--color-base);

    @media (--mobile) {
      font-size: clamp(1.2rem, pxToVw(24,750), 2rem);
    }

    & > .en {
      font-size: 2.75em;
      font-weight: 800;
    }

    & > .ja {
      font-size: 1em;
    }
  }
}

.news {
  padding: 0 2em;
  margin: 4.5em auto 0;

  @media (--mobile) {
    padding: 0 1em;
  }

  & > .inner {
    position: relative;
    width: 100%;
    max-width: 108rem;
    margin: 0 auto;
  }

  & .ttlArea {
    display: flex;
    align-items: center;
    justify-content: space-between;

    @media (--mobile) {
      align-items: baseline;
    }
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

  & .dec {
    position: absolute;
    top: -3.5em;
    left: -5.5em;
    width: pxToPer(71,1080);

    @media screen and (width <= 1080px) {
      display: none;
    }

    @media (--sp) {
      top: -5em;
      left: 1em;
      display: block;
      width: pxToPer(60,450);
    }
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
    position: relative;
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

  & .decArea {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;

    & > .dec {
    position: absolute;

      &.-d01 {
        top: -6em;
        left: 2em;
        width: pxToPer(185,1300);
      }

      &.-d02 {
        top: 1em;
        right: 1.5em;
        width: pxToPer(71,1300);
      }

      &.-d03 {
        top: 30%;
        left: 3%;
        width: pxToPer(21,1300);
      }

      &.-d04 {
        right: 35%;
        bottom: -3em;
        width: pxToPer(177,1300);
      }

      @media (--mobile) {
        &.-d01 {
          top: -3em;
          left: 2em;
          width: pxToPer(120,450);
        }

        &.-d02 {
          top: 12em;
          right: 1em;
          width: pxToPer(50,450);
        }

        &.-d03 {
          display: none;
        }

        &.-d04 {
          right: 2%;
          bottom: 12em;
          width: pxToPer(120,450);
        }
      }
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
    position: relative;
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

  & .dec {
    position: absolute;
    bottom: 10%;
    left: -3.5em;
    width: pxToPer(86,710);

    @media (--sp) {
      top: -2em;
      right: 2em;
      left: auto;
      width: pxToPer(70,450);
    }
  }
}
</style>