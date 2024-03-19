import { useRef, useState } from 'react'

import SampleApi from '@/api/SampleApi'

import { IUseColumn } from '../useColumn/types'
import { IUseSelect } from './types'

const useSelect = (token: string, column: IUseColumn): IUseSelect => {
  const selectedIds = useRef<Set<string>>(new Set())
  const [count, setCount] = useState(0)
  const updateSelected = (id: string[], include: boolean) => {
    if (include) {
      id.forEach((id) => selectedIds.current.add(id))
    } else {
      id.forEach((id) => selectedIds.current.delete(id))
    }
    setCount(selectedIds.current.size)
  }

  const selectByGroup = async (groupName: string, value: string, include: boolean) => {
    const ids = await SampleApi.getIds(token, [
      {
        colname: groupName,
        keyword: value,
        coltype: column.get(groupName)!.coltype,
      },
    ])

    updateSelected(ids, include)
  }

  const selectFiltered = async (include: boolean) => {
    const ids = await SampleApi.getIds(
      token,
      column.selected.map(({ name, query }) => ({
        colname: name,
        keyword: query,
        coltype: column.get(name)!.coltype,
      })),
    )

    updateSelected(ids, include)
  }

  const selectAll = async (include: boolean) => {
    if (!include) {
      selectedIds.current.clear()
      setCount(0)
    } else {
      const ids = await SampleApi.getIds(token, [])
      updateSelected(ids, true)
    }
  }

  const select = (id: string, include: boolean) => {
    updateSelected([id], include)
  }

  const isSelected = (id: string) => {
    return selectedIds.current.has(id)
  }

  const download = async () => {
    await SampleApi.download(Array.from(selectedIds.current))
  }

  return {
    count,
    selectByGroup,
    selectFiltered,
    selectAll,
    select,
    isSelected,
    download,
  }
}

export default useSelect
