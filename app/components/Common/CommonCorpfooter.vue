<!-- 共通コーポレートフッター用コンポーネント -->
<template>
  <div class="footerArea">
    <button v-if="pagetop" class="Totop" :class="{ '-above': isFooterVisible }" @click="scrollTop">
      <i class="fa-light fa-arrow-up-to-line" />
      <span>PAGE TOP</span>
    </button>

    <footer ref="footer" class="CommonCorpfooter">
      <!-- <div class="brands">
        <div class="logo">
          <NuxtImg src="common/logo-corp_white.svg" alt="Happy Elements株式会社 Cacalia Studio" />
        </div>
      </div> -->

      <div class="info">
        <ul class="links">
          <li><NuxtLink to="/news/">ニュースリリース</NuxtLink></li>
          <li><NuxtLink to="/company/">企業情報</NuxtLink></li>
          <li><NuxtLink target="_blank" to="https://recruitment.happyelements.co.jp">採用情報 <i class="fal fa-window-restore" /></NuxtLink></li>
          <li><NuxtLink target="_blank" to="https://www.happyelements.co.jp/privacy-policy/">プライバシーポリシー</NuxtLink></li>
          <li><NuxtLink target="_blank" to="https://www.happyelements.co.jp/contents-guideline/">コンテンツ利用ガイドライン</NuxtLink></li>
          <li><NuxtLink to="/contact/">お問い合わせ</NuxtLink></li>
        </ul>
        <address class="copyright">© Happy Elements K.K</address>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
interface Props {
  pagetop?: boolean
}

const Props = withDefaults(defineProps<Props>(), {
  pagetop: true,
})

const scrollTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  })
}
const footer = ref(null)
const isFooterVisible = ref(false)
let observer = null

onMounted(() => {
  // フッターを監視するIntersection Observerの設定
  if (import.meta.client && 'IntersectionObserver' in window) {
    observer = new IntersectionObserver(
      ([entry]) => {
        isFooterVisible.value = entry.isIntersecting
      },
      {
        threshold: 0.1, // 10%見えた時点で検出
      },
    )

    if (footer.value) {
      observer.observe(footer.value)
    }
  }
})

onUnmounted(() => {
  // コンポーネントがアンマウントされる時にObserverを解放
  if (observer && footer.value) {
    observer.unobserve(footer.value)
    observer = null
  }
})
</script>

<style scoped>
.footerArea {
  position: relative;
  z-index: var(--zindex-footer);
  height: auto;
}

.Totop {
  position: fixed;
  right: 0;
  bottom: 0;
  z-index: calc(var(--zindex-footer) + 1);
  display: block;
  padding: 1em 2.5em 0;
  margin: 0 0 -1px auto;
  clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
  color: #fff;
  text-align: center;
  background-color: #101010;
  border: none;

  & > i { display: block; }

  & > span {
    font-size: x-small;
  }

  &.-above {
    position: absolute;
    bottom: auto;
    transform: translateY(-99%);
  }
}

.CommonCorpfooter {
  --height-footer-pc: 16.8rem;
  --height-footer-sp: auto; /* 33.725rem; */

  box-sizing: border-box;
  width: 100%;

  /* height: var(--height-footer-pc); */
  padding: 30px 30px 10px;
  font-family: -apple-system, BlinkMacSystemFont, 'Helvetica Neue', YuGothic, 'ヒラギノ角ゴ ProN W3', "Hiragino Kaku Gothic ProN", Arial, 'メイリオ', Meiryo, sans-serif;
  background-color: #101010;

  * {
    font-size: 1.6rem;
    font-feature-settings: 'palt' 1;
    line-height: 1.8;
    letter-spacing: 0.1em;
  }

  & img {
    position: relative;
  }

  & a {
    color: #fff !important;
    text-decoration: 1px #fff !important;
  }

  @media (--mobile) {
    box-sizing: border-box;
    width: 100%;
    height: var(--height-footer-sp);
    padding: 30px 30px 40px;
    background-color: #101010;

    * {
      font-size: 1.6rem;
      font-feature-settings: 'palt' 1;
      line-height: 1.8;
      letter-spacing: 0.1em;
    }

    & img {
      position: relative;
    }
  }
}

.brands {
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
  text-align: center;

  & > .logo {
    width: 83%;
    max-width: 300px;
    margin: 0 auto 40px;
    text-align: center;

    & > img {
      width: auto;
      max-width: 100%;
      height: auto;
      max-height: 100%;
    }
  }

  @media (--mobile) {
    width: 100%;
    max-width: 1000px;
    margin: 0 auto;
    text-align: center;

    & > .logo {
      margin: 0 auto 40px;
      text-align: center;

      & > img {
        max-width: 100%;
        height: auto;
      }
    }
  }
}

.info {
  display: flex;
  flex-flow: row wrap;
  align-items: baseline;
  justify-content: space-between;

  & > .links {
    display: flex;
    flex-direction: row;
    list-style: none;

    & li {
      width: auto;
      padding-right: 1em;
      margin: 0;
      border-bottom: none;
    }

    & a {
      display: inline;
      padding: 0;
      font-size: 12px;
      font-style: normal;
      font-weight: normal;
      color: #fff;

      /* text-decoration: underline !important; */

      & i {
        font-size: 1em;
      }
    }
  }

  & > .copyright {
    padding-top: 0;
    font-size: 12px;
    font-style: normal;
    font-weight: bold;
    color: #fff;
  }

  @media (--mobile) {
    flex-direction: column;
    justify-content: center;

    & > .links {
      flex-direction: column;
      justify-content: center;
      width: 100%;
      list-style: none;

      & > li {
        display: block;
        width: 90%;
        padding-right: 0;
        margin: 5px auto;
        border-bottom: solid 1px #505050;

        & > a {
          display: block;
          width: 100%;
          height: 100%;
          padding: 0.8em;
          font-size: 12px;
          font-style: normal;
          font-weight: normal;
          color: #fff;
          text-align: center;
          text-decoration: none !important;
        }
      }
    }

    & > .copyright {
      display: block;
      width: 100%;
      padding-top: 2em;
      font-size: 12px;
      font-style: normal;
      font-weight: bold;
      color: #fff;
      text-align: center;
    }
  }
}
</style>
