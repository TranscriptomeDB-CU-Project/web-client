import { useCallback, useState } from 'react'

import { Gender } from '@/app/search/types'
import useSwitch from '@/hooks/useSwitch'

import { AgeData, Unit } from '../types'

const useGeneralParam = () => {
  const [cellLines, setCellLines] = useState<string[]>([])

  const addCellLine = useCallback((cellLine: string) => {
    setCellLines((cellLines) => [...cellLines, cellLine])
  }, [])

  const removeCellLine = useCallback((cellLine: string) => {
    setCellLines((cellLines) => cellLines.filter((c) => c !== cellLine))
  }, [])

  const ageToggle = useSwitch()
  const [age, setAge] = useState<AgeData>({
    min: '',
    max: '',
    unitMin: Unit.YEAR,
    unitMax: Unit.YEAR,
  })

  const genderToggle = useSwitch()
  const [gender, setGender] = useState<Gender>()

  const setAgeByField = (field: keyof AgeData) => (value: string | Unit) =>
    setAge((age) => ({ ...age, [field]: value }))

  return {
    cellLine: {
      data: cellLines,
      add: addCellLine,
      remove: removeCellLine,
    },
    age: {
      value: age,
      setValue: setAgeByField,
      enabled: ageToggle.state,
      toggle: ageToggle.toggle,
    },
    gender: {
      value: gender,
      setValue: setGender,
      enabled: genderToggle.state,
      toggle: genderToggle.toggle,
    },
  }
}

export default useGeneralParam
