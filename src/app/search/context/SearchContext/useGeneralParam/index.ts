import { useCallback, useState } from 'react'

import { Gender } from '@/app/search/types'
import useSwitch from '@/hooks/useSwitch'

const useGeneralParam = () => {
  const [cellLines, setCellLines] = useState<string[]>([])

  const addCellLine = useCallback((cellLine: string) => {
    setCellLines((cellLines) => [...cellLines, cellLine])
  }, [])

  const removeCellLine = useCallback((cellLine: string) => {
    setCellLines((cellLines) => cellLines.filter((c) => c !== cellLine))
  }, [])

  const ageToggle = useSwitch()
  const ageMin = useState<string>('')
  const ageMax = useState<string>('')

  const genderToggle = useSwitch()
  const gender = useState<Gender>()

  return {
    cellLine: {
      data: cellLines,
      add: addCellLine,
      remove: removeCellLine,
    },
    age: {
      min: ageMin,
      max: ageMax,
      toggle: ageToggle,
    },
    gender: {
      toggle: genderToggle,
      data: gender,
    },
  }
}

export default useGeneralParam
