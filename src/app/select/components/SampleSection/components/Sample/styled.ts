import styled from 'styled-components'

import Text from '@/components/Text'
import { PALETTE } from '@/theme'

export const Cell = styled(Text).attrs({ variant: 'body1' })`
  border: 1px solid ${PALETTE.BLACK[50]};
  display: flex;
  align-items: center;
  justify-content: center;
`
