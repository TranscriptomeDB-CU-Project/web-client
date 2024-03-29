import { useCallback, useEffect, useMemo, useState } from 'react'

import SampleApi from '@/api/SampleApi'
import { useSample } from '@/app/select/context/SampleContext'
import { GetGroupSamplesResponseDTO } from '@/dto/types'
import useSwitch from '@/hooks/useSwitch'

import { ModalType, SelectedValue } from './types'

const useGroupBy = () => {
  const [selectedGroup, setSelectedGroup] = useState<string>('')
  const [groupList, setGroupList] = useState<GetGroupSamplesResponseDTO['data']>([])
  const [selectedValue, setSelectedValue] = useState<SelectedValue>()

  const modal = useSwitch()

  const { column, select } = useSample()

  const handleSelectGroup = useCallback((value: string) => {
    if (!value) return

    setSelectedGroup(value)
  }, [])

  const handleConfirmGrouping = useCallback(() => {
    if (!selectedValue) return

    select.selectByGroup(selectedGroup, selectedValue.value, selectedValue.type === 'ADD')
    modal.setOff()
  }, [modal, select, selectedGroup, selectedValue])

  const handleOpenModal = useCallback(
    (value: string, type: ModalType) => {
      setSelectedValue({
        value,
        type,
      })
      modal.setOn()
    },
    [modal],
  )

  const availableFilter = useMemo(
    () =>
      column.selected.map((val) => ({
        label: val.name,
        value: val.name,
      })),
    [column.selected],
  )

  useEffect(() => {
    const fetchGroupValue = async () => {
      const columnData = column.get(selectedGroup)
      if (!columnData) return

      const res = await SampleApi.getGroup('DUMMY_TOKEN', columnData)
      setGroupList(res.data)
    }

    if (selectedGroup) {
      fetchGroupValue()
    }
  }, [column, selectedGroup])

  return {
    selectedGroup,
    groupList,
    modal,
    availableFilter,
    handleSelectGroup,
    handleOpenModal,
    handleConfirmGrouping,
  }
}

export default useGroupBy
