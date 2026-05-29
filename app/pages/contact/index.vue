<template>
  <div class="wrapper">
    <hgroup class="pageTtl">
      <h1 class="en">CONTACT</h1>
      <p class="ja">お問い合わせ</p>
    </hgroup>

    <section class="contactList">
      <div class="contactBranch -business">
        <h2 class="ttl"><i class="fa-regular fa-building icon"></i>法人のお客様</h2>
        <ul class="Linklist">
          <li class="item">
            <NuxtLink to="/contact/form-business_01" class="defLinkBtn">商品化・弊社著作物IPライセンスについて</NuxtLink>
          </li>
          <li class="item">
            <NuxtLink to="/contact/form-business_02" class="defLinkBtn">事業のご提案</NuxtLink>
          </li>
          <li class="item">
            <NuxtLink to="/contact/form-business_03" class="defLinkBtn">その他・総合お問い合わせ</NuxtLink>
          </li>
        </ul>
      </div>
      
      <div class="contactBranch -person">
        <h2 class="ttl"><i class="fa-regular fa-person-simple icon"></i>個人のお客様</h2>
        <ul class="Linklist">
          <li class="item">
            <NuxtLink to="/contact/form-person_01" class="defLinkBtn">各種ゲーム・サービスについて</NuxtLink>
          </li>
          <li class="item">
            <NuxtLink to="/contact/form-person_02" class="defLinkBtn">ご意見・要望、<br>ガイドライン違反・著作権侵害情報のご提供</NuxtLink>
          </li>
          <li class="item">
            <NuxtLink to="/contact/form-person_03" class="defLinkBtn">採用・求人に関するお問い合わせ</NuxtLink>
          </li>
        </ul>
      </div>
    </section>

    <!-- <section class="conBox">
      <div class="borderBox">
        <div class="textArea">
          <p class="text">当社より提供しております各種ゲームコンテンツをプレイする際の実況・配信関連のガイドラインは定めらておリます。ご確認くださいますようお願い申し上げます。</p>
        </div>
        <NuxtLink to="/streaming-guideline" class="defLinkBtn">ゲームの配信に関する<br>ガイドラインについて</NuxtLink>
      </div>
    </section> -->

    <!-- <section class="conBox">
      <div class="borderBox">
        <div class="textArea">
          <p class="text">ELEMENTA株式会社は、当社スタッフに対するカスタマーハラスメントへの対応方針を定めております、お問い合わせの際には、事前にご確認くださいますようお願い申し上げます。</p>
        </div>
        <NuxtLink to="/customer-harassment-policy" class="defLinkBtn">カスタマーハラスメントへの<br>対応方針について</NuxtLink>
      </div>
    </section> -->

  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: `お問い合わせ | ${inject('globalSiteName')}`,
  ogTitle: `お問い合わせ | ${inject('globalSiteName')}`,
  ogUrl: `${inject('globalSiteUrl')}/contact/`,
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

.contactList {
  display: flex;
  flex-wrap: wrap;
  gap: 1.7em;
  justify-content: center;
  margin: 5em auto;
  font-size: clamp(1.4rem, pxToVw(20,1400), 2rem);

  @media (--mobile) {
    gap: 2em;
    margin: 3em auto;
  }

  @media (--sp) {
    font-size: clamp(1.2rem, pxToVw(16,450), 2rem);
  }

  & > .contactBranch {
    width: calc(50% - .85em);
    max-width: 48rem;

    @media (--mobile) {
      width: 100%;
    }

    & .ttl {
      margin-bottom: 1em;
      font-size: 1em;
      font-weight: 600;

      & > .icon {
        display: inline-block;
        margin-right: .1em;
        font-size: 1.6em;
        color: var(--color-base);
      }
    }

    & .Linklist {
      list-style: none;

      & .item {
        & + .item {
          margin-top: 2em;
        }

        & > .defLinkBtn {
          width: 100%;
        }
      }
    }
  }
}

.conBox {
  font-size: clamp(1.4rem, pxToVw(20,1400), 2rem);

  & + .conBox {
    margin-top: 2.1em;
  }

  @media (--sp) {
    font-size: clamp(1.2rem, pxToVw(16,450), 2rem);
  }

  & > .borderBox {
    position: relative;
    display: flex;
    flex-wrap: wrap;
    gap: 2em;
    align-items: center;
    justify-content: center;
    width: 100%;
    max-width: 99.5rem;
    padding: 2.5em 0;
    margin: 0 auto;
    border: .4rem solid var(--color-base);
    border-radius: 1em;

    & > .textArea, .defLinkBtn {
      width: pxToPer(420,995);
    }

    @media (--mobile) {
      gap: 1.5em;
      max-width: 48rem;
      padding: 2em;

      & > .textArea, .defLinkBtn {
        width: 100%;
      }
    }

    @media (--sp) {
      padding: 1.5em 1.2em;
      border-width: .2rem;
      border-radius: 1.2em;
    }

    & > .textArea > .text {
      font-size: .9em;
      line-height: 1.8;
    }
  }
}
</style>
