import { renderHook } from '@testing-library/react'
import { describe, expect, test, vi } from 'vitest'

import { Condition, ConditionGroup, ConditionType, Gender, MatchType, Operator } from '@/app/search/types'
import { ValueType } from '@/dto/types'
import { IUseSwitch } from '@/hooks/useSwitch/types'
import { Counter, mockId } from '@/utils/test/mockId'

import { Unit } from '../types'
import { IUseCondition } from '../useCondition/types'
import { IUseGeneralParam } from '../useGeneralParam/types'
import { getMockCondition, getMockConditionGroup } from './mock'

describe('useQuery', async () => {
  mockId()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
  const mockParse = (val: number, unit: Unit) => val

  vi.doMock('@/utils/age', () => ({
    parseAge: mockParse,
  }))

  const { default: useQuery } = await import('.')

  const renderUseQuery = async (isComplex?: boolean, generalParams?: Partial<IUseGeneralParam>) => {
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
        useQuery(
          {
            getItem: mockGetItem,
            complex: {
              state: isComplex ?? false,
            } as IUseSwitch,
          } as IUseCondition,
          {
            cellLine: {
              data: [] as string[],
            },
            gender: {
              enabled: false,
            },
            age: {
              enabled: false,
            },
            ...generalParams,
          } as IUseGeneralParam,
        ),
      )
      return hook.result.current
    }

    const constructQuery = () => getHook().constructQuery()

    const validate = () => getHook().validate()

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

    describe('with general params', async () => {
      test('should construct query with cell line correctly', async () => {
        const { constructQuery, addItem } = await renderUseQuery(false, {
          cellLine: {
            data: ['cell1'],
          },
        } as IUseGeneralParam)

        addItem(ConditionType.SINGLE, 'root')

        expect(constructQuery()).toMatchObject({
          query: {
            op: Operator.AND,
            params: [
              {
                key: 'cell line',
                valuetype: 'STRING',
                condition: {
                  include: true,
                  matchtype: MatchType.MATCH,
                  value: 'cell1',
                },
              },
              { key: '1' },
            ],
          },
        })
      })

      test('should construct query with age correctly', async () => {
        const { constructQuery, addItem } = await renderUseQuery(false, {
          age: {
            enabled: true,
            value: {
              min: '10',
              max: '20',
            },
          },
        } as IUseGeneralParam)

        addItem(ConditionType.SINGLE, 'root')

        expect(constructQuery()).toMatchObject({
          query: {
            op: Operator.AND,
            params: [
              {
                key: 'age<interval>',
                valuetype: ValueType.NUMBER,
                condition: {
                  lte: 20,
                  gte: 10,
                },
              },
              { key: '1' },
            ],
          },
        })
      })

      test('should construct query with gender correctly', async () => {
        const { constructQuery, addItem } = await renderUseQuery(false, {
          gender: {
            enabled: true,
            value: Gender.MALE,
          },
        } as IUseGeneralParam)

        addItem(ConditionType.SINGLE, 'root')

        expect(constructQuery()).toMatchObject({
          query: {
            op: Operator.AND,
            params: [
              {
                key: 'sex',
                valuetype: ValueType.STRING,
                condition: {
                  include: true,
                  matchtype: MatchType.MATCH,
                  value: 'male',
                },
              },
              { key: '1' },
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

      expect(validate()).toBeNull()
    })

    test('should return error message if there is empty group', async () => {
      const { addItem, validate } = await renderUseQuery()

      let prevGroup = 'root'

      for (let i = 0; i < 20; ++i) {
        prevGroup = addItem(ConditionType.GROUP, prevGroup)
      }

      expect(validate()).toEqual('Please remove the group with no conditions')
    })

    test('should return error message if there is empty key', async () => {
      const { validate, addItem } = await renderUseQuery()

      addItem(ConditionType.SINGLE, 'root', { key: '' })

      expect(validate()).toEqual('Please fill all Columns and Keywords')
    })

    test('should return error message if there is empty value', async () => {
      const { validate, addItem } = await renderUseQuery()

      addItem(ConditionType.SINGLE, 'root', { value: '' })

      expect(validate()).toEqual('Please fill all Columns and Keywords')
    })

    test('should return error when gender is enabled but not selected', async () => {
      const { validate } = await renderUseQuery(false, {
        gender: {
          enabled: true,
        },
      } as IUseGeneralParam)

      expect(validate()).toEqual('Please select gender')
    })

    test('should return error when age is enabled but not filled', async () => {
      const { validate } = await renderUseQuery(false, {
        age: {
          enabled: true,
          value: { min: '', max: '', unitMin: Unit.YEAR, unitMax: Unit.YEAR },
        },
      } as IUseGeneralParam)

      expect(validate()).toEqual('Please fill all age fields with valid numbers')
    })

    test('should return error when min age is greater than max age', async () => {
      const { validate } = await renderUseQuery(false, {
        age: {
          enabled: true,
          value: { min: '20', max: '10', unitMin: Unit.YEAR, unitMax: Unit.YEAR },
        },
      } as IUseGeneralParam)

      expect(validate()).toEqual('Minimum age should be less than or equal to maximum age')
    })

    test('should return error when age is negative', async () => {
      const { validate } = await renderUseQuery(false, {
        age: {
          enabled: true,
          value: { min: '-20', max: '10', unitMin: Unit.YEAR, unitMax: Unit.YEAR },
        },
      } as IUseGeneralParam)

      expect(validate()).toEqual('Age should be a positive number')
    })
  })
})
