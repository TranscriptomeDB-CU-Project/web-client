import { renderHook } from '@testing-library/react-hooks'
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'

import { MatchType, Operator } from '@/app/search/types'

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
        conditions: ['condition-1'],
        operator: 'AND',
      },
      'condition-1': {
        id: 'condition-1',
        parentId: 'root',
        key: '',
        value: '',
        matchType: MatchType.CONTAINS,
        include: true,
        operator: Operator.AND,
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

      const id = result.current.addItem('condition', 'root')

      expect(result.current.conditionMap).toStrictEqual({
        root: {
          id: 'root',
          parentId: 'root',
          conditions: ['condition-1', id],
          operator: 'AND',
        },
        'condition-1': {
          id: 'condition-1',
          parentId: 'root',
          key: '',
          value: '',
          matchType: MatchType.CONTAINS,
          include: true,
          operator: Operator.AND,
        },
        [id]: {
          id,
          parentId: 'root',
          key: '',
          value: '',
          matchType: MatchType.CONTAINS,
          include: true,
          operator: Operator.AND,
        },
      })
    })

    test('should add group item correctly', async () => {
      const { default: useCondition } = await import('.')

      const { result } = renderHook(() => useCondition())

      const id = result.current.addItem('group', 'root')

      expect(result.current.conditionMap).toStrictEqual({
        root: {
          id: 'root',
          parentId: 'root',
          conditions: ['condition-1', id],
          operator: 'AND',
        },
        'condition-1': {
          id: 'condition-1',
          parentId: 'root',
          key: '',
          value: '',
          matchType: MatchType.CONTAINS,
          include: true,
          operator: Operator.AND,
        },
        'condition-3': {
          id: 'condition-3',
          parentId: id,
          key: '',
          value: '',
          matchType: MatchType.CONTAINS,
          include: true,
          operator: Operator.AND,
        },
        [id]: {
          id,
          parentId: 'root',
          conditions: ['condition-3'],
          operator: Operator.AND,
        },
      })
    })

    test('should not allow if append condition to condition', async () => {
      const { default: useCondition } = await import('.')

      const { result } = renderHook(() => useCondition())

      const id = result.current.addItem('condition', 'root')

      const newItem = result.current.addItem('condition', id)

      expect(newItem).toBeNull()
    })
  })

  describe('getItem()', () => {
    test('should get item by key correctly', async () => {
      const { default: useCondition } = await import('.')

      const { result } = renderHook(() => useCondition())

      const id = result.current.addItem('condition', 'root')

      const item = result.current.getItem(id)

      expect(item).toStrictEqual({
        id,
        parentId: 'root',
        key: '',
        value: '',
        matchType: MatchType.CONTAINS,
        include: true,
        operator: Operator.AND,
      })
    })
  })

  describe('getType()', () => {
    test('should get type by key correctly', async () => {
      const { default: useCondition } = await import('.')

      const { result } = renderHook(() => useCondition())

      const id = result.current.addItem('condition', 'root')

      const newType = result.current.getType(id)
      expect(newType).toBe('condition')

      const rootType = result.current.getType('root')
      expect(rootType).toStrictEqual('group')

      const notFoundType = result.current.getType('not-found')
      expect(notFoundType).toBeNull()
    })
  })

  describe('setItem()', () => {
    test('should set item correctly', async () => {
      const { default: useCondition } = await import('.')

      const { result } = renderHook(() => useCondition())

      const id = result.current.addItem('condition', 'root')

      const newItem = {
        id,
        parentId: 'root',
        key: 'new-key',
        value: 'new-value',
        matchType: MatchType.MATCH,
        include: false,
        operator: Operator.OR,
      }

      result.current.setItem(newItem)

      expect(result.current.conditionMap).toStrictEqual({
        root: {
          id: 'root',
          parentId: 'root',
          conditions: ['condition-1', id],
          operator: 'AND',
        },
        'condition-1': {
          id: 'condition-1',
          parentId: 'root',
          key: '',
          value: '',
          matchType: MatchType.CONTAINS,
          include: true,
          operator: Operator.AND,
        },
        [id]: newItem,
      })
    })
  })

  describe('getParent()', () => {
    test('should get parent correctly', async () => {
      const { default: useCondition } = await import('.')

      const { result } = renderHook(() => useCondition())

      const id = result.current.addItem('condition', 'root')

      const parent = result.current.getParent(id)

      expect(parent).toStrictEqual({
        id: 'root',
        parentId: 'root',
        conditions: ['condition-1', id],
        operator: 'AND',
      })
    })
  })

  describe('removeItem()', () => {
    test('should remove item correctly', async () => {
      const { default: useCondition } = await import('.')

      const { result } = renderHook(() => useCondition())

      const id = result.current.addItem('condition', 'root')

      result.current.removeItem(id)

      expect(result.current.conditionMap).toStrictEqual({
        root: {
          id: 'root',
          parentId: 'root',
          conditions: ['condition-1'],
          operator: 'AND',
        },
        'condition-1': {
          id: 'condition-1',
          parentId: 'root',
          key: '',
          value: '',
          matchType: MatchType.CONTAINS,
          include: true,
          operator: Operator.AND,
        },
      })
    })

    test('should remove group item correctly', async () => {
      const { default: useCondition } = await import('.')

      const { result } = renderHook(() => useCondition())

      const group1 = result.current.addItem('group', 'root')
      const group2 = result.current.addItem('group', group1)
      const group3 = result.current.addItem('group', group2)

      for (let i = 0; i < 3; i++) {
        result.current.addItem('condition', group3)
      }

      result.current.removeItem(group2)

      expect(result.current.conditionMap).toStrictEqual({
        root: {
          id: 'root',
          parentId: 'root',
          conditions: ['condition-1', group1],
          operator: 'AND',
        },
        'condition-1': {
          id: 'condition-1',
          parentId: 'root',
          key: '',
          value: '',
          matchType: MatchType.CONTAINS,
          include: true,
          operator: Operator.AND,
        },
        'condition-3': {
          id: 'condition-3',
          parentId: group1,
          key: '',
          value: '',
          matchType: MatchType.CONTAINS,
          include: true,
          operator: Operator.AND,
        },
        [group1]: {
          id: group1,
          parentId: 'root',
          conditions: ['condition-3'],
          operator: Operator.AND,
        },
      })
    })
  })

  describe('reset()', () => {
    test('should reset state correctly', async () => {
      const { default: useCondition } = await import('.')

      const { result, waitForNextUpdate } = renderHook(() => useCondition())

      for (let i = 0; i < 20; ++i) result.current.addItem('condition', 'root')

      result.current.reset()

      await waitForNextUpdate()

      expect(result.current.conditionMap).toStrictEqual({
        root: {
          id: 'root',
          parentId: 'root',
          conditions: ['condition-22'],
          operator: 'AND',
        },
        'condition-22': {
          id: 'condition-22',
          parentId: 'root',
          key: '',
          value: '',
          matchType: MatchType.CONTAINS,
          include: true,
          operator: Operator.AND,
        },
      })
    })

    test('should reset state after toggle complex state', async () => {
      const { default: useCondition } = await import('.')

      const { result, waitForNextUpdate } = renderHook(() => useCondition())

      for (let i = 0; i < 20; ++i) result.current.addItem('condition', 'root')

      result.current.complex.toggle()

      await waitForNextUpdate()

      expect(result.current.conditionMap).toStrictEqual({
        root: {
          id: 'root',
          parentId: 'root',
          conditions: ['condition-22'],
          operator: 'AND',
        },
        'condition-22': {
          id: 'condition-22',
          parentId: 'root',
          key: '',
          value: '',
          matchType: MatchType.CONTAINS,
          include: true,
          operator: Operator.AND,
        },
      })
    })
  })
})
