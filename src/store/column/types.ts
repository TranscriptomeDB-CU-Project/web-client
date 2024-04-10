import { Column } from '@/dto/types'

export interface ColumnStore {
  value: Record<string, Column>
  isMainColFetching: boolean
  isFetching: boolean
}
