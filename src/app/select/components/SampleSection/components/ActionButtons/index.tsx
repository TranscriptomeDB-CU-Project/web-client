import React, { useMemo } from 'react'

import Button from '@/components/Button'
import { useAppDispatch, useAppSelector } from '@/store'
import { selectedColSelectors } from '@/store/selectedColumn'
import selectedSampleActions from '@/store/selectedSample/actions'

const ActionButtons = () => {
  const dispatch = useAppDispatch()

  const isFiltered = useAppSelector(selectedColSelectors.getIsFiltered)
  const filterText = useMemo(() => (isFiltered ? 'Filtered' : 'All'), [isFiltered])
  const handleSelect = (include: boolean) => {
    if (isFiltered) dispatch(selectedSampleActions.byQuery(include))
    else dispatch(selectedSampleActions.all(include))
  }

  return (
    <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
      <Button onClick={() => handleSelect(true)}>Select {filterText}</Button>
      <Button color="red" onClick={() => handleSelect(false)}>
        Remove {filterText}
      </Button>
      <Button color="blue" onClick={() => dispatch(selectedSampleActions.download())}>
        Download Selected
      </Button>
    </div>
  )
}

export default ActionButtons
