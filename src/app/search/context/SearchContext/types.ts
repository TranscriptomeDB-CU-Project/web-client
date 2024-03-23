import useSwitch from '@/hooks/useSwitch'

import { Condition, ConditionGroup, ConditionType } from '../../types'
import useGeneralParam from './useGeneralParam'

export interface ISearchContext extends ReturnType<typeof useGeneralParam> {
  addItem: (type: ConditionType, parentId: string) => string
  setItem: (item: Condition | ConditionGroup) => void
  getItem: (id: string) => Condition | ConditionGroup | null
  getParent: (id: string) => ConditionGroup | null
  removeItem: (id: string) => void
  reset: () => void
  complex: ReturnType<typeof useSwitch>
  getToken: () => void
}

export interface AgeData {
  min: string
  max: string
  unitMin: Unit
  unitMax: Unit
}

export enum Unit {
  YEAR = 'year',
  MONTH = 'month',
  WEEK = 'week',
  DAY = 'day',
  HOUR = 'hour',
}
