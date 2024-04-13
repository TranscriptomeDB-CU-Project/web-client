import { useEffect, useRef, useState } from 'react'

import useSwitch from '@/hooks/useSwitch'
import { id } from '@/utils/id'

import { Condition, ConditionGroup, ConditionType, MatchType, Operator } from '../../../types'

const useCondition = () => {
  const [conditionMap, setConditionMap] = useState<{ [key: string]: Condition | ConditionGroup }>({})
  const complex = useSwitch()
  const complexRef = useRef(false)

  useEffect(() => {
    reset()
    complexRef.current = complex.state
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [complex.state])

  const getNewItem = (type: ConditionType, parentId: string): Condition | ConditionGroup => {
    if (type === ConditionType.SINGLE) {
      return {
        id: id(),
        parentId,
        key: '',
        value: '',
        matchType: MatchType.CONTAINS,
        include: true,
        operator: Operator.AND,
        type: ConditionType.SINGLE,
      }
    } else {
      return {
        id: id(),
        parentId,
        conditions: [],
        operator: Operator.AND,
        type: ConditionType.GROUP,
      }
    }
  }

  const addItem = (type: ConditionType, parentId: string): string => {
    const data = getNewItem(type, parentId)
    conditionMap[data.id] = data
    const parent = getParent(data.id)
    if (parent) {
      parent.conditions.push(data.id)
      setItem(parent)
    } else {
      setConditionMap({ ...conditionMap })
    }

    if (type === ConditionType.GROUP) {
      addItem(ConditionType.SINGLE, data.id)
    }

    return data.id
  }

  const setItem = (data: ConditionGroup | Condition) => {
    conditionMap[data.id] = data
    setConditionMap({ ...conditionMap })
  }

  const getItem = (id: string) => conditionMap[id]

  const getParent = (id: string) => {
    const condition = getItem(id)
    if (!condition || condition.id === 'root') {
      return null
    }

    return getItem(condition.parentId) as ConditionGroup
  }

  const removeChild = (id: string) => {
    const item = getItem(id)
    if (item.type === ConditionType.GROUP) {
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
    setConditionMap({ ...conditionMap })
  }

  const justReset = useSwitch()
  const reset = () => {
    setConditionMap({})
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
      type: ConditionType.GROUP,
    })

    if (complexRef.current) addItem(ConditionType.SINGLE, 'root')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [justReset.state])

  return {
    addItem,
    setItem,
    getItem,
    getParent,
    reset,
    removeItem,
    complex,
    conditionMap,
  }
}

export default useCondition
