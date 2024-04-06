import { Column } from '@/dto/types'

export interface ColumnStore {
  columns: Record<string, Column>
  isFetching: boolean
}
