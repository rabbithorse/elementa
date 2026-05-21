import { defineFormKitConfig } from '@formkit/vue'
import { ja } from '@formkit/i18n'

export default defineFormKitConfig({
  locales: { ja },
  locale: 'ja',
  config: {
    classes: {
      // FormKit デフォルトのラッパー/メッセージは最低限。既存 CSS とぶつからないようにシンプルに。
      messages: 'fkMessages',
      message: 'error',
      inner: 'fkInner',
      input: 'fkInput',
      outer: 'fkOuter',
      options: 'fkOptions',
      option: 'fkOption',
      wrapper: 'fkWrapper',
    },
  },
})
