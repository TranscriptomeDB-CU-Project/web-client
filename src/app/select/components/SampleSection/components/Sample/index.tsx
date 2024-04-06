import React from 'react'

import { useSample } from '@/app/select/context/SampleContext'
import Checkbox from '@/components/Checkbox'
import { BLACK, WHITE } from '@/theme'

import { CheckboxContainer, TableCell, TableCellCheckbox, TextCell } from './styled'
import { SampleProps } from './types'

const Sample = ({ item }: SampleProps) => {
  const {
    column: { selected },
    select: { select, isSelected },
  } = useSample()

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
      {selected.map(({ name }) => (
        <TableCell style={{ backgroundColor: !item[name] ? BLACK[50] : WHITE }} key={name}>
          <TextCell>{item[name]}</TextCell>
        </TableCell>
      ))}
    </>
  )
}

export default Sample
