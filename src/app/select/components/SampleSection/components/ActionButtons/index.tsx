import React, { useMemo } from 'react'

import { useSample } from '@/app/select/context/SampleContext'
import Button from '@/components/Button'
import { useAppSelector } from '@/store'
import { selectedColSelectors } from '@/store/selectedColumn'

const ActionButtons = () => {
  const {
    select: { selectAll, selectFiltered, download },
  } = useSample()

  const isFiltered = useAppSelector(selectedColSelectors.getIsFiltered)
  const filterText = useMemo(() => (isFiltered ? 'Filtered' : 'All'), [isFiltered])
  const handleSelect = (include: boolean) => {
    if (isFiltered) selectFiltered(include)
    else selectAll(include)
  }

  return (
    <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
      <Button onClick={() => handleSelect(true)}>Select {filterText}</Button>
      <Button color="red" onClick={() => handleSelect(false)}>
        Remove {filterText}
      </Button>
      <Button color="blue" onClick={download}>
        Download Selected
      </Button>
    </div>
  )
}

export default ActionButtons
