import styled from 'styled-components'

import { WHITE } from '@/theme'

import { TableCell } from '../Cell/styled'

export const TableCellCheckbox = styled(TableCell)`
  position: sticky;
  left: 0;
  padding-left: 8px;
  padding-right: 8px;
  cursor: pointer;
  background-color: ${WHITE};
`

export const CheckboxContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`
