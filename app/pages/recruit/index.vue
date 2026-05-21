<template>
  <div class="wrapper">
    <hgroup class="pageTtl">
      <h1 class="en">RECRUIT</h1>
      <p class="ja">採用情報</p>
    </hgroup>


    <section class="overview">

      <div class="textArea">
        <p class="catchCopy">Elementa Japanは<br>ゲームの可能性を共に再定義し<br><span>「愛される楽しさ」</span>を創り出す<br>仲間を募集しています。</p>
        <div class="linkArea">
          <NuxtLink to="/contact/form/" class="defLink -ja">人事・採用関連お問い合わせ<i class="fas fa-arrow-right"></i></NuxtLink>
        </div>
      </div>

      <div class="imgArea">
        <NuxtImg src="/recruit/pic-recruit_dummy.png" alt="" format="webp" />
      </div>

    </section>

    <hgroup class="pageTtl">
      <h2 class="en">JOIN US</h2>
      <p class="ja">詳細</p>
    </hgroup>

    <section class="entryBox">
      <div class="inner">
        <p class="comingsoon">準備中</p>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
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
  display: flex;
  gap: 1em;
  align-items: center;
  justify-content: center;
  margin: 2em auto 5em;
  text-align: left;

  & > .textArea {
    display: inline-block;
    width: fit-content;
    max-width: 58rem;

    & > .catchCopy {
      margin-bottom: 1em;
      font-size: clamp(2rem, pxToVw(40,1400), 4rem);
      font-weight: 700;
      line-height: 1.4;
      word-break: auto-phrase;

      & > span {
        color: var(--color-base);
      }
    }

    & > .text {
      margin-bottom: 2em;
      font-size: clamp(1.2rem, pxToVw(18,1400), 1.8rem);
      line-height: 1.8;
      word-break: auto-phrase;
    }
  }

  & > .imgArea {
    width: pxToVw(600,1400);
    max-width: 60rem;
  }

  @media (--sp) {
    flex-direction: column;
    text-align: center;

    & > .textArea {
      order: 2;

      & > .catchCopy {
        font-size: clamp(1.5rem, pxToVw(26,450), 4rem);
      }
    }

    & > .imgArea {
      order: 1;
      width: 80%;
    }
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
