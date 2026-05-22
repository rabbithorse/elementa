<template>
  <div class="wrapper">
    <hgroup class="pageTtl">
      <h1 class="en">CONTACT</h1>
      <p class="ja">ご意見・要望、<br>ガイドライン違反・著作権侵害情報のご提供</p>
    </hgroup>

    <div class="notes">
      <p class="notesText">こちらからお寄せいただいたご意見・ご要望・情報のご提供につきましては、内容を確認しサービスの参考といたします。<br>また、個別でのご案内は行っておりません。</p>
    </div>

    <Form v-model:form-data="formData" :confirm-rows="confirmRows" @submit="handleSubmit">
      <template #fields>
        <table>
          <tbody>
            <tr v-for="field in fields" :key="field.name">
              <th :class="{ thStyCenter: field.thStyCenter }">
                <template v-if="field.type === 'radio'">
                  {{ field.label }}<small v-if="field.smallLabel">{{ field.smallLabel }}</small>
                </template>
                <label v-else :for="field.name">
                  {{ field.label }}<small v-if="field.smallLabel">{{ field.smallLabel }}</small>
                </label>
              </th>
              <td>
                <div v-if="field.type === 'radio'" class="ipName">
                  <FormKit
                    :name="field.name"
                    type="radio"
                    :options="field.options"
                    :validation="buildValidation(field)"
                    :validation-label="field.label"
                    validation-visibility="blur"
                  />
                </div>
                <FormKit
                  v-else
                  :id="field.name"
                  :name="field.name"
                  :type="field.type"
                  :options="field.options"
                  :placeholder="field.placeholder"
                  :validation="buildValidation(field)"
                  :validation-label="field.label"
                  validation-visibility="blur"
                  :rows="field.rows"
                />
                <p v-if="field.example" class="example">{{ field.example }}</p>
              </td>
            </tr>
          </tbody>
        </table>
      </template>
    </Form>
  </div>
</template>

<script setup lang="ts">
type FieldOption = { label: string, value: string }

type FieldSchema = {
  name: string
  label: string
  type: 'text' | 'email' | 'tel' | 'textarea' | 'radio' | 'select'
  required?: boolean
  rules?: string // FormKit のバリデーション文字列を直接上書きしたい場合
  options?: FieldOption[]
  example?: string
  rows?: number
  smallLabel?: string // ラベル横の補足(例: 「（記入推奨）」)
  thStyCenter?: boolean // th の vertical-align: middle
  placeholder?: string
}

const fields: FieldSchema[] = [
  {
    name: 'contactType',
    label: 'ご連絡の種類',
    type: 'select',
    required: true,
    thStyCenter: true,
    options: [
      { label: 'ご意見・要望', value: 'feedback' },
      { label: 'ガイドライン違反・著作権侵害情報のご提供', value: 'violation' },
      { label: 'その他', value: 'other' },
    ],
  },
  {
    name: 'message',
    label: 'ご連絡の内容',
    type: 'textarea',
    required: true,
    rows: 10,
    example: 'ご連絡の内容を記入してください',
  },
]

// 自動でバリデーション文字列を組み立てる(明示的に rules があればそちらを優先)
const buildValidation = (field: FieldSchema): string | undefined => {
  if (field.rules) return field.rules
  const rules: string[] = []
  if (field.required) rules.push('required')
  if (field.type === 'email') rules.push('email')
  return rules.length ? rules.join('|') : undefined
}

// radio / select の value から表示ラベルを引く(confirm 画面用)
const getOptionLabel = (options: FieldOption[] | undefined, value: string): string => {
  if (!options) return value
  return options.find(o => o.value === value)?.label ?? value
}

// formData の初期値を fields から自動生成
const formData = ref<Record<string, string>>(
  Object.fromEntries(fields.map(f => [f.name, ''])),
)

// 確認画面用の {label, value} 配列も fields から自動生成
const confirmRows = computed(() => fields.map(field => ({
  label: field.label,
  value: field.options
    ? getOptionLabel(field.options, formData.value[field.name] ?? '')
    : formData.value[field.name] ?? '',
})))

const handleSubmit = (done: () => void) => {
  // TODO: 実際の送信処理(API 連携)
  done()
}

useSeoMeta({
  title: `ご意見・要望、ガイドライン違反・著作権侵害情報のご提供 | お問い合わせ | ${inject('globalSiteName')}`,
  ogTitle: `ご意見・要望、ガイドライン違反・著作権侵害情報のご提供 | お問い合わせ | ${inject('globalSiteName')}`,
  ogUrl: `${inject('globalSiteUrl')}/contact/form-person_02/`,
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
</style>