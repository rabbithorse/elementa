<template>
  <section class="formArea">
    <!-- 入力 -->
    <FormKit
      v-if="step === 'input'"
      v-slot="{ state }"
      v-model="formData"
      type="form"
      :actions="false"
      @submit="onFormSubmit"
    >
      <slot name="fields" />

      <div class="privacyAgreeArea">
        <label class="privacyAgree">
          <input v-model="privacyAgree" type="checkbox" name="privacyAgree">
          <NuxtLink to="/privacy-policy" class="link">プライバシーポリシー<i class="fa-regular fa-window-restore"></i></NuxtLink>に同意する
        </label>
      </div>

      <div class="btnArea">
        <button
          type="submit"
          :disabled="!state.valid || !privacyAgree"
          :class="{ '-invalid': !state.valid || !privacyAgree }"
        >
          {{ (!state.valid || !privacyAgree) ? '必須項目を入力してください' : '内容確認画面へ' }}
        </button>
      </div>
    </FormKit>

    <!-- 確認 -->
    <div v-else-if="step === 'confirm'" class="confirmArea">
      <p class="confirmLead">下記の内容で送信します。<br>よろしければ「送信する」を押してください。</p>
      <table>
        <tbody>
          <tr v-for="row in confirmRows" :key="row.label">
            <th>{{ row.label }}</th>
            <td>{{ row.value || '—' }}</td>
          </tr>
        </tbody>
      </table>

      <div class="btnArea">
        <button type="button" class="-back" @click="goBackToInput">修正する</button>
        <button type="button" @click="onSubmit">送信する</button>
      </div>
    </div>

    <!-- 完了 -->
    <div v-else class="doneArea">
      <p class="doneTtl">{{ doneTitle }}</p>
      <p class="doneText">{{ doneText }}</p>
      <div class="btnArea">
        <NuxtLink to="/" class="-back">トップへ戻る</NuxtLink>
      </div>
    </div>

    <p v-if="step === 'input'" class="bottomText">弊社の代表メールアドレスへ<wbr>直接メールの送信も可能です。<br>一般問い合わせ：<span>contact@elementa.co.jp</span></p>
  </section>
</template>

<script setup lang="ts">
type Step = 'input' | 'confirm' | 'done'

interface ConfirmRow {
  label: string
  value: string
}

const formData = defineModel<Record<string, unknown>>('formData', { default: () => ({}) })

withDefaults(defineProps<{
  confirmRows: ConfirmRow[]
  doneTitle?: string
  doneText?: string
}>(), {
  doneTitle: 'お問い合わせありがとうございました',
  doneText: '内容を確認の上、後日担当者よりご連絡いたします。',
})

const emit = defineEmits<{
  submit: [done: () => void]
}>()

const step = ref<Step>('input')
const privacyAgree = ref(true)

const scrollToTop = () => {
  if (typeof window !== 'undefined') {
    window.scrollTo({ top: 0 })
  }
}

// FormKit のフォームは valid 状態でのみ @submit を発火する。
// privacy は button :disabled でガードしているが、念のためここでも確認。
const onFormSubmit = () => {
  if (!privacyAgree.value) return
  step.value = 'confirm'
  scrollToTop()
}

const goBackToInput = () => {
  step.value = 'input'
  scrollToTop()
}

const onSubmit = () => {
  emit('submit', () => {
    step.value = 'done'
    scrollToTop()
  })
}
</script>

<style>
.formArea {
  width: 100%;
  max-width: 86rem;
  margin: 3em auto 0;
  font-size: clamp(1.4rem, pxToVw(18,1400), 1.8rem);

  @media (--mobile) {
    margin-top: 3em;
  }

  @media (--sp) {
    font-size: clamp(1.4rem, pxToVw(16,450), 1.8rem);
  }

  & table {
    width: 100%;
    border-collapse: collapse;
    border: none;

    & th, & td {
      padding: 1.2em 0;
      vertical-align: top;
      border: none;

      @media (--mobile) {
        display: block;
        width: 100%;
        padding: 0;
      }
    }

    & th {
      width: 12em;
      padding-top: 1.6em;
      font-size: 1.22em;
      font-weight: 600;
      color: var(--color-base);
      text-align: center;

      & small {
        display: block;
        font-size: .72em;
      }

      &.thStyCenter {
        vertical-align: middle
      }

      @media (--mobile) {
        width: 100%;
        padding-top: 1.5em;
        padding-bottom: .6em;
        padding-left: .3em;
        text-align: left;

        & small {
          display: inline;
          margin-left: .5em;
        }
      }
    }

    & td {
      & input[type='text'],
      & input[type='email'],
      & input[type='tel'],
      & select,
      & textarea {
        width: 100%;
        padding: .8em 1em;
        font-family: inherit;
        font-size: clamp(1.6rem, 1em, 1.8rem);
        line-height: 1.5;
        background-color: #fff;
        border: .1rem solid #000;
        border-radius: .55em;
        outline: none;
        transition: box-shadow .2s;

        &:focus {
          box-shadow: 0 0 0 .2rem var(--color-base);
        }
      }

      & select {
        cursor: pointer;
      }

      & textarea {
        min-height: 12em;
        resize: vertical;
      }

      & > .example {
        margin-top: .5em;
        font-size: .85em;
        line-height: 1;
        color: var(--color-example_text);
      }

      & .error {
        margin-top: .5em;
        font-size: .85em;
        font-weight: 600;
        line-height: 1.4;
        color: #e74c3c;
      }

      /* FormKit が data-invalid="true" を付けたときの赤枠 */
      & [data-invalid='true'] input[type='text'],
      & [data-invalid='true'] input[type='email'],
      & [data-invalid='true'] input[type='tel'],
      & [data-invalid='true'] select,
      & [data-invalid='true'] textarea {
        border-color: #e74c3c;
      }

      /* FormKit のリスト形式メッセージのデフォルトリストマーカーを消す */
      & .formkit-messages {
        padding: 0;
        list-style: none;
      }

      & > .ipName {
        display: flex;
        flex-direction: column;
        gap: .5em;

        /* FormKit が描画する fieldset / legend のブラウザ標準スタイルを消す */
        & fieldset {
          min-width: 0;
          padding: 0;
          margin: 0;
          border: none;
        }

        & legend {
          padding: 0;
        }

        /* FormKit が描画するオプションリスト */
        & .formkit-options {
          display: flex;
          flex-direction: column;
          gap: .5em;
          padding: 0;
          list-style: none;
        }

        & .formkit-option > label,
        & > label {
          display: inline-flex;
          gap: .5em;
          align-items: center;
          width: fit-content;
          margin-right: 1.5em;
          cursor: pointer;

          & input[type='radio'] {
            width: 1.2em;
            height: 1.2em;
            accent-color: var(--color-base);
          }
        }

        @media (--mobile) {
          padding-left: .5em;
        }
      }
    }
  }

  & > form > .privacyAgreeArea {
    margin-top: 3em;
    text-align: center;

    & > .privacyAgree {
      display: inline-flex;
      gap: .2em;
      align-items: center;
      font-size: 1em;
      cursor: pointer;

      & > input[type='checkbox'] {
        width: 1.2em;
        height: 1.2em;
        margin-right: .8em;
        accent-color: var(--color-base);
      }

      & > .link {
        color: inherit;
        text-decoration: underline;

        &:hover {
          opacity: .7;
        }
      }
    }
  }

  & .btnArea {
    display: flex;
    flex-wrap: wrap;
    gap: 1em;
    justify-content: center;
    margin-top: 3em;

    & > button,
    & > a {
      display: inline-block;
      padding: 1em 3em;
      font-size: clamp(1.6rem, pxToVw(24,1400), 2.4rem);
      font-weight: 600;
      color: #fff;
      text-decoration: none;
      cursor: pointer;
      background-color: #000;
      border: .1rem solid #000;
      border-radius: .4em;
      transition: opacity .2s;

      &:hover {
        opacity: .8;
      }

      &.-back {
        color: #000;
        background-color: transparent;
      }

      &.-invalid {
        color: #fff;
        pointer-events: none;
        background-color: #b0b0b0;
        border-color: #b0b0b0;

        &:hover {
          opacity: 1;
        }
      }

      @media (--sp) {
        padding: .8em 2em;
        font-size: clamp(1.4rem, pxToVw(20,450), 2.4rem);
      }
    }
  }

  & > .confirmArea {
    & > .confirmLead {
      margin-bottom: 2em;
      font-size: 1em;
      line-height: 1.8;
      text-align: center;
    }

    & table {
      & th {
        padding-top: 1.2em;
      }

      & td {
        padding-top: 1.5em;
        padding-left: .5em;
        word-break: break-all;
        white-space: pre-wrap;

        @media (--mobile) {
          padding: 0 .5em;
        }
      }
    }
  }

  & > .doneArea {
    padding: 3em 0;
    text-align: center;

    & > .doneTtl {
      margin-bottom: 1em;
      font-size: 1.6em;
      font-weight: 700;
      color: var(--color-base);
    }

    & > .doneText {
      margin-bottom: 2em;
      line-height: 1.8;
    }
  }

  & > .bottomText {
    margin-top: 3em;
    font-size: 1.11em;
    font-weight: 700;
    text-align: center;
    word-break: keep-all;

    & > span {
      display: inline-block;
      word-break: break-all;
    }
  }
}
</style>
