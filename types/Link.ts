import type { MicroCMSImage, MicroCMSListContent } from 'microcms-js-sdk'

export type Link = {
  id: string
  title: string
  url: string
  subTtitle: string
  banner: MicroCMSImage
  publishedAt: Date
}
