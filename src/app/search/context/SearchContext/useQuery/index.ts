import { Condition, ConditionGroup, ConditionType, MatchType, Operator } from '@/app/search/types'
import { GetTokenRequestDTO, ParameterCondition, ParamsWithOps, ValueType } from '@/dto/types'
import { parseAge } from '@/utils/age'

import useCondition from '../useCondition'
import useGeneralParam from '../useGeneralParam'

const useQuery = (actions: ReturnType<typeof useCondition>, generalParam: ReturnType<typeof useGeneralParam>) => {
  const constructQuery = (): GetTokenRequestDTO => {
    const generalQuery = constructGeneral()
    const conditionQuery = actions.complex.state ? constructComplex('root') : constructSimple()

    if (generalQuery.length === 0) return { query: conditionQuery }
    return {
      query: {
        params: [...generalQuery, conditionQuery],
        op: Operator.AND,
      },
    }
  }

  const constructGeneral = (): ParameterCondition[] => {
    const { age, gender, cellLine } = generalParam

    const query: ParameterCondition[] = cellLine.data.map((cell) => ({
      key: 'cell line',
      valuetype: ValueType.STRING,
      condition: {
        include: true,
        matchtype: MatchType.MATCH,
        value: cell,
      },
    }))

    if (age.enabled) {
      const { min, max, unitMin, unitMax } = age.value
      query.push({
        key: 'age<interval>',
        valuetype: ValueType.NUMBER,
        condition: {
          gte: parseAge(Number(min), unitMin),
          lte: parseAge(Number(max), unitMax),
        },
      })
    }

    if (gender.enabled) {
      query.push({
        key: 'sex',
        valuetype: ValueType.STRING,
        condition: {
          include: true,
          matchtype: MatchType.MATCH,
          value: String(gender.value),
        },
      })
    }

    return query
  }

  const constructCondition = (id: string): ParameterCondition => {
    const item = actions.getItem(id) as Condition
    return {
      key: item.key,
      valuetype: ValueType.STRING,
      condition: {
        include: item.include,
        matchtype: item.matchType,
        value: item.value,
      },
    }
  }

  const constructComplex = (id: string): ParamsWithOps | ParameterCondition => {
    if (actions.getItem(id).type === ConditionType.SINGLE) {
      return constructCondition(id)
    }

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

  const validate = () => {
    // gender
    const { gender, age } = generalParam
    if (gender.enabled) {
      if (!gender.value) return 'Please select gender'
    }

    // age
    if (age.enabled) {
      const { min, max, unitMin, unitMax } = age.value
      if (min === '' || max === '') return 'Please fill all age fields with valid numbers'
      if (Number(min) < 0 || Number(max) < 0) return 'Age should be a positive number'

      if (parseAge(Number(min), unitMin) > parseAge(Number(max), unitMax))
        return 'Minimum age should be less than or equal to maximum age'
    }

    // conditions
    return validateCondition('root')
  }

  const validateCondition = (id: string): string | null => {
    const item = actions.getItem(id)
    if (item.type === ConditionType.SINGLE) {
      const condition = item as Condition
      if (condition.key === '' || condition.value === '') return 'Please fill all Columns and Keywords'
    } else {
      const group = item as ConditionGroup
      if (group.conditions.length === 0) return 'Please remove the group with no conditions'
      for (const childId of group.conditions) {
        const error = validateCondition(childId)
        if (error) return error
      }
    }

    return null
  }

  return {
    constructQuery,
    validate,
  }
}

export default useQuery
