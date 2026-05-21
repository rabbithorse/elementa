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
              <tr>
                <th class="thStyCenter">{{ labels.ipName }}</th>
                <td>
                  <div class="ipName">
                    <FormKit
                      name="ipName"
                      type="radio"
                      :options="gameTitleOptions"
                      validation="required"
                      :validation-label="labels.ipName"
                      validation-visibility="blur"
                    />
                  </div>
                </td>
              </tr>
              <tr>
                <th><label for="device">{{ labels.device }}</label></th>
                <td>
                  <FormKit
                    id="device"
                    name="device"
                    type="text"
                    validation="required"
                    :validation-label="labels.device"
                    validation-visibility="blur"
                  />
                  <p class="example">例：iPhone 13</p>
                </td>
              </tr>
              <tr>
                <th><label for="os">{{ labels.os }}</label></th>
                <td>
                  <FormKit
                    id="os"
                    name="os"
                    type="text"
                    validation="required"
                    :validation-label="labels.os"
                    validation-visibility="blur"
                  />
                  <p class="example">例：iOS 15.4</p>
                </td>
              </tr>
              <tr>
                <th><label for="email">{{ labels.email }}</label></th>
                <td>
                  <FormKit
                    id="email"
                    name="email"
                    type="email"
                    validation="required|email"
                    :validation-label="labels.email"
                    validation-visibility="blur"
                  />
                  <p class="example">例：email@example.com</p>
                </td>
              </tr>
              <tr>
                <th><label for="loginId">{{ labels.loginId }}</label></th>
                <td>
                  <FormKit
                    id="loginId"
                    name="loginId"
                    type="text"
                    validation="required"
                    :validation-label="labels.loginId"
                    validation-visibility="blur"
                  />
                  <p class="example">例：ABCdef</p>
                </td>
              </tr>
              <tr>
                <th><label for="userName">{{ labels.userName }}<small>（記入推奨）</small></label></th>
                <td>
                  <FormKit
                    id="userName"
                    name="userName"
                    type="text"
                  />
                  <p class="example">例：山田太郎</p>
                </td>
              </tr>
              <tr>
                <th><label for="message">{{ labels.message }}</label></th>
                <td>
                  <FormKit
                    id="message"
                    name="message"
                    type="textarea"
                    validation="required"
                    :validation-label="labels.message"
                    validation-visibility="blur"
                    rows="10"
                  />
                  <p class="example">例：お問い合わせ内容を記入してください</p>
                </td>
              </tr>
            </tbody>
          </table>
      </template>
    </Form>
  </div>
</template>

<script setup lang="ts">
const labels = {
  ipName: 'ゲームタイトル',
  device: 'ご利用の端末',
  os: 'OSの種類・バージョン',
  email: '返信用メールアドレス',
  loginId: 'ゲーム内のログインID',
  userName: 'ゲーム内のユーザー名',
  message: 'お問い合わせ内容',
} as const

const gameTitleOptions = [
  { label: '白銀の城', value: 'silverpalace' },
  { label: 'V Project', value: 'vproject' },
  { label: 'Babytopia', value: 'babytopia' },
]

const gameTitleMap: Record<string, string> = Object.fromEntries(
  gameTitleOptions.map(o => [o.value, o.label]),
)

const formData = ref({
  ipName: '',
  device: '',
  os: '',
  email: '',
  loginId: '',
  userName: '',
  message: '',
})

const confirmRows = computed(() => [
  { label: labels.ipName, value: gameTitleMap[formData.value.ipName] ?? '' },
  { label: labels.device, value: formData.value.device ?? '' },
  { label: labels.os, value: formData.value.os ?? '' },
  { label: labels.email, value: formData.value.email ?? '' },
  { label: labels.loginId, value: formData.value.loginId ?? '' },
  { label: labels.userName, value: formData.value.userName ?? '' },
  { label: labels.message, value: formData.value.message ?? '' },
])

const handleSubmit = (done: () => void) => {
  // TODO: 実際の送信処理(API 連携)
  done()
}

useSeoMeta({
  title: `お問い合わせ | ${inject('globalSiteName')}`,
  ogTitle: `お問い合わせ | ${inject('globalSiteName')}`,
  ogUrl: `${inject('globalSiteUrl')}/contact/`,
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
