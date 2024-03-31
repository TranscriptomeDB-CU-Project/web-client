import React, { useMemo } from 'react'

import Checkbox from '@/components/Checkbox'
import Select from '@/components/Select'
import TextField from '@/components/TextField'

import { UNIT_ITEMS } from '../../constants'
import { useSearch } from '../../context/SearchContext'
import { ChoiceContainer, ItemContainer, TextFlex } from '../GeneralParameter/styled'

const AgeSection = () => {
  const { value, setValue, enabled, toggle } = useSearch().age
  const { min, max, unitMin, unitMax } = value

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
            value={min}
            onChange={setValue('min')}
            inputProps={{ type: 'number', min: 0, style: { width: '60px' } }}
            disabled={!enabled}
          />
          <Select value={unitMin} onChange={setValue('unitMin')} items={UNIT_ITEMS} disabled={!enabled} />
          to
        </TextFlex>
        <TextFlex color={textColor}>
          <TextField
            value={max}
            onChange={setValue('max')}
            inputProps={{ type: 'number', min: 0, style: { width: '60px' } }}
            disabled={!enabled}
          />
          <Select value={unitMax} onChange={setValue('unitMax')} items={UNIT_ITEMS} disabled={!enabled} />
        </TextFlex>
      </ChoiceContainer>
    </ItemContainer>
  )
}

export default AgeSection
