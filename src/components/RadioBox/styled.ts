import styled from 'styled-components'

import { PALETTE } from '@/theme'

export const RadioBoxContainer = styled.input.attrs({ type: 'radio' })`
  margin: 0;
  cursor: pointer;
  &:checked {
    accent-color: ${PALETTE.PRIMARY[700]};
  }
`
