import { useEffect, useState } from 'react'

import { ColumnApi } from '@/api/ColumnApi'
import { Column } from '@/app/select/types'
import { OrderDirection } from '@/dto/types'
import useSwitch from '@/hooks/useSwitch'

import { IUseColumn } from './types'

const useColumn = (token: string): IUseColumn => {
  const [columns, setColumns] = useState<Map<string, Column>>(new Map())
  const [selectedColumns, setSelectedColumns] = useState<{ name: string; query: string }[]>([])
  const [sortBy, setSortBy] = useState<{ columnName: string; direction: OrderDirection }>()
  const isFetching = useSwitch(true)

  useEffect(() => {
    const fetchColumns = async () => {
      isFetching.setOn()
      const main = await ColumnApi.getByToken(token)
      main.forEach((column) => {
        columns.set(column.colname, column)
      })
      setColumns(new Map(columns))

      const secondary = await ColumnApi.getSecondaryByToken(token)
      secondary.forEach((column) => {
        columns.set(column.colname, column)
      })
      setColumns(new Map(columns))
      isFetching.setOff()
    }

    fetchColumns()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token])

  const add = (name: string) => {
    setSelectedColumns((prev) => [...prev, { name, query: '' }])
  }

  const remove = (columnName: string) => {
    setSelectedColumns((prev) => prev.filter(({ name }) => columnName !== name))
  }

  const get = (columnName: string) => {
    return columns.get(columnName)
  }

  const rearrange = (columnName: string, newIndex: number) => {
    setSelectedColumns((prev) => {
      const newSelectedColumns = prev.filter(({ name }) => name !== columnName)
      newSelectedColumns.splice(newIndex, 0, prev.find(({ name }) => name === columnName)!)
      return newSelectedColumns
    })
  }

  const setQuery = (columnName: string, query: string) => {
    setSelectedColumns((prev) => {
      const index = prev.findIndex(({ name }) => name === columnName)
      prev[index].query = query
      return [...prev]
    })
  }

  const setSort = (columnName: string) => {
    setSortBy((prev) => {
      if (prev?.columnName === columnName) {
        return {
          columnName,
          direction: prev.direction === OrderDirection.ASC ? OrderDirection.DESC : OrderDirection.ASC,
        }
      }
      return { columnName, direction: OrderDirection.ASC }
    })
  }

  const getSuggestion = (keyword: string) => {
    return Array.from(columns.keys()).filter((colname) => colname.includes(keyword))
  }

  return {
    get,
    add,
    remove,
    rearrange,
    setSort,
    selected: selectedColumns,
    sortBy,
    setQuery,
    getSuggestion,
    isFetching: isFetching.state,
  }
}

export default useColumn
