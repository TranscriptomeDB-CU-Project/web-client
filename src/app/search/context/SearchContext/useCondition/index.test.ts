import { renderHook } from '@testing-library/react-hooks'
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'

import { Condition, ConditionType, MatchType, Operator } from '@/app/search/types'

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

  test('should render default state correctly', async () => {
    const { default: useCondition } = await import('.')

    const { result } = renderHook(() => useCondition())

    expect(result.current.complex.state).toBe(false)
    expect(result.current.conditionMap).toStrictEqual({
      root: {
        id: 'root',
        parentId: 'root',
        conditions: ['1'],
        operator: 'AND',
        type: ConditionType.GROUP,
      },
      '1': {
        id: '1',
        parentId: 'root',
        key: '',
        value: '',
        matchType: MatchType.CONTAINS,
        include: true,
        operator: Operator.AND,
        type: ConditionType.SINGLE,
      },
    })
  })

  describe('addItem()', () => {
    afterEach(() => {
      vi.restoreAllMocks()
    })

    test('should add condition item correctly', async () => {
      const { default: useCondition } = await import('.')

      const { result } = renderHook(() => useCondition())

      const id = result.current.addItem(ConditionType.SINGLE, 'root')

      expect(result.current.conditionMap).toStrictEqual({
        root: {
          id: 'root',
          parentId: 'root',
          conditions: ['1', id],
          operator: 'AND',
          type: ConditionType.GROUP,
        },
        '1': {
          id: '1',
          parentId: 'root',
          key: '',
          value: '',
          matchType: MatchType.CONTAINS,
          include: true,
          operator: Operator.AND,
          type: ConditionType.SINGLE,
        },
        [id]: {
          id,
          parentId: 'root',
          key: '',
          value: '',
          matchType: MatchType.CONTAINS,
          include: true,
          operator: Operator.AND,
          type: ConditionType.SINGLE,
        },
      })
    })

    test('should add group item correctly', async () => {
      const { default: useCondition } = await import('.')

      const { result } = renderHook(() => useCondition())

      const id = result.current.addItem(ConditionType.GROUP, 'root')

      expect(result.current.conditionMap).toStrictEqual({
        root: {
          id: 'root',
          parentId: 'root',
          conditions: ['1', id],
          operator: 'AND',
          type: ConditionType.GROUP,
        },
        '1': {
          id: '1',
          parentId: 'root',
          key: '',
          value: '',
          matchType: MatchType.CONTAINS,
          include: true,
          operator: Operator.AND,
          type: ConditionType.SINGLE,
        },
        '3': {
          id: '3',
          parentId: id,
          key: '',
          value: '',
          matchType: MatchType.CONTAINS,
          include: true,
          operator: Operator.AND,
          type: ConditionType.SINGLE,
        },
        [id]: {
          id,
          parentId: 'root',
          conditions: ['3'],
          operator: Operator.AND,
          type: ConditionType.GROUP,
        },
      })
    })
  })

  describe('getItem()', () => {
    test('should get item by key correctly', async () => {
      const { default: useCondition } = await import('.')

      const { result } = renderHook(() => useCondition())

      const id = result.current.addItem(ConditionType.SINGLE, 'root')

      const item = result.current.getItem(id)

      expect(item).toStrictEqual({
        id,
        parentId: 'root',
        key: '',
        value: '',
        matchType: MatchType.CONTAINS,
        include: true,
        operator: Operator.AND,
        type: ConditionType.SINGLE,
      })
    })
  })

  describe('setItem()', () => {
    test('should set item correctly', async () => {
      const { default: useCondition } = await import('.')

      const { result } = renderHook(() => useCondition())

      const id = result.current.addItem(ConditionType.SINGLE, 'root')

      const newItem: Condition = {
        id,
        parentId: 'root',
        key: 'new-key',
        value: 'new-value',
        matchType: MatchType.MATCH,
        include: false,
        operator: Operator.OR,
        type: ConditionType.SINGLE,
      }

      result.current.setItem(newItem)

      expect(result.current.conditionMap).toStrictEqual({
        root: {
          id: 'root',
          parentId: 'root',
          conditions: ['1', id],
          operator: 'AND',
          type: ConditionType.GROUP,
        },
        '1': {
          id: '1',
          parentId: 'root',
          key: '',
          value: '',
          matchType: MatchType.CONTAINS,
          include: true,
          operator: Operator.AND,
          type: ConditionType.SINGLE,
        },
        [id]: newItem,
      })
    })
  })

  describe('getParent()', () => {
    test('should get parent correctly', async () => {
      const { default: useCondition } = await import('.')

      const { result } = renderHook(() => useCondition())

      const id = result.current.addItem(ConditionType.SINGLE, 'root')

      const parent = result.current.getParent(id)

      expect(parent).toStrictEqual({
        id: 'root',
        parentId: 'root',
        conditions: ['1', id],
        operator: 'AND',
        type: ConditionType.GROUP,
      })
    })
  })

  describe('removeItem()', () => {
    test('should remove item correctly', async () => {
      const { default: useCondition } = await import('.')

      const { result } = renderHook(() => useCondition())

      const id = result.current.addItem(ConditionType.SINGLE, 'root')

      result.current.removeItem(id)

      expect(result.current.conditionMap).toStrictEqual({
        root: {
          id: 'root',
          parentId: 'root',
          conditions: ['1'],
          operator: 'AND',
          type: ConditionType.GROUP,
        },
        '1': {
          id: '1',
          parentId: 'root',
          key: '',
          value: '',
          matchType: MatchType.CONTAINS,
          include: true,
          operator: Operator.AND,
          type: ConditionType.SINGLE,
        },
      })
    })

    test('should remove group item correctly', async () => {
      const { default: useCondition } = await import('.')

      const { result } = renderHook(() => useCondition())

      const group1 = result.current.addItem(ConditionType.GROUP, 'root')
      const group2 = result.current.addItem(ConditionType.GROUP, group1)
      const group3 = result.current.addItem(ConditionType.GROUP, group2)

      for (let i = 0; i < 3; i++) {
        result.current.addItem(ConditionType.SINGLE, group3)
      }

      result.current.removeItem(group2)

      expect(result.current.conditionMap).toStrictEqual({
        root: {
          id: 'root',
          parentId: 'root',
          conditions: ['1', group1],
          operator: 'AND',
          type: ConditionType.GROUP,
        },
        '1': {
          id: '1',
          parentId: 'root',
          key: '',
          value: '',
          matchType: MatchType.CONTAINS,
          include: true,
          operator: Operator.AND,
          type: ConditionType.SINGLE,
        },
        '3': {
          id: '3',
          parentId: group1,
          key: '',
          value: '',
          matchType: MatchType.CONTAINS,
          include: true,
          operator: Operator.AND,
          type: ConditionType.SINGLE,
        },
        [group1]: {
          id: group1,
          parentId: 'root',
          conditions: ['3'],
          operator: Operator.AND,
          type: ConditionType.GROUP,
        },
      })
    })
  })

  describe('reset()', () => {
    test('should reset state correctly', async () => {
      const { default: useCondition } = await import('.')

      const { result, waitForNextUpdate } = renderHook(() => useCondition())

      for (let i = 0; i < 20; ++i) result.current.addItem(ConditionType.SINGLE, 'root')

      result.current.reset()

      await waitForNextUpdate()

      expect(result.current.conditionMap).toStrictEqual({
        root: {
          id: 'root',
          parentId: 'root',
          conditions: ['22'],
          operator: 'AND',
          type: ConditionType.GROUP,
        },
        '22': {
          id: '22',
          parentId: 'root',
          key: '',
          value: '',
          matchType: MatchType.CONTAINS,
          include: true,
          operator: Operator.AND,
          type: ConditionType.SINGLE,
        },
      })
    })

    test('should reset state after toggle complex state', async () => {
      const { default: useCondition } = await import('.')

      const { result, waitForNextUpdate } = renderHook(() => useCondition())

      for (let i = 0; i < 20; ++i) result.current.addItem(ConditionType.SINGLE, 'root')

      result.current.complex.toggle()

      await waitForNextUpdate()

      expect(result.current.conditionMap).toStrictEqual({
        root: {
          id: 'root',
          parentId: 'root',
          conditions: ['22'],
          operator: 'AND',
          type: ConditionType.GROUP,
        },
        '22': {
          id: '22',
          parentId: 'root',
          key: '',
          value: '',
          matchType: MatchType.CONTAINS,
          include: true,
          operator: Operator.AND,
          type: ConditionType.SINGLE,
        },
      })
    })
  })
})
