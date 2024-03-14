import useSwitch from '@/hooks/useSwitch'

import { Condition, ConditionGroup } from '../../types'

export interface ISearchContext {
  addItem: (type: 'condition' | 'group', parentId: string) => string
  setItem: (item: Condition | ConditionGroup) => void
  getItem: (id: string) => Condition | ConditionGroup | null
  getType: (id: string) => 'condition' | 'group' | null
  getParent: (id: string) => ConditionGroup | null
  removeItem: (id: string) => void
  reset: () => void
  complex: ReturnType<typeof useSwitch>
  getToken: () => void
}
