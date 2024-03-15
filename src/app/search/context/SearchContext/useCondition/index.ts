import { useEffect, useRef, useState } from 'react'

import useSwitch from '@/hooks/useSwitch'
import { id } from '@/utils/id'

import { Condition, ConditionGroup, MatchType, Operator } from '../../../types'

const useCondition = () => {
  const [conditionMap, setConitionMap] = useState<{ [key: string]: Condition | ConditionGroup }>({})
  const complex = useSwitch()

  useEffect(() => {
    reset()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [complex.state])

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
        operator: Operator.AND,
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

    if (type === 'group') {
      addItem('condition', data.id)
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
    if (!item) return null
    return item.id.startsWith('condition') ? 'condition' : 'group'
  }

  const getParent = (id: string) => {
    const condition = getItem(id)
    if (!condition || condition.id === 'root') {
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

    delete conditionMap[id]
  }

  const removeItem = (id: string) => {
    const parent = getParent(id)
    if (parent) {
      parent.conditions = parent.conditions.filter((conditionId) => conditionId !== id)
      conditionMap[parent.id] = parent
    }

    removeChild(id)
    setConitionMap({ ...conditionMap })
  }

  const justReset = useSwitch()
  const reset = () => {
    setConitionMap({})
    justReset.toggle()
  }

  const skipFirstRender = useRef(true)

  useEffect(() => {
    if (skipFirstRender.current) {
      skipFirstRender.current = false
      return
    }

    setItem({
      id: 'root',
      parentId: 'root',
      conditions: [],
      operator: Operator.AND,
    })

    addItem('condition', 'root')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [justReset.state])

  return {
    addItem,
    setItem,
    getItem,
    getType,
    getParent,
    reset,
    removeItem,
    complex,
    conditionMap,
  }
}

export default useCondition
