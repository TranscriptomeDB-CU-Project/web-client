import { renderHook } from '@testing-library/react'
import { describe, expect, test, vi } from 'vitest'

import { Condition, ConditionGroup, ConditionType, MatchType, Operator } from '@/app/search/types'
import useSwitch from '@/hooks/useSwitch'
import { Counter, mockId } from '@/utils/test/mockId'

import { getMockCondition, getMockConditionGroup } from './mock'

describe('useCondition', async () => {
  mockId()

  const { default: useQuery } = await import('.')
  const { default: useCondition } = await import('../useCondition')

  const renderUseQuery = async (isComplex?: boolean) => {
    const items: Record<string, Condition | ConditionGroup> = {}
    items['root'] = getMockConditionGroup('root', 'root')

    const mockGetItem = vi.fn().mockImplementation((id: string) => items[id]) as (
      id: string,
    ) => Condition | ConditionGroup

    const addItem = (type: ConditionType, parent: string, others?: Partial<Condition | ConditionGroup>) => {
      const itemId = Counter.id()
      const parentItem = items[parent] as ConditionGroup
      parentItem.conditions.push(itemId)
      if (type === ConditionType.SINGLE) {
        items[itemId] = { ...getMockCondition(itemId, parent), ...others } as Condition
      } else {
        items[itemId] = { ...getMockConditionGroup(itemId, parent), ...others } as ConditionGroup
      }
      return itemId
    }

    const getHook = () => {
      const hook = renderHook(() =>
        useQuery({
          getItem: mockGetItem,
          complex: {
            state: isComplex ?? false,
          } as ReturnType<typeof useSwitch>,
        } as ReturnType<typeof useCondition>),
      )
      return hook.result.current
    }

    const constructQuery = () => getHook().constructQuery()

    const validate = (id: string) => getHook().validate(id)

    return {
      addItem,
      constructQuery,
      validate,
    }
  }

  describe('constructQuery()', async () => {
    test('should create ParameterCondition from Condition correctly', async () => {
      const { addItem, constructQuery } = await renderUseQuery()

      const condition: Condition = {
        id: '1',
        type: ConditionType.SINGLE,
        key: 'name',
        value: 'test',
        include: false,
        matchType: MatchType.CONTAINS,
        operator: Operator.AND,
        parentId: 'root',
      }

      addItem(ConditionType.SINGLE, 'root', condition)

      expect(constructQuery()).toEqual({
        query: {
          key: 'name',
          valuetype: 'STRING',
          condition: {
            include: false,
            matchtype: MatchType.CONTAINS,
            value: 'test',
          },
        },
      })
    })

    describe('simple query', async () => {
      test('should return ParameterCondition when there is only one condition', async () => {
        const { constructQuery, addItem } = await renderUseQuery()
        addItem(ConditionType.SINGLE, 'root')

        expect(constructQuery()).toMatchObject({
          query: {
            key: '1',
          },
        })
      })

      test('should return ParamsWithOps when there are multiple conditions', async () => {
        const { constructQuery, addItem } = await renderUseQuery()

        addItem(ConditionType.SINGLE, 'root')
        addItem(ConditionType.SINGLE, 'root')
        addItem(ConditionType.SINGLE, 'root')
        expect(constructQuery()).toMatchObject({
          query: {
            op: Operator.AND,
            params: [{ key: '1' }, { key: '2' }, { key: '3' }],
          },
        })
      })

      test('should split into multiple ParamsWithOps when there are different operators', async () => {
        const { constructQuery, addItem } = await renderUseQuery()

        addItem(ConditionType.SINGLE, 'root')
        addItem(ConditionType.SINGLE, 'root')
        addItem(ConditionType.SINGLE, 'root', { operator: Operator.OR })
        addItem(ConditionType.SINGLE, 'root')
        addItem(ConditionType.SINGLE, 'root')

        expect(constructQuery()).toMatchObject({
          query: {
            op: Operator.AND,
            params: [
              {
                op: Operator.OR,
                params: [
                  {
                    op: Operator.AND,
                    params: [{ key: '1' }, { key: '2' }],
                  },
                  { key: '3' },
                ],
              },
              { key: '4' },
              { key: '5' },
            ],
          },
        })
      })
    })

    describe('complex query', async () => {
      test('should return complex query correctly', async () => {
        const { constructQuery, addItem } = await renderUseQuery(true)

        addItem(ConditionType.SINGLE, 'root')
        const groupId1 = addItem(ConditionType.GROUP, 'root')
        addItem(ConditionType.SINGLE, groupId1)
        const groupId2 = addItem(ConditionType.GROUP, groupId1, { operator: Operator.OR })
        addItem(ConditionType.SINGLE, groupId2)
        addItem(ConditionType.SINGLE, 'root')

        expect(constructQuery()).toMatchObject({
          query: {
            op: Operator.AND,
            params: [
              { key: '1' },
              {
                op: Operator.AND,
                params: [
                  { key: '3' },
                  {
                    params: [{ key: '5' }],
                    op: Operator.OR,
                  },
                ],
              },
              { key: '6' },
            ],
          },
        })
      })
    })
  })

  describe('validate()', async () => {
    test('should return null when condition is valid', async () => {
      const { addItem, validate } = await renderUseQuery()

      addItem(ConditionType.SINGLE, 'root')
      addItem(ConditionType.SINGLE, 'root')
      addItem(ConditionType.SINGLE, 'root')

      expect(validate('root')).toBeNull()
    })

    test('should return error message if there is empty group', async () => {
      const { addItem, validate } = await renderUseQuery()

      let prevGroup = 'root'

      for (let i = 0; i < 20; ++i) {
        prevGroup = addItem(ConditionType.GROUP, prevGroup)
      }

      expect(validate('root')).toEqual('Please remove the group with no conditions')
    })

    test('should return error message if there is empty key', async () => {
      const { validate, addItem } = await renderUseQuery()

      addItem(ConditionType.SINGLE, 'root', { key: '' })

      expect(validate('root')).toEqual('Please fill all Columns and Keywords')
    })

    test('should return error message if there is empty value', async () => {
      const { validate, addItem } = await renderUseQuery()

      addItem(ConditionType.SINGLE, 'root', { value: '' })

      expect(validate('root')).toEqual('Please fill all Columns and Keywords')
    })
  })
})
