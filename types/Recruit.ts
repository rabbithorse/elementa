import type { MicroCMSImage } from 'microcms-js-sdk'

export type Recruit = {
  id: string
  title: string
  display: string
  img: MicroCMSImage
  categories: string
  jobtypes: Array<string>
  description: Array<string>
  requirements: Array<{
    requirement1: string
    requirement2: string
    requirement3: string
    requirement4: string
    requirement5: string
    requirement6: string
    requirement7: string
  }>
  url: string
  publishedAt: Date
  totalCount: number
}