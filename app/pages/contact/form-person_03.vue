<template>
  <div class="wrapper">
    <hgroup class="pageTtl">
      <h1 class="en">CONTACT</h1>
      <p class="ja">採用・求人に関するお問い合わせ</p>
    </hgroup>

    <div class="notes">
      <p>当社へのエントリーや応募に関するお問い合わせ窓口です。<br>採用総合窓口直通：contact.hr@elementa.co.jp</p>
      <p class="notesText">募集情報は<NuxtLink to="/recruit">RECRUITページ</NuxtLink>をご確認ください。</p>
    </div>

    <Form v-model:form-data="formData" :confirm-rows="confirmRows" @submit="handleSubmit" mailText="flase">
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
    name: 'device',
    label: '学校名または会社名',
    type: 'text',
    required: false,
    example: '例：ELEMENTA 株式会社（Elementa Japan）',
  },
  {
    name: 'name',
    label: '氏名（フリガナ）',
    type: 'text',
    required: true,
    example: '例：山田太郎（ヤマダ タロウ）',
  },
  {
    name: 'email',
    label: 'メールアドレス',
    type: 'email',
    required: true,
    example: '例：email@example.com',
  },
  {
    name: 'message',
    label: 'お問い合わせ内容',
    type: 'textarea',
    required: true,
    rows: 10,
    example: 'お問い合わせ内容を記入してください',
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
  title: `採用・求人に関するお問い合わせ | お問い合わせ | ${inject('globalSiteName')}`,
  ogTitle: `採用・求人に関するお問い合わせ | お問い合わせ | ${inject('globalSiteName')}`,
  ogUrl: `${inject('globalSiteUrl')}/contact/form-person_03/`,
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