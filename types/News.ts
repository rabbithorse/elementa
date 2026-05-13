import type { MicroCMSImage, MicroCMSListContent } from 'microcms-js-sdk'

export type News = {
  id: string
  title: string
  subTitle: string
  img: MicroCMSImage
  body: MicroCMSListContent
  publishedAt: Date
  totalCount: number
}