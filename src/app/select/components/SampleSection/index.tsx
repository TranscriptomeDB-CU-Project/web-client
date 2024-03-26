import React from 'react'

import ActionButtons from './components/ActionButtons'
import PaginationSection from './components/PaginationSection'
import { Container, Line } from './styled'

const SampleSection = () => {
  return (
    <Container>
      <ActionButtons />
      <Line />
      <PaginationSection />
    </Container>
  )
}

export default SampleSection
