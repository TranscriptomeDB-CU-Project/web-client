import React from 'react'

import { useSample } from '../../context/SampleContext'
import ActionButtons from './components/ActionButtons'
import Header from './components/Header'
import PaginationSection from './components/PaginationSection'
import { Container, Line } from './styled'

const SampleSection = () => {
  const {
    column: { selected },
  } = useSample()
  return (
    <Container>
      <ActionButtons />
      <Line />
      <div style={{ display: 'grid', gridTemplateColumns: `60px repeat(${selected.length}, 1fr)` }}>
        <Header />
      </div>
      <PaginationSection />
    </Container>
  )
}

export default SampleSection
