import React from 'react'

import { useSample } from '@/app/select/context/SampleContext'
import Checkbox from '@/components/Checkbox'
import { useAppSelector } from '@/store'
import { BLACK, WHITE } from '@/theme'

import { CheckboxContainer, TableCell, TableCellCheckbox, TextCell } from './styled'
import { SampleProps } from './types'

const Sample = ({ item }: SampleProps) => {
  const {
    select: { select, isSelected },
  } = useSample()

  const column = useAppSelector((state) => state.selectedColumn.value)

  return (
    <>
      <TableCellCheckbox>
        <CheckboxContainer>
          <Checkbox
            checked={isSelected(item.id)}
            handleChecked={() => {
              select(item.id, !isSelected(item.id))
            }}
          />
        </CheckboxContainer>
      </TableCellCheckbox>
      {column.map(({ column: { colname } }) => (
        <TableCell style={{ backgroundColor: !item[colname] ? BLACK[50] : WHITE }} key={colname}>
          <TextCell>{item[colname]}</TextCell>
        </TableCell>
      ))}
    </>
  )
}

export default Sample
