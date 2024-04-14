import styled from 'styled-components'

import Text from '@/components/Text'
import { PALETTE } from '@/theme'

export const TextCell = styled(Text).attrs({ variant: 'body1' })`
  display: flex;
  align-items: center;
  justify-content: flex-start;
`

export const TableCell = styled.td`
  padding: 2px;
  border: 1px solid ${PALETTE.BLACK[50]};
  padding: 0 12px;
`
