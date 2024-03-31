import { Column } from '@/app/select/types'
import { OrderDirection } from '@/dto/types'

export interface IUseColumn {
  get: (colname: string) => Column | undefined
  add: (colname: string) => void
  remove: (colname: string) => void
  selected: { name: string; query: string }[]
  isFetching: boolean
  getSuggestion: (keyword: string, limit?: number) => string[]
  rearrange: (colname: string, newIndex: number) => void
  setQuery: (colname: string) => (query: string) => void
  setSort: (colname: string) => void
  sortBy?: {
    columnName: string
    direction: OrderDirection
  }
}
