import React from 'react'
import { ToggleProps } from './types'
import { ToggleContainer } from './styled'

const Toggle = ({ onToggle, value, color }: ToggleProps) => {
  return (
    <ToggleContainer $color={color} onClick={onToggle}>
      {value}
    </ToggleContainer>
  )
}

export default Toggle
