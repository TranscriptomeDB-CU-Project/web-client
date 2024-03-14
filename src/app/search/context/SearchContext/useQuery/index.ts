import { Condition, ConditionGroup } from '@/app/search/types'
import { GetTokenRequestDTO, ParameterCondition, ParamsWithOps } from '@/dto/types'

import useCondition from '../useCondition'

const useQuery = (actions: ReturnType<typeof useCondition>, isComplex: boolean) => {
  const constructQuery = (): GetTokenRequestDTO => {
    if (isComplex) {
      return {
        query: constructComplex('root'),
      }
    } else {
      return {
        query: constructSimple(),
      }
    }
  }

  const constructCondition = (id: string): ParameterCondition => {
    const item = actions.getItem(id) as Condition
    return {
      key: item.key,
      valuetype: 'STRING',
      condition: {
        include: item.include,
        matchtype: item.matchType,
        value: item.value,
      },
    }
  }

  const constructComplex = (id: string): ParamsWithOps | ParameterCondition => {
    if (actions.getType(id) === 'condition') {
      return constructCondition(id)
    } else {
      console.log(id)
      const params: (ParamsWithOps | ParameterCondition)[] = []
      const group = actions.getItem(id) as ConditionGroup

      for (const childId of group.conditions) {
        params.push(constructComplex(childId))
      }

      return {
        params,
        op: group.operator,
      }
    }
  }

  const constructSimple = (): ParamsWithOps | ParameterCondition => {
    const { conditions } = actions.getItem('root') as ConditionGroup

    if (conditions.length === 0) return {} as ParameterCondition
    if (conditions.length === 1) return constructCondition(conditions[0])

    let currentGroup: ParamsWithOps = {
      params: [constructCondition(conditions[0]), constructCondition(conditions[1])],
      op: actions.getItem(conditions[1]).operator,
    }

    for (let i = 2; i < conditions.length; i++) {
      const item = actions.getItem(conditions[i]) as Condition
      if (item.operator === currentGroup.op) {
        currentGroup.params.push(constructCondition(conditions[i]))
      } else {
        currentGroup = {
          params: [currentGroup, constructCondition(conditions[i])],
          op: item.operator,
        }
      }
    }

    return currentGroup
  }

  return {
    constructQuery,
  }
}

export default useQuery
