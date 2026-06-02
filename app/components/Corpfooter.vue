<template>
  <footer class="Corpfooter">

    <!-- <div class="sns">
      <p class="text">SNS</p>
      <NuxtLink to="https://x.com/" target="_blank" rel="noopener noreferrer"><i class="fa-brands fa-x-twitter"></i></NuxtLink>
      <NuxtLink to="https://www.instagram.com/" target="_blank" rel="noopener noreferrer"><i class="fa-brands fa-instagram"></i></NuxtLink>
    </div> -->

    <div class="info">
      <ul class="links">
        <li><NuxtLink to="/site-terms/">サイト利用規約</NuxtLink></li>
        <li><NuxtLink to="/privacy-policy/">プライバシーポリシー</NuxtLink></li>
        <!-- <li><NuxtLink to="/contents-guideline/">コンテンツ利用ガイドライン</NuxtLink></li> -->
      </ul>
      <address class="copyright">©Elementa K.K.</address>
    </div>
  </footer>
</template>

<script setup lang="ts">
interface Props {
  publish?: string
}
const Props = withDefaults(defineProps<Props>(), {
  publish: '',
})
</script>

<style scoped>
.Corpfooter {
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
  gap: 1em;
  align-items: last baseline;

  /* justify-content: space-between; */
  justify-content: flex-end;
  width: 100%;
  padding: 1.5em 1em 1em;
  font-size: clamp(1.2rem, pxToVw(16,1400), 1.6rem);
  font-weight: 500;
  font-feature-settings: 'palt' 1;
  line-height: 1.8;
  color: var(--color-fotter-text);
  letter-spacing: 0.1em;
  background-color: var(--color-fotter-background);

  & img {
    position: relative;
  }

  & a {
    color: #fff !important;
    text-decoration: 1px #fff !important;
  }

  @media screen and (width <= 600px) {
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 1.5em 1em 2em;
    text-align: center;
  }
}

.sns {
  display: flex;
  gap: 1em;
  align-items: center;
  font-size: clamp(1.2rem, pxToVw(20,1400), 2rem);

  & .text {
    font-size: 1em;
    font-weight: bold;
    color: #fff;
  }

  & a {
    font-size: 2em;
    color: #fff;
    text-decoration: none;
  }
}

.info {
  display: block;
  line-height: 1;
  text-align: right;

  & > .links {
    display: flex;
    flex-direction: row;
    list-style: none;

    & li {
      width: auto;
      margin: 0;
      border-bottom: none;

      & + li {
        &:before {
          display: inline-block;
          margin: 0 1em;
          color: #fff;
          content: '|';
        }
      }
    }

    & a {
      display: inline;
      padding: 0;
      font-weight: 500;
      color: #fff;
      text-decoration: none;
    }
  }

  & > .copyright {
    margin-top: .5em;
    font-style: normal;
    font-weight: 500;
    color: #fff;
  }

  @media screen and (width <= 600px) {
    width: 100%;
    max-width: 25em;
    text-align: center;

    & > .links {
      flex-direction: column;
      justify-content: center;
      width: 100%;
      list-style: none;

      & > li {
        display: block;
        width: 100%;
        border-bottom: solid 1px var(--color-hr_light);

        & + li:before {
          display: none;
        }

        & > a {
          display: block;
          width: 100%;
          height: 100%;
          padding: 1.5em 0;
          color: #fff;
          text-align: center;
        }
      }
    }

    & > .copyright {
      margin-top: 2em;
    }
  }

  /* @media (--sp) {
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
        margin: 10px auto;
        border-bottom: solid 1px #505050;

        & > a {
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
  } */
}
</style>
