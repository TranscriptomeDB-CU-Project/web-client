import React from 'react'

import Checkbox from '@/components/Checkbox'
import { useAppDispatch, useAppSelector } from '@/store'
import selectedSampleActions from '@/store/selectedSample/actions'

import Cell from '../Cell'
import { CheckboxContainer, TableCellCheckbox } from './styled'
import { SampleProps } from './types'

const Sample = ({ item }: SampleProps) => {
  const isSelected = useAppSelector((state) => !!state.selectedSample.value[item.id])
  const dispatch = useAppDispatch()

  const column = useAppSelector((state) => state.selectedColumn.value)

  return (
    <>
      <TableCellCheckbox onClick={() => dispatch(selectedSampleActions.toggle(item.id))}>
        <CheckboxContainer>
          <Checkbox checked={isSelected} />
        </CheckboxContainer>
      </TableCellCheckbox>
      {column.map(({ column: { colname } }) => (
        <Cell content={item[colname]} key={colname} />
      ))}
    </>
  )
}

export default Sample
