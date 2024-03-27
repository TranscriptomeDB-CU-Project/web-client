import { renderHook } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { OrderDirection } from '@/dto/types'

import { MOCK_COLUMNS, MOCK_SECONDARY_COLUMNS } from './mock'

describe('useColumn()', async () => {
  const mockGetColumn = vi.fn()
  const mockGetSecondaryColumn = vi.fn()

  vi.doMock('@/api/ColumnApi', () => ({
    default: {
      getByToken: mockGetColumn,
      getSecondaryByToken: mockGetSecondaryColumn,
    },
  }))

  const { default: useColumn } = await import('.')

  beforeEach(() => {
    mockGetColumn.mockResolvedValue(MOCK_COLUMNS)
    mockGetSecondaryColumn.mockResolvedValue(MOCK_SECONDARY_COLUMNS)
  })
  afterEach(() => {
    vi.clearAllMocks()
  })

  const render = async (waitForInit = true) => {
    const result = renderHook(() => useColumn('token'))

    if (waitForInit) {
      await vi.waitFor(() => {
        expect(result.result.current.isFetching).toEqual(false)
      })
    }

    return result
  }

  describe('init', () => {
    it('should init columns correctly', async () => {
      const { result } = await render(false)

      await vi.waitFor(() => {
        expect(result.current.getSuggestion('', 100)).toEqual([
          ...MOCK_COLUMNS.map((column) => column.colname),
          ...MOCK_SECONDARY_COLUMNS.map((column) => column.colname),
        ])
      })
    })

    it('should load main columns first when secondary one is slow', async () => {
      vi.useFakeTimers()
      mockGetSecondaryColumn.mockResolvedValue(
        new Promise((resolve) => setTimeout(() => resolve(MOCK_SECONDARY_COLUMNS), 2000)),
      )

      const { result } = await render(false)

      await vi.waitFor(() => {
        expect(result.current.getSuggestion('', 100)).toEqual([...MOCK_COLUMNS.map((column) => column.colname)])
        expect(result.current.isFetching).toBe(true)
      })

      vi.advanceTimersByTime(2000)

      await vi.waitFor(() => {
        expect(result.current.getSuggestion('', 100)).toEqual([
          ...MOCK_COLUMNS.map((column) => column.colname),
          ...MOCK_SECONDARY_COLUMNS.map((column) => column.colname),
        ])
        expect(result.current.isFetching).toBe(false)
      })
    })
  })

  describe('add()', () => {
    it('should add selected columns correctly', async () => {
      const { result } = await render()

      result.current.add('column1')

      await vi.waitFor(() => {
        expect(result.current.selected).toEqual([{ name: 'column1', query: '' }])
      })
    })
  })

  describe('remove()', () => {
    it('should remove selected columns correctly', async () => {
      const { result } = await render()

      result.current.add('column1')
      result.current.add('column2')
      result.current.add('column3')
      result.current.remove('column2')
      await vi.waitFor(() => {
        expect(result.current.selected).toEqual([
          { name: 'column1', query: '' },
          { name: 'column3', query: '' },
        ])
      })
    })
  })

  describe('get()', () => {
    it('should get column correctly', async () => {
      const { result } = await render()

      expect(result.current.get('column1')).toEqual(MOCK_COLUMNS[0])
    })
  })

  describe('rearrange()', () => {
    it('should rearrange selected columns correctly', async () => {
      const { result } = await render()

      result.current.add('column1')
      result.current.add('column2')
      result.current.add('column3')
      result.current.rearrange('column1', 2)

      await vi.waitFor(() => {
        expect(result.current.selected).toEqual([
          { name: 'column2', query: '' },
          { name: 'column3', query: '' },
          { name: 'column1', query: '' },
        ])
      })
    })
  })

  describe('setQuery()', () => {
    it('should set query correctly', async () => {
      const { result } = await render()

      result.current.add('column1')
      result.current.setQuery('column1')('test')

      await vi.waitFor(() => {
        expect(result.current.selected).toEqual([{ name: 'column1', query: 'test' }])
      })
    })
  })

  describe('setSort()', () => {
    it('should set column and set order to ASC when there is no previous sort', async () => {
      const { result } = await render()

      result.current.setSort('column1')

      await vi.waitFor(() => {
        expect(result.current.sortBy).toEqual({ columnName: 'column1', direction: OrderDirection.ASC })
      })
    })

    it('should change column and set order to ASC when the previous sort is different column', async () => {
      const { result } = await render()

      result.current.setSort('column1')
      result.current.setSort('column2')

      await vi.waitFor(() => {
        expect(result.current.sortBy).toEqual({ columnName: 'column2', direction: OrderDirection.ASC })
      })
    })

    it('should toggle sort order when the previous sort is the same column', async () => {
      const { result } = await render()

      result.current.setSort('column1')
      result.current.setSort('column1')

      await vi.waitFor(() => {
        expect(result.current.sortBy).toEqual({ columnName: 'column1', direction: OrderDirection.DESC })
      })

      result.current.setSort('column1')

      await vi.waitFor(() => {
        expect(result.current.sortBy).toEqual({ columnName: 'column1', direction: OrderDirection.ASC })
      })
    })
  })

  describe('getSuggestion()', () => {
    it('should return 5 suggestion when no limit is set', async () => {
      const { result } = await render()

      expect(result.current.getSuggestion('column')).toEqual(['column1', 'column2', 'column3', 'column4', 'column5'])
    })

    it('should return suggestion correctly when limit is set', async () => {
      const { result } = await render()

      expect(result.current.getSuggestion('column', 3)).toEqual(['column1', 'column2', 'column3'])
    })

    it('should filter suggestion correctly', async () => {
      const { result } = await render()

      expect(result.current.getSuggestion('1')).toEqual(['column1'])
    })
  })
})
