import { Icon } from '@iconify/react'
import React, { useMemo } from 'react'
import OutsideClickHandler from 'react-outside-click-handler'

import useSwitch from '@/hooks/useSwitch'
import { PALETTE } from '@/theme'

import Suggestion from '../Suggestion'
import { SelectContainer } from './styled'
import { SelectProps } from './types'

const Select = ({ value, items, onChange }: SelectProps) => {
  const label = useMemo(() => {
    const item = items.find((item) => item.value === value)
    return item?.label
  }, [items, value])
  const suggestionState = useSwitch()

  const handleSelect = (_: string, idx: number) => {
    onChange(items[idx].value)
    suggestionState.setOff()
  }

  return (
    <OutsideClickHandler onOutsideClick={suggestionState.setOff}>
      <SelectContainer onClick={suggestionState.setOn}>
        <div style={{ flexGrow: 1, textAlign: 'center' }}>{label}</div>
        <Icon icon="mdi:expand-more" fontSize={24} color={PALETTE.PRIMARY[700]} />
        {suggestionState.state && <Suggestion suggestions={items.map((item) => item.label)} onSelect={handleSelect} />}
      </SelectContainer>
    </OutsideClickHandler>
  )
}

export default Select
