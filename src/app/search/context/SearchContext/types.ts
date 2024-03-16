import useSwitch from '@/hooks/useSwitch'

import { Condition, ConditionGroup, ConditionType } from '../../types'

export interface ISearchContext {
  addItem: (type: ConditionType, parentId: string) => string
  setItem: (item: Condition | ConditionGroup) => void
  getItem: (id: string) => Condition | ConditionGroup | null
  getParent: (id: string) => ConditionGroup | null
  removeItem: (id: string) => void
  reset: () => void
  complex: ReturnType<typeof useSwitch>
  getToken: () => void
}
