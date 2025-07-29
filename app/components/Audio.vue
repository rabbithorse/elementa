<template>
  <div class="Audio">
    <button :data-src="src" @click="player">
      {{ label }}
    </button>
    <audio :data-src="src" preload="auto">
      <source :src="audioData" type="audio/mpeg">
    </audio>
  </div>
</template>

<script setup lang="ts">
interface Props {
  label: string
  src?: string
}

const Props = withDefaults(defineProps<Props>(), {
  label: 'Audio',
  src: 'dummy',
})
const audioData = '/sounds/' + Props.src + '.mp3'

const src: Ref<string | undefined> = ref(Props.src)
const player = () => {
  const audios = document.querySelectorAll<HTMLAudioElement>('audio')
  for (let i = 0; i < audios.length; i++) {
    audios[i].addEventListener(
      'play',
      function () {
        for (let j = 0; j < audios.length; j++) {
          if (audios[j] !== this) {
            audios[j].pause()
            audios[j].currentTime = 0
          }
        }
      },
      false,
    )
  }
  const trigger = document.querySelector<HTMLButtonElement>('button[data-src="' + src.value + '"]')
  const player = document.querySelector<HTMLAudioElement>('audio[data-src="' + src.value + '"]')

  if (player) {
    if (player.paused) {
      player.play()
    }
    else {
      player.pause()
    }
    player.addEventListener('play', () => {
      // 再生中の処理
      if (trigger) {
        trigger.classList.add('-playing')
      }
    })
    player.addEventListener('pause', () => {
      // 停止時の処理
      if (trigger) {
        trigger.classList.remove('-playing')
      }
    })
  }
}
</script>

<style scoped>
.Audio {
  & > button {
    padding: 0.5em;
    border: solid 1px #000;
    border-radius:4px;
    & i { font-size: 3rem; }

    &.-playing {
      background-color: blue;
    }
  }

  & > audio {
    display: none;
  }
}
</style>
