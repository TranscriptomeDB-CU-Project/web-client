import { useEffect, useState } from 'react'

import { SampleApi } from '@/api/SampleApi'

import { IUseColumn } from '../useColumn/types'
import { IUseSample } from './types'

const useSample = (token: string, columnActions: IUseColumn): IUseSample => {
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
        select: columnActions.selected.map(({ name, query }) => ({
          colname: name,
          keyword: query,
          coltype: columnActions.get(name)!.coltype,
        })),
        sort: columnActions.sortBy
          ? [
              {
                key: columnActions.sortBy?.columnName,
                order: columnActions.sortBy?.direction,
              },
            ]
          : undefined,
        limit,
      })
      setPage(res.page)
      setMaxPage(res.maxpage)
      setData(res.data)
    }

    fetchSample()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [limit, page, token, columnActions.sortBy, columnActions.selected])

  return {
    page,
    setPage,
    maxPage,
    data,
    limit,
    setLimit,
  }
}

export default useSample
