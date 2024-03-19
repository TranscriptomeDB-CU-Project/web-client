import { renderHook, waitFor } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { Column } from '@/app/select/types'
import { ColumnType } from '@/dto/types'

import { IUseColumn } from '../useColumn/types'

describe('useSelect()', async () => {
  const mockGetIds = vi.fn().mockResolvedValue(['1', '2', '3'])
  const mockDownload = vi.fn().mockResolvedValue('download')

  const mockGetColumn = vi.fn().mockImplementation((name: string) => {
    if (name === 'name1') return { coltype: ColumnType.MAIN }
    return { coltype: ColumnType.OTHER }
  }) as (name: string) => Column | undefined

  vi.doMock('@/api/SampleApi', () => ({
    default: {
      getIds: mockGetIds,
      download: mockDownload,
    },
  }))

  const { default: useSelect } = await import('.')

  afterEach(() => {
    vi.clearAllMocks()
  })

  const render = (columnActions?: Partial<IUseColumn>) =>
    renderHook(({ token, colActions }: { token: string; colActions: IUseColumn }) => useSelect(token, colActions), {
      initialProps: {
        token: 'token',
        colActions: {
          selected: [
            { name: 'name1', query: 'query1' },
            { name: 'name2', query: 'query2' },
          ],
          get: mockGetColumn,
          ...columnActions,
        } as IUseColumn,
      },
    })

  describe('select()', () => {
    it('should select item correctly', async () => {
      const { result } = render()

      result.current.select('1', true)

      expect(result.current.isSelected('1')).toBe(true)
      await waitFor(() => {
        expect(result.current.count).toBe(1)
      })
    })

    it('should unselect item correctly', async () => {
      const { result } = render()

      result.current.select('1', true)
      result.current.select('1', false)

      expect(result.current.isSelected('1')).toBe(false)
      await waitFor(() => {
        expect(result.current.count).toBe(0)
      })
    })
  })

  describe('selectAll()', () => {
    it('should select all items correctly', async () => {
      const { result } = render()

      await result.current.selectAll(true)

      expect(mockGetIds).toBeCalledWith('token', [])

      expect(result.current.isSelected('1')).toBe(true)
      expect(result.current.isSelected('2')).toBe(true)
      expect(result.current.isSelected('3')).toBe(true)

      await waitFor(() => {
        expect(result.current.count).toBe(3)
      })
    })

    it('should unselect all items correctly', async () => {
      const { result } = render()

      result.current.select('1', true)
      result.current.select('2', true)
      result.current.select('3', true)

      await result.current.selectAll(false)

      expect(mockGetIds).not.toBeCalled()

      expect(result.current.isSelected('1')).toBe(false)
      expect(result.current.isSelected('2')).toBe(false)
      expect(result.current.isSelected('3')).toBe(false)

      await waitFor(() => {
        expect(result.current.count).toBe(0)
      })
    })
  })

  describe('selectByGroup()', () => {
    it('should select items by group correctly', async () => {
      const { result } = render()

      await result.current.selectByGroup('name1', 'value1', true)

      expect(mockGetIds).toBeCalledWith('token', [
        {
          colname: 'name1',
          keyword: 'value1',
          coltype: ColumnType.MAIN,
        },
      ])

      expect(result.current.isSelected('1')).toBe(true)
      expect(result.current.isSelected('2')).toBe(true)
      expect(result.current.isSelected('3')).toBe(true)

      await waitFor(() => {
        expect(result.current.count).toBe(3)
      })
    })

    it('should unselect items by group correctly', async () => {
      const { result } = render()

      result.current.select('1', true)
      result.current.select('2', true)
      result.current.select('5', true)

      await result.current.selectByGroup('name1', 'value1', false)

      expect(result.current.isSelected('1')).toBe(false)
      expect(result.current.isSelected('2')).toBe(false)
      expect(result.current.isSelected('5')).toBe(true)

      await waitFor(() => {
        expect(result.current.count).toBe(1)
      })
    })
  })

  describe('selectFiltered()', () => {
    it('should query items by filtered columns correctly', async () => {
      const { result } = render()

      await result.current.selectFiltered(true)

      expect(mockGetIds).toBeCalledWith('token', [
        { colname: 'name1', keyword: 'query1', coltype: ColumnType.MAIN },
        { colname: 'name2', keyword: 'query2', coltype: ColumnType.OTHER },
      ])
    })
  })

  describe('download()', () => {
    it('should download selected items correctly', async () => {
      const { result } = render()

      result.current.select('1', true)
      result.current.select('2', true)
      result.current.select('3', true)

      await result.current.download()

      expect(mockDownload).toBeCalledWith(['1', '2', '3'])
      expect(mockDownload).toBeCalledTimes(1)
    })
  })
})
