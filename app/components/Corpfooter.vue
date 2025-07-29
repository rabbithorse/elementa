<template>
  <footer class="Corpfooter">
    <div class="brands">
      <div class="logo">
        <NuxtImg src="common/logo-corp_white.svg" alt="Happy Elements株式会社 Cacalia Studio" />
      </div>
    </div>

    <div class="info">
      <ul class="links">
        <li><NuxtLink target="_blank" to="https://www.happyelements.co.jp">運営会社</NuxtLink></li>
        <li><NuxtLink target="_blank" to="https://www.happyelements.co.jp/privacy-policy/">プライバシーポリシー</NuxtLink></li>
        <li><NuxtLink target="_blank" to="https://www.happyelements.co.jp/contents-guideline/">コンテンツ利用ガイドライン</NuxtLink></li>
      </ul>
      <address class="copyright">© Happy Elements K.K</address>
    </div>
  </footer>
</template>

<style scoped>
.Corpfooter {
  --height-footer-pc: 16.8rem;
  --height-footer-sp: auto; /* 33.725rem; */

  box-sizing: border-box;
  width: 100%;
  height: var(--height-footer-pc);
  padding: 30px 30px 40px;
  font-family: -apple-system, BlinkMacSystemFont, 'Helvetica Neue', YuGothic, 'ヒラギノ角ゴ ProN W3', "Hiragino Kaku Gothic ProN", Arial, 'メイリオ', Meiryo, sans-serif;
  background-color: #101010;

  * {
    font-size: 1.6rem;
    font-feature-settings: 'palt' 1;
    line-height: 1.8;
    letter-spacing: 0.1em;
  }

  img {
    position: relative;
  }

  a {
    color: #fff !important;
    text-decoration: 1px #fff !important;
  }

  @media (--sp) {
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

    img {
      position: relative;
    }
  }
}

.brands {
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
  text-align: center;

  > .logo {
    width: 83%;
    max-width: 300px;
    margin: 0 auto 40px;
    text-align: center;

    > img {
      width: auto;
      max-width: 100%;
      height: auto;
      max-height: 100%;
    }
  }

  @media (--sp) {
    width: 100%;
    max-width: 1000px;
    margin: 0 auto;
    text-align: center;

    > .logo {
      margin: 0 auto 40px;
      text-align: center;

      > img {
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

  > .links {
    display: flex;
    flex-direction: row;
    list-style: none;

    li {
      width: auto;
      padding-right: 1em;
      margin: 0;
      border-bottom: none;
    }

    a {
      display: inline;
      padding: 0;
      font-size: 12px;
      font-style: normal;
      font-weight: normal;
      color: #fff;
      text-decoration: underline !important;
    }
  }

  > .copyright {
    padding-top: 0;
    font-size: 12px;
    font-style: normal;
    font-weight: bold;
    color: #fff;
  }

  @media (--sp) {
    flex-direction: column;
    justify-content: center;

    > .links {
      flex-direction: column;
      justify-content: center;
      width: 100%;
      list-style: none;

      > li {
        display: block;
        width: 90%;
        padding-right: 0;
        margin: 10px auto;
        border-bottom: solid 1px #505050;

        > a {
          display: block;
          width: 100%;
          height: 100%;
          padding: 0.5em;
          font-size: 12px;
          font-style: normal;
          font-weight: normal;
          color: #fff;
          text-align: center;
          text-decoration: none !important;
        }
      }
    }

    > .copyright {
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
