export interface SampleStore {
  value: {
    id: string
    [key: string]: any
  }[]
  page: number
  maxPage: number
  limit: number
  isFetching: boolean
  maxReachedPage: number
}
