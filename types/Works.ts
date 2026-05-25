import type { MicroCMSImage } from 'microcms-js-sdk'

export type Works = {
  id: string
  title: string
  img: MicroCMSImage
  text: string
  url: string
  platform: Array<string>
  appstoreUrl: string
  googleplayUrl: string
  pcstoreUrl: string
  publishedAt: Date
  totalCount: number
}