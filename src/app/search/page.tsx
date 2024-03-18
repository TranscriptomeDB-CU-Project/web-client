'use client'

import React from 'react'

import Text from '@/components/Text'

import CellLine from './components/CellLine'
import ConditionSection from './components/ConditionSection'
import { SearchProvider } from './context/SearchContext'

const SearchPage = () => {
  return (
    <SearchProvider>
      <Text variant="h1">Search</Text>
      <div style={{ display: 'flex', gap: '24px' }}>
        <CellLine />
        <ConditionSection />
      </div>
    </SearchProvider>
  )
}

export default SearchPage
