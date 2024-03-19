import React, { useMemo } from 'react'

import Checkbox from '@/components/Checkbox'
import Select from '@/components/Select'
import TextField from '@/components/TextField'

import { UNIT_ITEMS } from '../../constants'
import { useSearch } from '../../context/SearchContext'
import { AgeData, Unit } from '../../context/SearchContext/types'
import { ChoiceContainer, ItemContainer, TextFlex } from '../GeneralParameter/styled'

const AgeSection = () => {
  const {
    age: {
      toggle: { toggle, state: enabled },
      data: [age, setAge],
    },
  } = useSearch()

  const setAgeData = (field: keyof AgeData) => (data: string | Unit) => {
    setAge((age) => ({ ...age, [field]: data }) as AgeData)
  }

  const textColor = useMemo(() => (enabled ? 'primary-950' : 'black-200'), [enabled])

  return (
    <ItemContainer>
      <TextFlex variant="h3">
        <Checkbox checked={enabled} handleChecked={toggle} />
        Age
      </TextFlex>
      <ChoiceContainer>
        <TextFlex color={textColor}>
          <TextField
            value={age.min}
            onChange={setAgeData('min')}
            inputProps={{ type: 'number', min: 0, style: { width: '60px' } }}
            disabled={!enabled}
          />
          <Select value={age.unitMin} onChange={setAgeData('unitMin')} items={UNIT_ITEMS} disabled={!enabled} />
          to
        </TextFlex>
        <TextFlex color={textColor}>
          <TextField
            value={age.max}
            onChange={setAgeData('max')}
            inputProps={{ type: 'number', min: 0, style: { width: '60px' } }}
            disabled={!enabled}
          />
          <Select value={age.unitMax} onChange={setAgeData('unitMax')} items={UNIT_ITEMS} disabled={!enabled} />
        </TextFlex>
      </ChoiceContainer>
    </ItemContainer>
  )
}

export default AgeSection
