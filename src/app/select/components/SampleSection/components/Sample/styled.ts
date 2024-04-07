import styled from 'styled-components'

import Text from '@/components/Text'
import { PALETTE, WHITE } from '@/theme'

export const TextCell = styled(Text).attrs({ variant: 'body1' })`
  display: flex;
  align-items: center;
  justify-content: center;
`

export const TableCell = styled.td`
  padding: 2px;
  border: 1px solid ${PALETTE.BLACK[50]};
`

export const TableCellCheckbox = styled(TableCell)`
  position: sticky;
  left: 0;
  padding-left: 8px;
  padding-right: 8px;
  background-color: ${WHITE};
`

export const CheckboxContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`
