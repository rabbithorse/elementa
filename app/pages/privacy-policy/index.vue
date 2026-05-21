<template>
  <div class="wrapper">
    <div class="inner">
      <hgroup class="pageTtl">
        <h1 class="en">PRIVACY POLICY</h1>
        <p class="ja">プライバシーポリシー</p>
      </hgroup>

      <article v-if="processedBody" class="body" v-html="processedBody" />
    </div>

  </div>
</template>

<script setup lang="ts">
import type { Documents } from '~~/types/Documents'

const post = ref<Documents>()
const processedBody = ref<string>('')

const contentId: string = 'privacy-policy'
const { data, error } = await useMicroCMSGetListDetail<Documents>({
endpoint: 'documents',
  contentId,
})

if (error.value) {
  navigateTo('/')
} else {
  post.value = data.value
  processedBody.value = data.value?.body ?? ''
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

useSeoMeta({
  title: `プライバシーポリシー | ${inject('globalSiteName')}`,
  ogTitle: `プライバシーポリシー | ${inject('globalSiteName')}`,
  ogUrl: `${inject('globalSiteUrl')}/privacy-policy/`,
})
</script>

<style scoped>
.wrapper {
  position: relative;
  width: 100%;
  padding: 3em 1em 8em;
  font-size: clamp(1.4rem, pxToVw(20,1400), 2rem);

  @media (--sp) {
    padding: 2em 1em 5em;
    font-size: clamp(1.2rem, pxToVw(16,450), 2rem);
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
</style>
