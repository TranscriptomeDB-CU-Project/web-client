import { Column } from '@/dto/types'

export interface ColumnStore {
  value: Record<string, Column>
  isFetching: boolean
}
