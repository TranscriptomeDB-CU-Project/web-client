import { useSearch } from '@/app/search/context/SearchContext'
import { ConditionGroup, ConditionType, Operator } from '@/app/search/types'

const useConditionGroup = (id: string) => {
  const actions = useSearch()

  const conditionGroup = actions.getItem(id) as ConditionGroup | null

  if (!conditionGroup) return null

  const toggleOperator = () => {
    const operator = conditionGroup.operator === Operator.AND ? Operator.OR : Operator.AND
    actions.setItem({ ...conditionGroup, operator })
  }

  const addCondition = () => actions.addItem(ConditionType.SINGLE, id)
  const addGroup = () => actions.addItem(ConditionType.GROUP, id)
  const removeGroup = () => actions.removeItem(id)

  return { conditionGroup, toggleOperator, addCondition, addGroup, removeGroup }
}

export default useConditionGroup
