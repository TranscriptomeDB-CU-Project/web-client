import { useEffect, useState } from 'react'

import { ColumnApi } from '@/api/ColumnApi'
import { Column } from '@/app/select/types'
import { OrderDirection } from '@/dto/types'
import useSwitch from '@/hooks/useSwitch'

const useColumn = (token: string) => {
  const [columns, setColumns] = useState<Map<string, Column>>(new Map())
  const [selectedColumns, setSelectedColumns] = useState<{ id: string; query: string }[]>([])
  const [sortBy, setSortBy] = useState<{ columnId: string; direction: OrderDirection }>()
  const isFetching = useSwitch(true)

  useEffect(() => {
    const fetchColumns = async () => {
      isFetching.setOn()
      const main = await ColumnApi.getByToken(token)
      main.forEach((column) => {
        columns.set(column.id, column)
      })
      setColumns(new Map(columns))

      const secondary = await ColumnApi.getSecondaryByToken(token)
      secondary.forEach((column) => {
        columns.set(column.id, column)
      })
      setColumns(new Map(columns))
      isFetching.setOff()
    }

    fetchColumns()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token])

  const add = (id: string) => {
    setSelectedColumns((prev) => [...prev, { id, query: '' }])
  }

  const remove = (columnId: string) => {
    setSelectedColumns((prev) => prev.filter(({ id }) => columnId !== id))
  }

  const get = (columnId: string) => {
    return columns.get(columnId)
  }

  const rearrange = (columnId: string, newIndex: number) => {
    setSelectedColumns((prev) => {
      const newSelectedColumns = prev.filter(({ id }) => id !== columnId)
      newSelectedColumns.splice(newIndex, 0, prev.find(({ id }) => id === columnId)!)
      return newSelectedColumns
    })
  }

  const setQuery = (columnId: string, query: string) => {
    setSelectedColumns((prev) => {
      const index = prev.findIndex(({ id }) => id === columnId)
      prev[index].query = query
      return [...prev]
    })
  }

  const setSort = (columnId: string) => {
    setSortBy((prev) => {
      if (prev?.columnId === columnId) {
        return { columnId, direction: prev.direction === OrderDirection.ASC ? OrderDirection.DESC : OrderDirection.ASC }
      }
      return { columnId, direction: OrderDirection.ASC }
    })
  }

  const getSelected = () => {
    return selectedColumns.map(({ id }) => columns.get(id)!)
  }

  const getSuggestion = (keyword: string) => {
    return Array.from(columns.values()).filter(({ colname }) => colname.includes(keyword))
  }

  return {
    get,
    add,
    remove,
    rearrange,
    setSort,
    getSelected,
    sortBy,
    setQuery,
    getSuggestion,
    isFetching: isFetching.state,
  }
}

export default useColumn
