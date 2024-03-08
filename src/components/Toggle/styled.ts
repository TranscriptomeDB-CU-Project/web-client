import { PALETTE, TYPOGRAPHY } from '@/theme'
import styled from 'styled-components'
import { ToggleVariants } from './types'
import { get } from 'http'

const getColor = ({ $color }: ToggleVariants) => {
  if ($color === undefined) return PALETTE.PRIMARY[950]
  return $color ? PALETTE.PRIMARY[800] : PALETTE.RED[500]
}

const getBackgroundColor = ({ $color }: ToggleVariants) => {
  if ($color === undefined) return PALETTE.PRIMARY[50]
  return $color ? PALETTE.PRIMARY[100] : PALETTE.RED[100]
}

export const ToggleContainer = styled.button<ToggleVariants>`
  border: none;
  border-radius: 5px;
  padding: 3px 10px;
  cursor: pointer;
  background-color: ${getBackgroundColor};
  color: ${getColor};
  ${TYPOGRAPHY.body1}
`
