import styled from 'styled-components'

import { PALETTE, TYPOGRAPHY } from '@/theme'

export const InputContainer = styled.div`
  border: 1px solid ${PALETTE.PRIMARY[900]};
  border-radius: 5px;
  display: flex;
  background-color: ${PALETTE.WHITE};
  padding: 2px 5px;
  align-items: center;
  gap: 5px;
`

export const StyledInput = styled.input`
  ${TYPOGRAPHY.body1}
  border: none;
  background-color: transparent;
  flex-grow: 1;
  &:focus {
    outline: none;
  }
`
