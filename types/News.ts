import type { MicroCMSImage, MicroCMSListContent } from 'microcms-js-sdk'

export type News = {
  id: string
  title: string
  subTtitle: string
  cover: MicroCMSImage
  body: MicroCMSListContent
  appInfos: (appInfos & MicroCMSListContent)
  collaboAppInfo: (collaboAppInfo & MicroCMSListContent) | null
  publishedAt: Date
  totalCount: number
  contents: Array<News>
}

export type appInfos = {
  id: string | null
  title: string | null
  platform: string | null
  genre: string | null
  officialSiteURL: string | null
  appStoreURL: string | null
  googlePlayURL: string | null
  desktopURL: string | null
  nintendoURL: string | null
  twitterID: string | null
  language: string | null
  price: string | null
  releaseDate: string | null
  dev: Array<string> | null
  preOrder: boolean
  appType: Array<string> | null
}

export type collaboAppInfo = {
  title: string
  body: string
}
