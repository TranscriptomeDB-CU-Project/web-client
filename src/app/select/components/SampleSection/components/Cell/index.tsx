import React from 'react'

import { BLACK, WHITE } from '@/theme'

import { TableCell, TextCell } from './styled'
import { CellProps } from './types'
import useContent from './useContent'

const Cell = ({ content }: CellProps) => {
  const { isExists, formattedContent } = useContent(content)

  return (
    <TableCell style={{ backgroundColor: !isExists ? BLACK[50] : WHITE }}>
      <TextCell>{formattedContent}</TextCell>
    </TableCell>
  )
}

export default Cell
