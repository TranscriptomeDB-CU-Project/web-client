import { Condition, ConditionGroup } from '../../types'

export interface ISearchContext {
  addItem: (type: 'condition' | 'group', parentId: string) => string
  setItem: (item: Condition | ConditionGroup) => void
  getItem: (id: string) => Condition | ConditionGroup | null
  getType: (id: string) => 'condition' | 'group'
  getParent: (id: string) => ConditionGroup | null
  removeItem: (id: string) => void
  reset: () => void
}
