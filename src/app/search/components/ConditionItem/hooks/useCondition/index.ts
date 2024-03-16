import { useCallback, useMemo } from 'react'

import { useSearch } from '@/app/search/context/SearchContext'
import { Condition, Operator } from '@/app/search/types'
import useSwitch from '@/hooks/useSwitch'

const useCondition = (id: string) => {
  const actions = useSearch()
  const triggerQuery = useSwitch()
  const update = useCallback(() => triggerQuery.toggle(), [triggerQuery])

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const condition = useMemo(() => actions.getItem(id), [id, triggerQuery.state]) as Condition | null

  if (!condition) return null

  const setField = (key: keyof Condition) => (value: string | boolean) => {
    actions.setItem({ ...condition, [key]: value })
    update()
  }
  const toggleInclude = () => setField('include')(!condition.include)

  const toggleOperator = () => {
    const operator = condition.operator === Operator.AND ? Operator.OR : Operator.AND
    setField('operator')(operator)
  }

  const deleteCondition = () => actions.removeItem(id)

  return { condition, toggleInclude, toggleOperator, setField, deleteCondition }
}

export default useCondition
