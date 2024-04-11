import { Column, OrderDirection } from '@/dto/types'

export interface SelectedColumnStore {
  value: {
    column: Column
    query: string
  }[]
  sortBy?: {
    column: Column
    direction: OrderDirection
  }
  toSelect: string[]
}
