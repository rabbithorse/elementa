<template>
  <div class="wrapper">
    <hgroup class="pageTtl">
      <h1 class="en">COMPANY</h1>
      <p class="ja">会社情報</p>
    </hgroup>

    <div class="textArea" data-reveal-fade>
      <p class="catchCopy" data-reveal><span>楽しさを、</span><span>人生のエレメントに</span></p>

      <p class="text" data-reveal>Elementaは、2020年にシンガポールで設立されたグローバルゲームブランドです。<br>独創性と最先端技術を掛け合わせ、<br>没入感あるゲーム体験と映像・音響表現を通じて、<br>世界中のプレイヤーの心に残る感動を届けることを目指しています。<br></p>

      <p class="text" data-reveal>私たちElementa Japanは、ゲームを通じて日常に新たな楽しさを提供し、<br>ユーザーの皆様に長く愛される存在であり続けます。</p>
      <div class="decArea" data-reveal-fade>
        <FloatItem class="dec -d01" :duration="4.2" :delay="-0.2">
          <NuxtImg src="/dec/company-01.png" alt="" format="webp" />
        </FloatItem>
        <FloatItem class="dec -d02" :duration="4.6" :delay="-1.1">
          <NuxtImg src="/dec/company-02.png" alt="" format="webp" />
        </FloatItem>
        <FloatItem class="dec -d03" :duration="5" :delay="-2.3">
          <NuxtImg src="/dec/company-03.png" alt="" format="webp" />
        </FloatItem>
        <FloatItem class="dec -d04" :duration="4.4" :delay="-0.7">
          <NuxtImg src="/dec/company-04.png" alt="" format="webp" />
        </FloatItem>
      </div>
    </div>

    <div class="companyData" data-reveal-fade>
      <h2 class="subTtl">会社概要</h2>

      <dl>
        <dt>社名</dt>
        <dd>ELEMENTA 株式会社（Elementa Japan）</dd>

        <dt>所在地</dt>
        <dd>〒130-0025 東京都墨田区千歳三丁目<br>6番 5号 209室プロス森下</dd>

        <dt>代表取締役</dt>
        <dd>セキ ヤンヤン</dd>

        <dt>設立日</dt>
        <dd>2025年3月5日</dd>

        <dt>資本金</dt>
        <dd>5,000 万円</dd>

        <dt>事業内容</dt>
        <dd>ゲーム開発・運営</dd>

        <dt>お問合せ先</dt>
        <dd>contact@elementa.co.jp</dd>
      </dl>
      <div class="decArea">
        <FloatItem class="dec -d05" :duration="3.8" :delay="-1.6">
          <NuxtImg src="/dec/company-05.png" alt="" format="webp" />
        </FloatItem>
        <FloatItem class="dec -d06" :duration="4.8" :delay="-3">
          <NuxtImg src="/dec/company-06.png" alt="" format="webp" />
        </FloatItem>
      </div>
    </div>

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
  title: `会社情報 | ${inject('globalSiteName')}`,
  ogTitle: `会社情報 | ${inject('globalSiteName')}`,
  ogUrl: `${inject('globalSiteUrl')}/company/`,
})
</script>

<style scoped>
.wrapper {
  position: relative;
  width: 100%;
  padding: 3em 1em 8em;
}

.textArea {
  position: relative;
  width: 100%;
  max-width: 126.2rem;
  margin: 3.5em auto 6em;
  font-size: clamp(1.4rem, pxToVw(24,1400), 2.4rem);
  text-align: center;

  @media (--sp) {
    font-size: clamp(1.2rem, pxToVw(18,450), 2.4rem);
  }

  & > .catchCopy {
    margin-bottom: 1.5em;
    font-size: 2.08em;
    font-weight: bold;
    line-height: 1.2;
    color: var(--color-base);

    & > span {
      display: inline-block;
    }
  }

  & > .text {
    font-size: 1em;
    font-weight: 600;
    line-height: 2;
    word-break: auto-phrase;

    & + .text {
      margin-top: 2em;
    }
  }

  & .decArea {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    font-size: clamp(0.75rem, pxToVw(20,1262), 2rem);
    pointer-events: none;

    & > .dec {
      position: absolute;

      &.-d01 {
        top: -9em;
        left: 5em;
        width: pxToPer(175,1262);
      }

      &.-d02 {
        top: 0;
        left: 2.5em;
        width: pxToPer(42,1262);
      }

      &.-d03 {
        top: 0;
        right: -1em;
        width: pxToPer(174,1262);
      }

      &.-d04 {
        bottom: -1em;
        left: 0;
        width: pxToPer(193,1262);
      }

      @media(--mobile) {
        &.-d01 {
          top: -18em;
          left: 5em;
        }

        &.-d02 {
          top: -9em;
          left: 2.5em;
        }

        &.-d03 {
          top: -9em;
          right: 0;
        }

        &.-d04 {
          bottom: -8em;
        }
      }

      @media(--sp) {
        &.-d01 {
          top: -13em;
          left: 1em;
          width: pxToPer(100,450);
        }

        &.-d02 {
          top: 0;
          left: 1em;
          width: pxToPer(24,450);
        }

        &.-d03 {
          top: -6em;
          right: -1em;
          width: pxToPer(87,450);
        }

        &.-d04 {
          bottom: -10em;
          left: 2em;
          width: pxToPer(96,450);
        }
      }
    }
  }
}

.companyData {
  position: relative;
  display: flex;
  flex-wrap: wrap;
  gap: 4em;
  width: 100%;
  max-width: 108rem;
  margin: 0 auto;

  @media (--mobile) {
    flex-direction: column;
    gap: 2em;
  }

  & > .subTtl {
    position: relative;
    padding-top: 1.5em;
    font-size: clamp(1.6rem, pxToVw(26,1400), 2.6rem);
    font-weight: 600;
    line-height: 1.2;

    &:before {
      color: var(--color-base);
      content: '■';
    }
  }

  & dl {
    display: flex;
    flex-wrap: wrap;
    width: calc(100% - 12em);
    font-size: clamp(1.4rem, pxToVw(20,1400), 2rem);

    & > dt, & > dd {
      padding: 2em;
      line-height: 1.4;
    }

    & > dt {
      display: flex;
      align-items: center;
      width: 12.5em;
      font-weight: 600;
      border-bottom: .1rem solid var(--color-base);

      &:nth-of-type(1) {
        border-top: .1rem solid var(--color-base);
      }
    }

    & > dd {
      width: calc(100% - 12.5em);
      word-break: break-all;
      border-bottom: .1rem solid var(--color-hr_light);

      &:nth-of-type(1) {
        border-top: .1rem solid var(--color-hr_light);
      }
    }

    @media (--mobile) {
      width: 100%;

      @media (--sp) {
        & > dt, & > dd {
          padding: 1.5em 1em;
        }

        & > dt {
          width: 8em;

        }

        & > dd {
          width: calc(100% - 8em);
        }
      }
    }
  }

  & .decArea {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    font-size: clamp(0.75rem, pxToVw(20,1080), 2rem);
    pointer-events: none;

    & > .dec {
      position: absolute;

      &.-d05 {
        right: -4em;
        bottom: 15%;
        width: pxToPer(88,1080);
      }

      &.-d06 {
        top: 40%;
        left: 2.5em;
        width: pxToPer(72,1080);
      }

      @media(--mobile) {
        &.-d05 {
          right: 0;
          bottom: 15%;
        }

        &.-d06 {
          display: none;
        }
      }

      @media(--sp) {
        &.-d05 {
          right: 0;
          bottom: -9em;
          width: pxToPer(88,450);
        }
      }
    }
  }
}
</style>
