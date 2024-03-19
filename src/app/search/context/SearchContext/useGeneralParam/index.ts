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
  const age = useState<AgeData>({
    min: '',
    max: '',
    unitMin: Unit.YEAR,
    unitMax: Unit.YEAR,
  })

  const genderToggle = useSwitch()
  const gender = useState<Gender>()

  return {
    cellLine: {
      data: cellLines,
      add: addCellLine,
      remove: removeCellLine,
    },
    age: {
      data: age,
      toggle: ageToggle,
    },
    gender: {
      toggle: genderToggle,
      data: gender,
    },
  }
}

export default useGeneralParam
