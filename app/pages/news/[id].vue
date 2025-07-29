<template>
  <div>
    <CommonPost :cover="data.cover?.url || '/common/pic-cover.jpg'">
      <header>
        <h1>{{ data.title }}</h1>
        <time v-if="data.publishedAt" :datetime="data.publishedAt">{{ date(data.publishedAt) }}</time>
        <NuxtImg v-if="data.cover" :src="`${data.cover.url}?fm=webp&q=50`" :alt="data.cover.alt" class="cover" />
        <p v-if="data.subTitle">{{ data.subTitle }}</p>
      </header>
      <div class="styleFormat -post" v-html="processedBody" />

      <template v-if="data.collaboAppInfo.length">
        <div class="styleFormat -post infoArea">
          <h1>コラボアプリ情報</h1>
          <table>
            <tbody>
              <tr v-for="(info, index) in data.collaboAppInfo" :key="index">
                <th>{{ info.title }}</th>
                <td>{{ info.body }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </template>

      <template v-if="data.appInfos.length">
        <div class="styleFormat -post infoArea">
          <h1>アプリ情報</h1>
          <table v-for="(info, index) in data.appInfos" :key="index">
            <tbody>
              <tr>
                <th>タイトル</th>
                <td>{{ info.title }} {{ info.subTitle }}</td>
              </tr>
              <tr v-if="info.dev.includes('grimoire')">
                <th>開発・運営</th>
                <td>株式会社グリモア</td>
              </tr>
              <tr v-if="info.dev.includes('grimoire')">
                <th>パブリッシング</th>
                <td>Happy Elements株式会社</td>
              </tr>
              <tr v-if="info.genre">
                <th>ジャンル</th>
                <td>{{ info.genre }}</td>
              </tr>
              <tr v-if="info.platform">
                <th>プラットフォーム</th>
                <td>{{ info.platform }}</td>
              </tr>
              <tr v-if="info.language">
                <th>対応言語</th>
                <td>{{ info.language }}</td>
              </tr>
              <tr v-if="info.price">
                <th>価格</th>
                <td>{{ info.price }}</td>
              </tr>
              <tr v-if="info.appStoreURL">
                <th>AppStore</th>
                <td><NuxtLink :to="info.appStoreURL" target="_blank">{{ info.appStoreURL }}</NuxtLink></td>
              </tr>
              <tr v-if="info.googlePlayURL">
                <th>GooglePlay</th>
                <td><NuxtLink :to="info.googlePlayURL" target="_blank">{{ info.googlePlayURL }}</NuxtLink></td>
              </tr>
              <tr v-if="info.desktopURL">
                <th v-if="info.subTitle === 'Basic'">DMM GAMES</th>
                <th v-else>PC</th>
                <td><NuxtLink :to="info.desktopURL" target="_blank">{{ info.desktopURL }}</NuxtLink></td>
              </tr>
              <tr v-if="info.nintendoURL">
                <th>ニンテンドーeショップ</th>
                <td><NuxtLink :to="info.nintendoURL" target="_blank">{{ info.nintendoURL }}</NuxtLink></td>
              </tr>
              <tr v-if="info.releaseDate">
                <th>配信日</th>
                <td>{{ info.releaseDate }}</td>
              </tr>
              <tr v-if="info.officialSiteURL">
                <th>公式サイト</th>
                <td><NuxtLink :to="info.officialSiteURL" target="_blank">{{ info.officialSiteURL }}</NuxtLink></td>
              </tr>
              <tr v-if="info.twitterID">
                <th>公式X（旧Twitter）</th>
                <td><NuxtLink :to="'https://x.com/' + info.twitterID" target="_blank">@{{ info.twitterID }}</NuxtLink><div v-if="info.title === 'あんさんぶるスターズ！！'" class="enstaInfo">、<NuxtLink to="https://x.com/ensemble_stars" target="_blank">@ensemble_stars</NuxtLink></div></td>
              </tr>
            </tbody>
          </table>
        </div>
      </template>

      <div class="btnArea">
        <NuxtLink to="/news/" class="btn -back">一覧へもどる</NuxtLink>
      </div>
    </CommonPost>
  </div>
</template>

<script setup lang="ts">
import type { News } from '~~/types/News'

const processedBody = ref('')
const { params } = useRoute()

const { data } = await useMicroCMSGetListDetail<News>({
  endpoint: 'news',
  contentId: Array.isArray(params.id) ? params.id[0] : params.id,
})

onMounted(() => {
  const allowedTags = ['table', 'div']
  let processedContent = data.value.body

  // 特定のタグのエスケープを解除
  allowedTags.forEach((tag) => {
    const regex = new RegExp(`&lt;${tag}.+?/${tag}&gt;`, 'g')
    const matches = processedContent.match(regex)

    if (matches) {
      matches.forEach((match: string) => {
        const html = match.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&nbsp;/g, ' ')
        processedContent = processedContent.replace(match, html)
      })
    }
  })

  // HTML文字列をDOMに変換
  const parser = new DOMParser()
  const doc = parser.parseFromString(processedContent, 'text/html')

  // 直下のbrタグを削除
  doc.body.querySelectorAll('body > br').forEach(el => el.remove())

  // 空のpタグを削除
  doc.body.querySelectorAll('p:empty').forEach(el => el.remove())

  // pタグ内の処理
  doc.body.querySelectorAll('p').forEach((el) => {
    // pタグの開始直後のbrタグを削除
    if (el.firstChild && el.firstChild.nodeName === 'BR') {
      el.removeChild(el.firstChild)
    }

    // 内容が空、<br>のみ、または&nbspのみの場合、pタグを完全に削除
    const content = el.innerHTML.trim()
    if (content === '' || content === '<br>' || content === '&nbsp;') {
      if (el.parentNode) {
        el.parentNode.removeChild(el)
      }
    }
  })

  // 連続するbrタグを削除
  const removeContinuousBr = (node: HTMLElement) => {
    if (node.nodeType === Node.ELEMENT_NODE) {
      let child = node.firstChild
      while (child) {
        const nextChild = child.nextSibling
        if (child.nodeName === 'BR' && nextChild && nextChild.nodeName === 'BR') {
          node.removeChild(child)
        }
        else {
          removeContinuousBr(child as HTMLElement)
        }
        child = nextChild
      }
    }
  }
  removeContinuousBr(doc.body)

  // 処理後のHTMLを文字列に戻す
  processedBody.value = doc.body.innerHTML
})

useSeoMeta({
  title: `${data.value.title} | ${inject('globalSiteName')}`,
  ogTitle: `${data.value.title} | ${inject('globalSiteName')}`,
  ogUrl: inject('globalSiteUrl') + useRoute().path,
})
</script>

<style scoped>
header {
  margin-bottom: var(--bs);
  text-align: center;

  & > h1 {
    font-size: 3.2rem;
    font-weight: 800;
    line-height: 1.2;
    word-break: auto-phrase;

    @media (--mobile) {
      font-size: 2.4rem;
    }

    @media (--mobile) {
      font-size: 2rem;
    }
  }

  & .cover {
    margin-top: var(--bs);
  }

  & > p {
    margin-top: var(--bs);
    font-size: 2.4rem;
    font-weight: bold;
    line-height: 1.8;

    @media (--mobile) {
      font-size: 1.6rem;
    }
  }
}

time {
  display: flex;
  flex-direction: row;
  gap: calc(var(--bs) *.5);
  place-items: center;
  margin-top: var(--bs);
  font-family: Oswald, sans-serif;
  font-size: .75rem;
  letter-spacing: .125em;
  font-display: swap;

  &:after {
    display: block;
    width: 100%;
    height: 1px;
    content: '';
    background-color: #000;
  }

  &:before {
    display: block;
    width: 100%;
    height: 1px;
    content: '';
    background-color: #000;
  }
}

.infoArea {
  margin-top: calc(var(--bs) *2);

  & table {
    width: 100%;
    table-layout: fixed;
    border-collapse: collapse;

    & th {
      width: 20%;
    }

    & th, & td {
      padding: calc(var(--bs) *.5);
      line-height: 1.4;
    }

    @media (--mobile) {
      margin-top: calc(var(--bs) *2);
      border: 1px solid #111;

      & th, & td {
        display: block;
        width: 100%;
        padding: .5em;
        text-align: center;
        border: none;
      }

      & th {
        color: #fff;
        background-color: #111;
      }

      & td {
        padding: .8em .5em;
      }
    }
  }
}

.appInfo {
  & ul {
    list-style-type: none;
  }
}

.enstaInfo {
  display: inline-block;
}
</style>
