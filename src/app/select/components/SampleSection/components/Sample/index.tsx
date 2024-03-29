import React from 'react'

import { useSample } from '@/app/select/context/SampleContext'
import Checkbox from '@/components/Checkbox'

import { Cell } from './styled'
import { SampleProps } from './types'

const Sample = ({ item }: SampleProps) => {
  const {
    column: { selected },
    select: { select, isSelected },
  } = useSample()

  return (
    <>
      <Cell>
        <Checkbox
          checked={isSelected(item.id)}
          handleChecked={() => {
            select(item.id, !isSelected(item.id))
          }}
        />
      </Cell>
      {selected.map(({ name }) => (
        <Cell key={name} bg={!item[name] ? 'black-25' : 'white'}>
          {item[name]}
        </Cell>
      ))}
    </>
  )
}

export default Sample
