// usage: <div v-html="useHtmlCleaner()(data.body)" />
import { JSDOM } from 'jsdom'

export function useHtmlCleaner() {
  return (html: string): string => {
    const allowedTags = ['table', 'div']
    let processedContent = html

    // 特定のタグのエスケープを解除
    allowedTags.forEach((tag) => {
      const regex = new RegExp(`&lt;${tag}.+?/${tag}&gt;`, 'g')
      const matches = processedContent.match(regex)

      if (matches) {
        matches.forEach((match: string) => {
          const unescapedHtml = match.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&nbsp;/g, ' ')
          processedContent = processedContent.replace(match, unescapedHtml)
        })
      }
    })

    // HTML文字列をDOMに変換
    const dom = new JSDOM(processedContent)
    const doc = dom.window.document

    // 直下のbrタグを削除
    doc.querySelectorAll('body > br').forEach(el => el.remove())

    // 空のpタグを削除
    doc.querySelectorAll('p:empty').forEach(el => el.parentNode?.removeChild(el))

    // pタグ内の処理
    doc.querySelectorAll('p').forEach((el) => {
      // pタグの開始直後のbrタグを削除
      if (el.firstChild && el.firstChild.nodeName === 'BR') {
        el.removeChild(el.firstChild)
      }

      // 内容が空、<br>のみ、または&nbspのみの場合、pタグを完全に削除
      const content = el.innerHTML.trim()
      if (content === '' || content === '<br>' || content === '&nbsp;') {
        el.parentNode?.removeChild(el)
      }
    })

    // tableタグの直前のbrタグを削除
    doc.querySelectorAll('table').forEach((table) => {
      let prevSibling = table.previousSibling
      while (prevSibling && prevSibling.nodeType === dom.window.Node.TEXT_NODE && prevSibling.textContent?.trim() === '') {
        prevSibling = prevSibling.previousSibling
      }
      if (prevSibling && prevSibling.nodeName === 'BR') {
        prevSibling.parentNode?.removeChild(prevSibling)
      }
    })

    // 連続するbrタグを削除
    const removeContinuousBr = (node: Node) => {
      if (node.nodeType === dom.window.Node.ELEMENT_NODE) {
        let child = node.firstChild
        while (child) {
          const nextChild = child.nextSibling
          if (child.nodeName === 'BR' && nextChild && nextChild.nodeName === 'BR') {
            node.removeChild(child)
          }
          else {
            removeContinuousBr(child)
          }
          child = nextChild
        }
      }
    }
    removeContinuousBr(doc.body)

    // 処理後のHTMLを文字列に戻す
    return doc.body.innerHTML
  }
}
