<template>
  <div class="wrapper">
    <hgroup class="pageTtl">
      <h1 class="en">COMPANY</h1>
      <p class="ja">会社情報</p>
    </hgroup>

    <div class="textArea">
      <p class="catchCopy">楽しさを、人生のエレメントに</p>

      <p class="text">Elementaは、2020年にシンガポールで設立されたグローバルゲームブランドです。<br>独創性と最先端技術を掛け合わせ、<br>没入感あるゲーム体験と映像・音響表現を通じて、<br>世界中のプレイヤーの心に残る感動を届けることを目指しています。<br></p>

      <p class="text">私たちElementa Japanは、ゲームを通じて日常に新たな楽しさを提供し、<br>ユーザーの皆様に長く愛される存在であり続けます。</p>
    </div>

    <div class="companyData">
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

    </div>

  </div>
</template>

<script setup lang="ts">
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
    word-break: auto-phrase;
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
}

.companyData {
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
}
</style>
