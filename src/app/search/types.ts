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
  type: ConditionType.SINGLE
}

export interface ConditionGroup {
  id: string
  parentId: string
  conditions: string[]
  operator: Operator
  type: ConditionType.GROUP
}

export enum ConditionType {
  GROUP = 'GROUP',
  SINGLE = 'SINGLE',
}

export enum Gender {
  MALE = 'male',
  FEMALE = 'female',
}
