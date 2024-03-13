import { useEffect, useState } from 'react'

import { id } from '@/utils/id'

import { Condition, ConditionGroup, MatchType, Operator } from '../types'

const useCondition = () => {
  const [conditionMap, setConitionMap] = useState<{ [key: string]: Condition | ConditionGroup }>({})

  const getNewItem = (type: 'condition' | 'group', parentId: string): Condition | ConditionGroup => {
    if (type === 'condition') {
      return {
        id: `condition-${id()}`,
        parentId,
        key: '',
        value: '',
        matchType: MatchType.CONTAINS,
        include: true,
        operator: Operator.AND,
      }
    } else {
      return {
        id: `group-${id()}`,
        parentId,
        conditions: [],
      }
    }
  }

  const addItem = (type: 'condition' | 'group', parentId: string): string => {
    const data = getNewItem(type, parentId)
    conditionMap[data.id] = data
    const parent = getParent(data.id)
    if (parent) {
      parent.conditions.push(data.id)
      setItem(parent)
    } else {
      setConitionMap({ ...conditionMap })
    }

    return data.id
  }

  const setItem = (data: ConditionGroup | Condition) => {
    conditionMap[data.id] = data
    setConitionMap({ ...conditionMap })
  }

  const getItem = (id: string) => conditionMap[id]
  const getType = (id: string) => {
    const item = getItem(id)
    return item.id.startsWith('condition') ? 'condition' : 'group'
  }

  const getParent = (id: string) => {
    const condition = getItem(id)
    if (condition.id === 'root') {
      return null
    }
    return getItem(condition.parentId) as ConditionGroup
  }

  const removeChild = (id: string) => {
    if (getType(id) === 'group') {
      const item = getItem(id) as ConditionGroup
      for (const conditionId of item.conditions) {
        removeChild(conditionId)
      }
    }
  }

  const removeItem = (id: string) => {
    removeChild(id)
    const parent = getParent(id)
    if (parent) {
      parent.conditions = parent.conditions.filter((conditionId) => conditionId !== id)
      setItem(parent)
    }
    delete conditionMap[id]
  }

  const reset = () => {
    setItem({
      id: 'root',
      parentId: 'root',
      conditions: [],
    })

    addItem('condition', 'root')
  }

  useEffect(() => {
    reset()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return {
    addItem,
    setItem,
    getItem,
    getType,
    getParent,
    reset,
    removeItem,
  }
}

export default useCondition
