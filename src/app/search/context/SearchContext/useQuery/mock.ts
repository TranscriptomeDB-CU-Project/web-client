import { Condition, ConditionGroup, ConditionType, MatchType, Operator } from '@/app/search/types'

export const getMockCondition = (id: string, parentId: string): Condition => ({
  id,
  type: ConditionType.SINGLE,
  key: id,
  value: 'test',
  include: false,
  matchType: MatchType.CONTAINS,
  operator: Operator.AND,
  parentId,
})

export const getMockConditionGroup = (id: string, parentId: string): ConditionGroup => ({
  id,
  type: ConditionType.GROUP,
  conditions: [],
  operator: Operator.AND,
  parentId,
})
