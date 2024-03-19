'use client'

import React from 'react'

import Text from '@/components/Text'

import CellLine from './components/CellLine'
import ConditionSection from './components/ConditionSection'
import GeneralParameter from './components/GeneralParameter'
import { SearchProvider } from './context/SearchContext'

const SearchPage = () => {
  return (
    <SearchProvider>
      <Text variant="h1">Search</Text>
      <div style={{ display: 'flex', gap: '24px' }}>
        <div style={{ display: 'flex', gap: '24px', flexDirection: 'column' }}>
          <CellLine />
          <GeneralParameter />
        </div>
        <ConditionSection />
      </div>
    </SearchProvider>
  )
}

export default SearchPage
