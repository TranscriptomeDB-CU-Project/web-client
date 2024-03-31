export interface IUseSample {
  page: number
  setPage: (page: number) => void
  maxPage: number
  data:
    | {
        id: string
        [key: string]: any
      }[]
    | undefined
  limit: number
  setLimit: (limit: number) => void
  estimatedCount: number
}
