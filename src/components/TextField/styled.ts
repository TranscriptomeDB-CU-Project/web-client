import styled from 'styled-components'

import { PALETTE, TYPOGRAPHY } from '@/theme'

export const InputContainer = styled.div<{ disabled?: boolean }>`
  border: 1px solid ${({ disabled }) => (disabled ? PALETTE.BLACK[200] : PALETTE.PRIMARY[900])};
  border-radius: 5px;
  display: flex;
  background-color: ${({ disabled }) => (disabled ? PALETTE.BLACK[25] : PALETTE.WHITE)};
  padding: 2px 5px;
  align-items: center;
  gap: 5px;
  position: relative;
`

export const StyledInput = styled.input`
  ${TYPOGRAPHY.body1}
  border: none;
  background-color: transparent;
  flex-grow: 1;
  &:focus {
    outline: none;
  }

  &:disabled {
    color: ${PALETTE.BLACK[200]};
  }
`
