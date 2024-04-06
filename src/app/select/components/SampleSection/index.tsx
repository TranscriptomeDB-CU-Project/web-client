import React from 'react'

import { useSample } from '../../context/SampleContext'
import ActionButtons from './components/ActionButtons'
import Header from './components/Header'
import PaginationSection from './components/PaginationSection'
import Sample from './components/Sample'
import { Container, Line, OuterTableContainer, TableContainer } from './styled'

const SampleSection = () => {
  const {
    sample: { data },
  } = useSample()

  return (
    <Container>
      <ActionButtons />
      <Line />
      <OuterTableContainer>
        <table cellSpacing={0} cellPadding={0} style={{ width: '100%' }}>
          <thead>
            <Header />
          </thead>
          <tbody>
            {data &&
              data.map((row, index) => (
                <TableContainer key={index}>
                  <Sample item={row} />
                </TableContainer>
              ))}
          </tbody>
        </table>
      </OuterTableContainer>
      <PaginationSection />
    </Container>
  )
}

export default SampleSection
