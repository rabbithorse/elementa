// usage: {{ date('2021-01-01') }} => 2021年01月01日
import { useDateFormat } from '@vueuse/core'

export const date = (date: Date) => {
  return useDateFormat(date, 'YYYY.MM.DD').value
}
