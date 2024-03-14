import { Icon } from '@iconify/react'
import styled from 'styled-components'

import { PALETTE } from '@/theme'

import Text from '../Text'

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
`

export const ItemContainer = styled(Text).attrs<{ $selected?: boolean; $disabled?: boolean }>(({ $selected }) => ({
  variant: 'body1',
  color: $selected ? 'primary-700' : 'primary-950',
  bg: $selected ? 'primary-100' : 'white',
}))`
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
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
