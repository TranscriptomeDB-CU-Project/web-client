import { Icon } from '@iconify/react'
import styled from 'styled-components'

import { PALETTE, TYPOGRAPHY } from '@/theme'

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
`

export const ItemContainer = styled.div<{ $selected?: boolean; $disabled?: boolean }>`
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  background-color: ${({ $selected }) => ($selected ? PALETTE.PRIMARY[100] : PALETTE.WHITE)};
  color: ${({ $selected }) => ($selected ? PALETTE.PRIMARY[700] : PALETTE.PRIMARY[950])};
  ${TYPOGRAPHY.body1}
  user-select: none;
  cursor: ${({ $disabled }) => ($disabled ? 'cursor' : 'pointer')};
  pointer-events: ${({ $disabled }) => ($disabled ? 'none' : 'auto')};
`

export const StyledIcon = styled(Icon).attrs({
  fontSize: 30,
  color: PALETTE.PRIMARY[700],
})`
  cursor: pointer;
`
