// usage: {{ truncate(hoge, 10) }}
export const truncate = (text: Ref<string>, maxLength: number) => {
  if (text.value.length > maxLength) {
    return text.value.substring(0, maxLength) + '...'
  }
  return text.value
}
