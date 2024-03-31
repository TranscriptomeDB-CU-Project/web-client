import React from 'react'

import Text from '@/components/Text'

import AgeSection from '../AgeSection'
import GenderSection from '../GenderSection'
import { Container } from './styled'

const GeneralParameter = () => {
  return (
    <Container>
      <Text variant="h2">General Parameter</Text>
      <AgeSection />
      <GenderSection />
    </Container>
  )
}

export default GeneralParameter
