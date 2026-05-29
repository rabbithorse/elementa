<template>
  <div class="Hero">
    <div class="bg">
      <div class="contentsArea">
        <Splide :options="options" aria-label="slide">
          <SplideSlide class="item">
            <video src="/movie/silverpalace.mp4" autoplay loop muted playsinline />
            <div class="contentsData">
              <div class="logo">
                <NuxtImg src="/common/pic-logo_silverpalace.png" alt="白銀の城" format="webp" />
              </div>
              <div class="linkArea">
                <NuxtLink to="https://silverpalace.elementagames.com/ja-jp" class="defLink -ja" target="_blank" rel="noopener noreferrer"><span>白銀の城公式サイトへ</span><i class="fas fa-arrow-right"></i></NuxtLink>
              </div>
            </div>
          </SplideSlide>
          <SplideSlide class="item">
            <video src="/movie/vproject.mp4" autoplay loop muted playsinline />
            <div class="contentsData">
              <div class="logo">
                <NuxtImg src="/common/pic-logo_vproject.png" alt="V Project" format="webp" />
              </div>
              <div class="linkArea">
                <NuxtLink to="https://vproject.elementagames.com/ja-jp" class="defLink -ja" target="_blank" rel="noopener noreferrer"><span>V Project公式サイトへ</span><i class="fas fa-arrow-right"></i></NuxtLink>
              </div>
            </div>
          </SplideSlide>
        </Splide>
      </div>
    </div>
    <h1 class="catch"><span>楽しさを、</span><br><span>人生のエレメントに</span></h1>
  </div>
</template>

<script setup lang="ts">
const { $gsap } = useNuxtApp()

const options = ref({
  type: 'fade',
  rewind: true,
  autoplay: true,
  interval: 8000,
  speed: 800,
  arrows: false,
  pauseOnHover: false,
  pagination: false, // メインスライダーではページネーションを非表示
})

// .catch のライン描画 → リビール → キープ → 隠す → ラインを引き戻す
const playCatchAnimation = () => {
  const tl = $gsap.timeline()

  // Phase 0: 白いラインが左から右に描画される(span を scaleX 0 → 1)
  tl.to('.catch > span', {
    scaleX: 1,
    duration: 0.6,
    ease: 'power2.out',
    stagger: 0.15,
  })
    // Phase 1: マスクを右にスライド → 文字が現れる
    .to('.catch > span', {
      '--bar-x': '100%',
      duration: 0.8,
      ease: 'power2.out',
      stagger: 0.15,
    })
    // キープ
    .to({}, { duration: 1.5 })
    // Phase 2: マスクを左から戻して文字を覆う
    .set('.catch > span', { '--bar-x': '-100%' })
    .to('.catch > span', {
      '--bar-x': '0%',
      duration: 0.8,
      ease: 'power2.in',
      stagger: 0.15,
    })
    // Phase 3: ラインを左→右に消す(origin を右に切り替えて scaleX 1 → 0)
    .set('.catch > span', { transformOrigin: 'right center' })
    .to('.catch > span', {
      scaleX: 0,
      duration: 0.5,
      ease: 'power2.in',
      stagger: 0.15,
    })
}

onMounted(() => {
  // Opening が body.-loaded を付けるのを待ってから開始
  if (document.body.classList.contains('-loaded')) {
    playCatchAnimation()
    return
  }
  const observer = new MutationObserver(() => {
    if (document.body.classList.contains('-loaded')) {
      observer.disconnect()
      playCatchAnimation()
    }
  })
  observer.observe(document.body, { attributes: true, attributeFilter: ['class'] })
  onBeforeUnmount(() => observer.disconnect())
})
</script>

<style scoped>
.Hero {
  position: relative;
  width: 100%;
  height: auto;
  aspect-ratio: 16 / 9;

  & > .bg {
    width: 100%;
    height: 100%;
    background: #000;

    & > .contentsArea {
      position: relative;
      width: 100%;
      height: 100%;

      &:deep(.splide), &:deep(.splide__track) {
        width: 100%;
        height: 100%;
      }

      &:deep(video) {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      &:deep(.contentsData) {
        position: absolute;
        right: 01em;
        bottom: 1em;
        width: pxToPer(520,1400);
        text-align: right;
        transform: translate(0%, 0%);

        & > .logo {
          display: block;
          width: 100%;
          margin-bottom: .5em;

          & > img {
            width: 100%;
            height: auto;
          }
        }

        & > .linkArea {
          padding-right: 1em;

          & > .defLink {
            color: #fff;
          }
        }

        @media (--mobile) {
          width: 100%;

          & > .logo {
            width: 45%;
            max-width: 52rem;
            margin-right: 0;
            margin-left: auto;
          }

          & > .linkArea {
            padding-right: 0;
          }
        }
      }
    }
  }
}

.catch {
  position: absolute;
  top: 50%;
  left: 0;
  width: 50%;
  padding: 0 0 0 1.5em;
  font-size: pxToVw(65,1400);
  font-weight: bold;
  line-height: 1;
  color: #fff;
  letter-spacing: 0; /* 末尾文字の右にマスクがはみ出さないように */
  transform: translateY(-50%);

  & > span {
    --bar-x: 0%; /* 0% = 文字を覆って隠している状態 / 100% = 右に外れて文字が見えている状態 */

    position: relative;
    display: inline-block;
    overflow: hidden;
    transform: scaleX(0); /* GSAP で左→右に伸ばす(白いラインの描画演出) */
    transform-origin: left center;

    &:before {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      content: '';
      background: #fff;
      transform: translateX(var(--bar-x));
    }
  }
}
</style>
