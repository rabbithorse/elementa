<template>
  <div class="wrapper">
    <hgroup class="pageTtl">
      <h1 class="en">CONTACT</h1>
      <p class="ja">各種ゲーム・サービスについて</p>
    </hgroup>

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
    name: 'ipName',
    label: 'ゲームタイトル',
    type: 'radio',
    required: true,
    thStyCenter: true,
    options: [
      { label: '白銀の城', value: 'silverpalace' },
      { label: 'V Project', value: 'vproject' },
      { label: 'Babytopia', value: 'babytopia' },
    ],
  },
  {
    name: 'device',
    label: 'ご利用の端末',
    type: 'text',
    required: true,
    example: '例：iPhone 13',
  },
  {
    name: 'os',
    label: 'OSの種類・バージョン',
    type: 'text',
    required: true,
    example: '例：iOS 15.4',
  },
  {
    name: 'email',
    label: '返信用メールアドレス',
    type: 'email',
    required: true,
    example: '例：email@example.com',
  },
  {
    name: 'loginId',
    label: 'ゲーム内のログインID',
    type: 'text',
    required: true,
    example: '例：ABCdef',
  },
  {
    name: 'userName',
    label: 'ゲーム内のユーザー名',
    type: 'text',
    smallLabel: '（記入推奨）',
    example: '例：山田太郎',
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
  title: `各種ゲーム・サービスについて | お問い合わせ | ${inject('globalSiteName')}`,
  ogTitle: `各種ゲーム・サービスについて | お問い合わせ | ${inject('globalSiteName')}`,
  ogUrl: `${inject('globalSiteUrl')}/contact/form-person_01/`,
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