import React from 'react'

import { useSample } from '../../context/SampleContext'
import ActionButtons from './components/ActionButtons'
import Header from './components/Header'
import PaginationSection from './components/PaginationSection'
import Sample from './components/Sample'
import { Container, Line, TableContainer } from './styled'

const SampleSection = () => {
  const {
    column: { selected },
    sample: { data },
  } = useSample()
  return (
    <Container>
      <ActionButtons />
      <Line />
      <Header />
      <TableContainer style={{ gridTemplateColumns: `40px repeat(${selected.length}, 1fr)` }}>
        {data?.map((row, index) => <Sample key={index} item={row} />)}
      </TableContainer>
      <PaginationSection />
    </Container>
  )
}

export default SampleSection
