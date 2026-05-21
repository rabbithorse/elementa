import type { MicroCMSImage } from 'microcms-js-sdk'

export type News = {
  id: string
  title: string
  subTitle: string
  img: MicroCMSImage
  body: string
  publishedAt: Date
  totalCount: number
}