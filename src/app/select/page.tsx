'use client'

import React from 'react'

import SampleSection from './components/SampleSection'
import { SampleProvider } from './context/SampleContext'

const SelectPage = () => {
  return (
    <SampleProvider>
      <SampleSection />
    </SampleProvider>
  )
}

export default SelectPage
