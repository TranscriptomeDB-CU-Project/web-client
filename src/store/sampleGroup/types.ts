import { Column } from '@/dto/types'

export interface SampleGroupStore {
  column?: Column
  value?: {
    value: string
    count: number
  }[]
}
