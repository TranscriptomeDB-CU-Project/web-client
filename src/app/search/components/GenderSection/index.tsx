import React, { useMemo } from 'react'

import Checkbox from '@/components/Checkbox'
import RadioBox from '@/components/RadioBox'

import { useSearch } from '../../context/SearchContext'
import { Gender } from '../../types'
import { ChoiceContainer, ItemContainer, TextFlex } from '../GeneralParameter/styled'

const GenderSection = () => {
  const {
    gender: {
      toggle: { toggle, state: enabled },
      data: [gender, setGender],
    },
  } = useSearch()

  const textColor = useMemo(() => (enabled ? 'primary-950' : 'black-200'), [enabled])

  return (
    <ItemContainer>
      <TextFlex variant="h3">
        <Checkbox checked={enabled} handleChecked={toggle} />
        Gender
      </TextFlex>
      <ChoiceContainer>
        <TextFlex color={textColor}>
          <RadioBox checked={gender === Gender.MALE} handleChecked={() => setGender(Gender.MALE)} disabled={!enabled} />
          Male
        </TextFlex>
        <TextFlex color={textColor}>
          <RadioBox
            checked={gender === Gender.FEMALE}
            handleChecked={() => setGender(Gender.FEMALE)}
            disabled={!enabled}
          />
          Female
        </TextFlex>
      </ChoiceContainer>
    </ItemContainer>
  )
}

export default GenderSection
