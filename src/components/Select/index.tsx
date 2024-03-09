import { Icon } from '@iconify/react'
import React from 'react'

import { PALETTE } from '@/theme'

import { SelectContainer } from './styled'
import { SelectProps } from './types'

const Select = ({ value }: SelectProps) => {
  return (
    <SelectContainer>
      <div style={{ flexGrow: 1, textAlign: 'center' }}>{value}</div>

      <Icon icon="mdi:expand-more" fontSize={24} color={PALETTE.PRIMARY[700]} />
    </SelectContainer>
  )
}

export default Select
