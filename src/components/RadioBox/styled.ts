import styled from 'styled-components'

import { PALETTE } from '@/theme'

export const RadioBoxContainer = styled.input.attrs({ type: 'radio' })`
  &:checked {
    accent-color: ${PALETTE.PRIMARY[700]};
  }
`
