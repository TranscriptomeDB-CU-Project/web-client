import { renderHook, waitFor } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { Column } from '@/app/select/types'
import { ColumnType, OrderDirection } from '@/dto/types'

import { IUseColumn } from '../useColumn/types'

describe('useSample()', async () => {
  const mockGetSamples = vi.fn().mockResolvedValue({
    page: 1,
    maxpage: 1,
    data: [],
  })
  const mockGetColumn = vi.fn().mockReturnValue({
    coltype: ColumnType.MAIN,
  }) as (name: string) => Column | undefined

  vi.doMock('@/api/SampleApi', () => ({
    default: {
      getSamples: mockGetSamples,
    },
  }))

  const { default: useSample } = await import('.')

  afterEach(() => {
    vi.clearAllMocks()
  })

  const render = (columnActions?: Partial<IUseColumn>) =>
    renderHook(({ token, colActions }: { token: string; colActions: IUseColumn }) => useSample(token, colActions), {
      initialProps: {
        token: 'token',
        colActions: {
          selected: [{ name: 'name', query: 'query' }],
          get: mockGetColumn,
          ...columnActions,
        } as IUseColumn,
      },
    })

  describe('sample fetching', () => {
    it('should fetch initial samples and set state correctly', async () => {
      mockGetSamples.mockResolvedValue({
        page: 1,
        maxpage: 5,
        data: [{ id: 'id' }],
      })

      const { result } = render({
        selected: [{ name: 'name', query: 'query' }],
        sortBy: { columnName: 'name', direction: OrderDirection.ASC },
      })

      expect(mockGetSamples).toBeCalledWith({
        token: 'token',
        limit: 20,
        page: 1,
        select: [{ colname: 'name', keyword: 'query', coltype: ColumnType.MAIN }],
        sort: [{ key: 'name', order: OrderDirection.ASC }],
      })

      await vi.waitFor(() => {
        expect(result.current.page).toEqual(1)
        expect(result.current.maxPage).toEqual(5)
        expect(result.current.data).toEqual([{ id: 'id' }])
      })

      expect(mockGetSamples).toBeCalledTimes(1)
    })

    it('should fetch sample when page is changed', async () => {
      const { result } = render()

      result.current.setPage(2)

      await waitFor(() => {
        expect(mockGetSamples).toBeCalledTimes(2)
      })
    })

    it('should fetch sample when limit is changed', async () => {
      const { result } = render()

      result.current.setLimit(30)

      await waitFor(() => {
        expect(mockGetSamples).toBeCalledTimes(2)
      })
      expect(mockGetSamples).toBeCalledTimes(2)
    })

    it('should fetch sample when selected columns are changed', async () => {
      const { rerender } = render()
      rerender({
        token: 'token',
        colActions: {
          selected: [
            { name: 'name', query: 'query' },
            { name: 'name2', query: 'query' },
          ],
          get: mockGetColumn,
        } as IUseColumn,
      })

      await waitFor(() => {
        expect(mockGetSamples).toBeCalledTimes(2)
      })
      expect(mockGetSamples).toBeCalledTimes(2)
    })

    it('should fetch sample when sortBy is changed', async () => {
      const { rerender } = render()

      rerender({
        token: 'token',
        colActions: {
          selected: [{ name: 'name', query: 'query' }],
          get: mockGetColumn,
          sortBy: { columnName: 'name', direction: OrderDirection.ASC },
        } as IUseColumn,
      })

      await waitFor(() => {
        expect(mockGetSamples).toBeCalledTimes(2)
      })
      expect(mockGetSamples).toBeCalledTimes(2)
    })
  })
})
