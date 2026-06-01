<template>
  <div class="wrapper">
    <section class="works">
      <div class="inner">
        <hgroup class="pageTtl">
          <h1 class="en">WORKS</h1>
          <p class="ja">運用タイトル</p>
        </hgroup>

        <template v-if="works && works.contents.length">
          <div class="contentsArea">
            <ul class="worksList">
              <li v-for="post in works.contents" :key="post.id" class="item" data-reveal>
                  <p class="title">{{ post.title }}</p>
                  <img v-if="post?.img" :src="`${post.img.url}?w=1000&fm=webp`" alt="" loading="lazy" class="cover">
                  <ul v-if="post.platform.length" class="platformList">
                    <li v-for="platform in post.platform" :key="platform" class="tag">
                      {{ platform }}
                    </li>
                  </ul>
                  <p class="text">{{ post.text }}</p>
                <NuxtLink :to="`${post.url}`" target="_blank" rel="noopener noreferrer" class="btn">公式サイトへ<i class="fa-utility fa-semibold fa-arrow-up-right-from-square"></i></NuxtLink>
              </li>
            </ul>            

            <div class="decArea">
              <FloatItem class="dec -d01" :duration="4.2" :delay="-0.2">
                <NuxtImg src="/dec/works-01.png" alt="" format="webp" />
              </FloatItem>
              <FloatItem class="dec -d02" :duration="4.6" :delay="-1.1">
                <NuxtImg src="/dec/works-02.png" alt="" format="webp" />
              </FloatItem>
              <FloatItem class="dec -d03" :duration="5" :delay="-2.3">
                <NuxtImg src="/dec/works-03.png" alt="" format="webp" />
              </FloatItem>
              <FloatItem v-if="!isEvenCount" class="dec -d04" :duration="4.4" :delay="-0.7">
                <NuxtImg src="/dec/works-04.png" alt="" format="webp" />
              </FloatItem>
              <FloatItem v-if="!isEvenCount" class="dec -d05" :duration="3.8" :delay="-1.6">
                <NuxtImg src="/dec/works-05.png" alt="" format="webp" />
              </FloatItem>
              <FloatItem v-if="!isEvenCount" class="dec -d06" :duration="4.8" :delay="-3">
                <NuxtImg src="/dec/works-06.png" alt="" format="webp" />
              </FloatItem>
            </div>
          </div>
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

// 運用タイトルが偶数件のときは右下の装飾を隠す
const isEvenCount = computed(() => {
  const len = works.value?.contents.length ?? 0
  return len > 0 && len % 2 === 0
})
useSeoMeta({
  title: `運用タイトル | ${inject('globalSiteName')}`,
  ogTitle: `運用タイトル | ${inject('globalSiteName')}`,
  ogUrl: `${inject('globalSiteUrl')}/works/`,
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
  })
})
</script>

<style scoped>
.wrapper {
  position: relative;
  width: 100%;
  padding: 3em 1em 5em;

  @media (--sp) {
    padding: 2em 1em 5em;
  }
}

.worksList {
  display: flex;
  flex-wrap: wrap;
  gap: 1.65em;
  width: 100%;
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

.contentsArea {
  position: relative;
  width: 100%;
  max-width: 113.7rem;
  padding-bottom: 9em;
  margin: 4em auto 0;
}

.decArea {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  font-size: clamp(0.75rem, pxToVw(20,1137), 2rem);
  pointer-events: none;

  & > .dec {
    position: absolute;

    &.-d01 {
      top: -5em;
      left: 0;
      width: pxToPer(87,1137);
    }

    &.-d02 {
      top: -8em;
      right: 3em;
      width: pxToPer(185,1137);
    }

    &.-d03 {
      bottom: 0;
      left: -2em;
      width: pxToPer(191,1137);
    }

    &.-d04 {
      right: 1em;
      bottom: 30em;
      width: pxToPer(177,1137);
    }

    &.-d05 {
      right: -1em;
      bottom: 28em;
      width: pxToPer(44,1137);
    }

    &.-d06 {
      right: 20em;
      bottom: 17em;
      width: pxToPer(94,1137);
    }

    @media(--sp) {
      &.-d01 {
        top: -13em;
        left: 2em;
        width: pxToPer(60,450);
      }

      &.-d02 {
        top: -10em;
        right: 1em;
        width: pxToPer(110,450);
      }

      &.-d03 {
        bottom: 0;
        left: 5em;
        width: pxToPer(120,450);
      }

      &.-d04, &.-d05, &.-d06 {
        display: none;
      }
    }
  }
}
</style>
