import { useEffect, useState } from 'react'

import SampleApi from '@/api/SampleApi'

import { IUseColumn } from '../useColumn/types'
import { IUseSample } from './types'

const useSample = (token: string, { selected, sortBy, get: getColumn }: IUseColumn): IUseSample => {
  const [page, setPage] = useState<number>(1)
  const [maxPage, setMaxPage] = useState<number>()
  const [limit, setLimit] = useState<number>(20)
  const [data, setData] = useState<
    {
      id: string
      [key: string]: any
    }[]
  >()

  useEffect(() => {
    const fetchSample = async () => {
      const res = await SampleApi.getSamples({
        token,
        page,
        select: selected.map(({ name, query }) => ({
          colname: name,
          keyword: query,
          coltype: getColumn(name)!.coltype,
        })),
        sort: sortBy
          ? [
              {
                key: sortBy?.columnName,
                order: sortBy?.direction,
              },
            ]
          : undefined,
        limit,
      })
      setMaxPage(res.maxpage)
      setData(res.data)
    }

    fetchSample()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [limit, page, token, sortBy, JSON.stringify(selected)])

  return {
    page,
    setPage,
    maxPage,
    data,
    limit,
    setLimit,
    estimatedCount: limit * (maxPage || 1),
  }
}

export default useSample
