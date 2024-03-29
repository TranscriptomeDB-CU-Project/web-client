'use client'

import React from 'react'

import GroupBySection from './components/GroupBySection'
import SampleSection from './components/SampleSection'
import { SampleProvider } from './context/SampleContext'
import { Container } from './styled'

const SelectPage = () => {
  return (
    <SampleProvider>
      <Container>
        <SampleSection />
        <GroupBySection />
      </Container>
    </SampleProvider>
  )
}

export default SelectPage
