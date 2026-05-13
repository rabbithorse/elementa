<template>
  <div class="wrapper">
    <Hero />

    <section class="news">
      <div class="inner">
        <hgroup class="secTtl">
          <h2 class="en">NEWS</h2>
          <p class="ja">お知らせ</p>
        </hgroup>

        <ul class="newsList">
          <li class="headline">
            <time datetime="2024-06-01">2024.06.01</time>
            <p class="title">新しいプロジェクトを開始しました。</p>
          </li>
          <li class="headline">
            <time datetime="2024-06-01">2024.06.01</time>
            <p class="title">新しいプロジェクトを開始しました。</p>
          </li>
          <li class="headline">
            <time datetime="2024-06-01">2024.06.01</time>
            <p class="title">新しいプロジェクトを開始しました。</p>
          </li>
        </ul>

        <div class="linkArea">
          <NuxtLink to="/news" class="link -en">MORE<i class="fas fa-arrow-right"></i></NuxtLink>
        </div>
      </div>
    </section>

    <section class="company">
      <div class="inner">
        <div class="imgArea">
          <NuxtImg src="/top/pic-company_01.png" alt="" format="webp" class="img -01" />
          <NuxtImg src="/top/pic-company_02.png" alt="" format="webp" class="img -02" />
        </div>
        <div class="textArea">
          <hgroup class="secTtl">
            <h2 class="en">COMPANY</h2>
            <p class="ja">会社情報</p>
          </hgroup>   
          <p class="text">素晴らしいゲーム体験は<br>独創性と<br>最先端技術の融合によって<br>生まれる。</p>
          <p class="text-en">We believe that exceptional games are born where creativity meets technology.</p>
          <div class="linkArea">
            <NuxtLink to="/company" class="link -ja">Elementaについて<i class="fas fa-arrow-right"></i></NuxtLink>
          </div>
        </div>
      </div>
    </section>

    <section class="recruit">
      <div class="inner">
        <div class="textArea">
          <hgroup class="secTtl">
            <h2 class="en">RECRUIT</h2>
            <p class="ja">採用情報</p>
          </hgroup>   
          <p class="text">素晴らしいゲームは<br>情熱を持つ人から<br>生まれる。</p>
          <p class="text-en">We believe every great game starts  with passionate people.</p>
          <div class="linkArea">
            <NuxtLink to="/recruit" class="link -ja">採用情報を見る<i class="fas fa-arrow-right"></i></NuxtLink>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
.wrapper {
  position: relative;
  width: 100%;
}

.news {
  padding: 0 1em;
  margin: 0 auto 2em;

  & > .inner {
    max-width: 108rem;
    margin: 0 auto;
  }
}
</style>