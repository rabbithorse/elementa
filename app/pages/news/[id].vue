<template>
  <div class="wrapper">
    <article class="post">
      <div class="inner">
        <header class="head">
          <hgroup class="postTtl">
            <h1 class="title">{{ post?.title }}</h1>
            <h2 class="subTitle">{{ post?.subTitle }}</h2>
          </hgroup>
          <time v-if="post?.publishedAt" :datetime="String(post.publishedAt)" class="date"><span>{{ date(post.publishedAt) }}</span></time>
          <img v-if="post?.img" :src="`${post.img.url}?w=1000&fm=webp`" alt="" loading="lazy" class="cover">
        </header>

        <article v-if="processedBody" class="body" v-html="processedBody" />

        <div class="btnArea">
          <NuxtLink to="/news" class="btn">一覧へもどる</NuxtLink>
        </div>
      </div>
    </article>
  </div>
</template>

<script setup lang="ts">
import type { News } from '~~/types/News'

const { params } = useRoute()
const post = ref<News>()
const processedBody = ref<string>('')

if (!params.id) {
  navigateTo('/news')
} else {
  const contentId: string = Array.isArray(params.id) ? params.id[0]! : params.id
  const { data, error } = await useMicroCMSGetListDetail<News>({
    endpoint: 'news',
    contentId,
  })

  if (error.value) {
    navigateTo('/news')
  } else {
    post.value = data.value
    processedBody.value = data.value?.body ?? ''
  }

  useSeoMeta({
    title: `${post.value?.title} | お知らせ | ${inject('globalSiteName')}`,
    ogTitle: `${post.value?.title}| お知らせ | ${inject('globalSiteName')}`,
    ogUrl: `${inject('globalSiteUrl')}/news/${post.value?.id}/`,
  })
}

// microCMS の WYSIWYG 出力を整形(DOMParser は client 限定)
onMounted(() => {
  if (!post.value?.body) return

  const allowedTags = ['table', 'div']
  let html = post.value.body

  allowedTags.forEach((tag) => {
    const regex = new RegExp(`&lt;${tag}.+?/${tag}&gt;`, 'g')
    html = html.replace(regex, m =>
      m.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&nbsp;/g, ' '),
    )
  })

  const doc = new DOMParser().parseFromString(html, 'text/html')

  doc.body.querySelectorAll(':scope > br').forEach(el => el.remove())
  doc.body.querySelectorAll('p:empty').forEach(el => el.remove())

  // 段落先頭の <br> は除去するが、<p><br></p> のような空段落(意図的なスペース)は残す
  doc.body.querySelectorAll('p').forEach((el) => {
    if (el.firstChild?.nodeName === 'BR' && el.childNodes.length > 1) {
      el.removeChild(el.firstChild)
    }
  })

  const dedupBr = (node: Element) => {
    let child = node.firstChild
    while (child) {
      const next = child.nextSibling
      if (child.nodeName === 'BR' && next?.nodeName === 'BR') {
        node.removeChild(child)
      } else if (child.nodeType === Node.ELEMENT_NODE) {
        dedupBr(child as Element)
      }
      child = next
    }
  }
  dedupBr(doc.body)

  processedBody.value = doc.body.innerHTML
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

.inner {
  width: 100%;
  max-width: 108rem;
  margin: 0 auto;
  font-size: clamp(1.4rem, pxToVw(18,1400), 2rem);

  @media (--sp) {
    font-size: clamp(1.4rem, pxToVw(16,450), 1.8rem);
  }
}

.head {
  padding-bottom: 2em;
  margin-bottom: 2em;
  text-align: center;
  border-bottom: .1rem solid var(--color-hr_light);

  & > .postTtl {
    margin-top: .6em;
    font-size: 2.2em;
    font-weight: 800;
    line-height: 1.4;
    color: var(--color-base);
    word-break: auto-phrase;

    & > .title {
      font-size: 1em;
    }

    & > .subTitle {
      margin-top: .4em;
      font-size: .8em;
    }

    @media (--sp) {
      font-size: 1.5em;
    }
  }

  & > .date {
    position: relative;
    display: block;
    margin-top: 2em;
    font-size: .9em;
    font-weight: bold;
    color: var(--color-base);
    letter-spacing: .08em;

    & > span {
      position: relative;
      display: inline-block;
      padding: 0 .5em;
      background-color: #fff;
    }

    &:before {
      position: absolute;
      top: 50%;
      left: 0;
      display: block;
      width: 100%;
      height: .1rem;
      content: '';
      background-color: var(--color-base);
      transform: translateY(-50%);
    }
  }

  & > .cover {
    display: block;
    width: 100%;
    height: auto;
    margin-top: 2em;
    border-radius: .6em;
  }
}


.body {
  margin-top: 4em;
  font-size: 1em;
  line-height: 1.9;

  & :deep(p) {
    margin-top: 1em;

    & > .caution {
      display: block;
      padding-left: 1.2em;
      font-size: .85em;
      line-height: 1.6;
      text-indent: -1.2em;

      &:before {
        margin-right: .2em;
        content: '※';
      }
    }

    &:first-child {
      margin-top: 0;
    }
  }

  &:deep(h1) {
    padding: 0 0 .3em;
    margin: 2em auto 1em;
    font-size: 1.8em;
    line-height: 1.4;
    color: var(--color-base);
    border-bottom: .2rem solid var(--color-base);
  }

  & :deep(h2) {
    padding-bottom: .4em;
    margin: 2em auto 1em;
    font-size: 1.4em;
    font-weight: bold;
    line-height: 1.4;
    border-bottom: .2rem dotted var(--color-base);
  }

  & :deep(h3) {
    margin: 2em 0 .8em;
    font-size: 1.2em;
    font-weight: bold;
    line-height: 1.4;

    &:before {
      margin-right: .3em;
      color: var(--color-base);
      content: '■';
    }
  }

  & :deep(h4) {
    position: relative;
    padding-left: .8em;
    margin: 2em 0 .8em;
    font-size: 1em;
    font-weight: bold;
    line-height: 1.4;

    &:before {
      position: absolute;
      top: 0;
      left: 0;
      width: .2em;
      height: 100%;
      color: var(--color-base);
      content: '';
      background-color: var(--color-base);
    }
  }

  & :deep(ul),
  & :deep(ol) {
    padding-left: 1.5em;
    margin: 1em 0;
  }

  & :deep(li) + li {
    margin-top: .3em;
  }

  &:deep(code) {
    padding: .3em .5em;
    font-size: .95em;
    color: #fff;
    background-color: var(--color-base);
    border-radius: .3em;
  }
  
  &:deep(pre) {
    padding: .3em .5em;
    font-size: .95em;
    line-height: 1.5;
    color: #fff;
    background-color: var(--color-base);
    border-radius: .3em;

    & > code {
      padding: 0;
      font-size: 1em;
      color: #fff;
      background-color: transparent;
    }
  }

  & :deep(blockquote) {
    padding: 1em 1.2em;
    margin: 1.5em 0;
    font-size: .95em;
    background-color: var(--color-bg_light);
    border-left: .3rem solid var(--color-base);
  }

  & :deep(a) {
    padding-bottom: .1em;
    color: var(--color-base);
    text-decoration: none;
    border-bottom: .1rem solid var(--color-base);
    transition: opacity .25s;

    &:hover {
      opacity: .7;
    }
  }

  & :deep(a[target="_blank"]):after {
    display: inline-block;
    padding-left: .2em;
    font-family: 'Font Awesome 7 Pro', sans-serif;
    font-size: .9em;
    font-weight: 900;
    content: '\f08e';
  }

  & :deep(img) {
    display: block;
    max-width: 100%;
    height: auto;
    margin: 1.5em auto;
    border-radius: .4em;
  }

  & :deep(table) {
    width: 100%;
    margin: 1.5em 0;
    border-collapse: collapse;
  }

  & :deep(th),
  & :deep(td) {
    padding: .6em 1em;
    border: .1rem solid var(--color-hr_light);
  }

  & :deep(th) {
    text-align: left;
    background-color: var(--color-bg_light);
  }

  &:deep(hr) {
    margin: 3em auto;
    border: none;
    border-top: .1rem solid var(--color-hr_light);
  }
}

.btnArea {
  margin-top: 4em;
  text-align: center;

  @media (--sp) {
    margin-top: 3em;
  }
}

.btn {
  position: relative;
  display: inline-flex;
  align-items: center;
  padding: 1.5em 3em 1.5em 4.2em;
  font-size: clamp(1.4rem, pxToVw(18,1400), 1.8rem);
  font-weight: 600;
  line-height: 1.1;
  color: #fff;
  text-decoration: none;
  background-color: #000;
  border-radius: .4em;

  &:before {
    position: absolute;
    top: 50%;
    left: 1.5em;
    margin-right: .5em;
    font-family: 'Font Awesome 7 Pro', sans-serif;
    font-weight: 900;
    content: '\f104';
    transition: transform .25s;
    transform: translate(.3em,-50%);
  }

  &:hover:before {
    transform: translate(0,-50%);
  }
}
</style>
