import { renderHook } from '@testing-library/react-hooks'
import { beforeEach, describe, expect, test, vi } from 'vitest'

import { Condition } from '@/app/search/types'

class Counter {
  private static _id = 0

  static id() {
    this._id += 1
    return this._id.toString()
  }

  static reset() {
    this._id = 0
  }
}

describe('useCondition', () => {
  beforeEach(() => {
    vi.mock('@/utils/id', () => {
      return {
        id: () => {
          return Counter.id()
        },
      }
    })

    return () => {
      vi.restoreAllMocks()
      Counter.reset()
    }
  })

  const importUseQuery = async () => {
    const { default: useQuery } = await import('.')
    const { default: useCondition } = await import('../useCondition')

    const resultUseCondition = renderHook(() => useCondition())
    const resultUseQuery = renderHook(({ actions, isComplex }) => useQuery(actions, isComplex), {
      initialProps: {
        actions: resultUseCondition.result.current,
        isComplex: resultUseCondition.result.current.complex.state,
      },
    })

    return { resultUseCondition, resultUseQuery }
  }

  describe('validate()', async () => {
    test('should return null when condition is valid', async () => {
      const { resultUseCondition, resultUseQuery } = await importUseQuery()

      const firstConditionId = resultUseCondition.result.current.addItem('condition', 'root')
      const secondConditionId = resultUseCondition.result.current.addItem('condition', 'root')

      const initialCondition = resultUseCondition.result.current.getItem('condition-1') as Condition
      initialCondition.key = 'name1'
      initialCondition.value = 'test'

      const firstCondition = resultUseCondition.result.current.getItem(firstConditionId) as Condition
      firstCondition.key = 'name2'
      firstCondition.value = 'test'

      const secondCondition = resultUseCondition.result.current.getItem(secondConditionId) as Condition
      secondCondition.key = 'name3'
      secondCondition.value = 'test'

      resultUseCondition.result.current.setItem(firstCondition)
      resultUseCondition.result.current.setItem(secondCondition)

      resultUseQuery.rerender({
        actions: resultUseCondition.result.current,
        isComplex: resultUseCondition.result.current.complex.state,
      })

      const result = resultUseQuery.result.current.validate('root')

      expect(result).toBeNull()
    })

    test('should return error message if there is empty group', async () => {
      const { resultUseQuery, resultUseCondition } = await importUseQuery()

      let prevGroup = 'root'

      for (let i = 0; i < 20; ++i) {
        prevGroup = resultUseCondition.result.current.addItem('group', prevGroup)
      }

      for (const key in resultUseCondition.result.current.conditionMap) {
        if (resultUseCondition.result.current.getType(key) === 'condition') {
          const item = resultUseCondition.result.current.getItem(key) as Condition
          item.key = 'name'
          item.value = 'test'

          resultUseCondition.result.current.setItem(item)
        }
      }

      resultUseCondition.result.current.removeItem('group-40')
      resultUseCondition.result.current.removeItem('condition-39')
      resultUseQuery.rerender({
        actions: resultUseCondition.result.current,
        isComplex: resultUseCondition.result.current.complex.state,
      })

      const result = resultUseQuery.result.current.validate('root')

      expect(result).toEqual('Please remove the group with no conditions')
    })

    test('should return error message if there is empty key-value', async () => {
      const { resultUseQuery, resultUseCondition } = await importUseQuery()

      const conditionId = resultUseCondition.result.current.addItem('condition', 'root')
      const condition = resultUseCondition.result.current.getItem(conditionId) as Condition
      condition.key = 'name'
      condition.value = ''
      resultUseCondition.result.current.setItem(condition)

      resultUseQuery.rerender({
        actions: resultUseCondition.result.current,
        isComplex: resultUseCondition.result.current.complex.state,
      })

      const result = resultUseQuery.result.current.validate('root')

      expect(result).toEqual('Please fill all Columns and Keywords')

      condition.key = ''
      condition.value = 'value'

      resultUseCondition.result.current.setItem(condition)
      resultUseQuery.rerender({
        actions: resultUseCondition.result.current,
        isComplex: resultUseCondition.result.current.complex.state,
      })

      const result2 = resultUseQuery.result.current.validate('root')
      expect(result2).toEqual('Please fill all Columns and Keywords')
    })
  })
})
