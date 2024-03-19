import React from 'react'

import Checkbox from '@/components/Checkbox'
import RadioBox from '@/components/RadioBox'
import Text from '@/components/Text'

import { useSearch } from '../../context/SearchContext'
import { Gender } from '../../types'
import GenderSection from '../GenderSection'
import { ChoiceContainer, Container, ItemContainer } from './styled'

const GeneralParameter = () => {
  const {
    age,
    gender: {
      toggle: genderToggle,
      data: [gender, setGender],
    },
  } = useSearch()

  return (
    <Container>
      <Text variant="h2">General Parameter</Text>
      <ItemContainer>
        <Checkbox checked={age.toggle.state} handleChecked={age.toggle.toggle} />
        <Text variant="h3">Age</Text>
      </ItemContainer>
      <GenderSection />
    </Container>
  )
}

export default GeneralParameter
