<template>
  <div class="wrapper">
    <hgroup class="pageTtl">
      <h1 class="en">RECRUIT</h1>
      <p class="ja">採用情報</p>
    </hgroup>


    <section class="overview" data-reveal-fade>

      <div class="imgArea">
        <NuxtImg src="/recruit/pic-recruit_pc.png" alt="" format="webp" class="img -pc" />
        <NuxtImg src="/recruit/pic-recruit_sp.png" alt="" format="webp" class="img -sp" />
      </div>

      <div class="textArea" data-reveal>
        <p class="catchCopy">Elementa Japanは<br>ゲームの可能性を共に再定義し<br><span>「愛される楽しさ」</span>を創り出す仲間を募集しています。</p>
      </div>

    </section>

    <div class="linkArea" data-reveal>
      <NuxtLink to="/contact/form-person_03/" class="defLink -ja"><span>人事・採用関連お問い合わせ</span><i class="fas fa-arrow-right"></i></NuxtLink>
    </div>

    <hgroup class="pageTtl" data-reveal>
      <h2 class="en">JOIN US</h2>
      <p class="ja">詳細</p>
    </hgroup>

    <section class="entryBox" data-reveal>
      <div class="inner">
        <p class="comingsoon">準備中</p>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
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
useSeoMeta({
  title: `採用情報 | ${inject('globalSiteName')}`,
  ogTitle: `採用情報 | ${inject('globalSiteName')}`,
  ogUrl: `${inject('globalSiteUrl')}/recruit/`,
})
</script>

<style scoped>
.wrapper {
  position: relative;
  width: 100%;
  min-height: 90vh;
  padding: 3em 1em 8em;
  font-size: clamp(1.4rem, pxToVw(20,1400), 2rem);

  @media (--sp) {
    padding: 2em 1em 5em;
    font-size: clamp(1.2rem, pxToVw(16,450), 2rem);
  }
}

.overview {
  position: relative;
  width: 100%;
  max-width: 140rem;
  padding: 0 1em .5em;
  margin: 0 auto;
  margin: 2em auto 5em;
  text-align: center;

  &:before {
    position: absolute;
    top: 15%;
    left: 0;
    width: 100%;
    height: 100%;
    content: '';
    background: #e2efff;
    border-radius: 50%;
  }

  & > .textArea {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    font-size: clamp(1.5rem, pxToVw(32,1400), 3.2rem);
    transform: translateY(25%);

    & > .catchCopy {
      margin-bottom: 1em;
      font-size: 1em;
      font-weight: 700;
      line-height: 1.6;
      word-break: auto-phrase;

      & > span {
        color: var(--color-base);
      }
    }
  }

  & > .imgArea {
    position: relative;
    width: 100%;
    padding-right: 2em;

    & > .img {
      display: block;
      width: 100%;
      height: auto;

      &.-pc {
        display: block;
      }

      &.-sp {
        display: none;
      }
    }
  }

  @media (--mobile) {
    padding: 0;
    margin-bottom: 5em;

    &:before {
      top: 0;
      left: 50%;
      width: 140%;
      height: 90%;
      transform: translate(-50%, 20%);
    }

    & > .textArea {
      position: relative;
      font-size: clamp(1.2rem, pxToVw(28,768), 4rem);
      transform: translateY(-1em);
    }

    & > .imgArea {
      width: 100%;
      padding-right: 2em;
      margin: 0 auto;

      & > .img {
        &.-pc {
          display: none;
        }

        &.-sp {
          display: block;
        }
      }
    }
  }

  @media (--sp) {
    &:before {
      height: 85%;
    }

    & > .imgArea {
      padding-right: 1.5em;
    }

    margin-bottom: 2em;
  }
}

.linkArea {
  width: 100%;
  max-width: 100rem;
  margin: 0 auto 5em;
  font-size: clamp(1.2rem, pxToVw(22,1000), 2.2rem);
  text-align: right;

  @media (--sp) {
    font-size: clamp(1.2rem, pxToVw(18,450), 2.2rem);
  }
}

.entryBox {
  width: 100%;
  max-width: 103rem;
  margin: 0 auto;
  text-align: center;

  & .comingsoon {
    margin-top: 2em;
    font-size: clamp(1.4rem, 1.5em, 3rem);
    font-weight: 700;

    @media (--sp) {
      font-size: clamp(1.2rem, 1.3em, 2.4rem);
    }
  }
}
</style>
