export interface ISearchContext {
  addItem: (type: 'condition' | 'group', parentId: string) => string
  setItem: (item: Condition | ConditionGroup) => void
  getItem: (id: string) => Condition | ConditionGroup | null
  getType: (id: string) => 'condition' | 'group'
  getParent: (id: string) => ConditionGroup | null
  removeItem: (id: string) => void
  reset: () => void
}

export enum MatchType {
  CONTAINS = 'CONTAINS',
  MATCH = 'MATCH',
  FUZZY = 'FUZZY',
}

export enum Operator {
  AND = 'AND',
  OR = 'OR',
}

export interface Condition {
  operator: Operator
  id: string
  parentId: string
  key: string
  value: string
  matchType: MatchType
  include: boolean
}

export interface ConditionGroup {
  id: string
  parentId: string
  conditions: string[]
}
