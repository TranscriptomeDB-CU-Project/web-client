'use client'

import React from 'react'

import Text from '@/components/Text'

import ConditionSection from './components/ConditionSection'
import { SearchProvider } from './context/SearchContext'

const SearchPage = () => {
  return (
    <SearchProvider>
      <Text variant="h1">Search</Text>

      <ConditionSection />
    </SearchProvider>
  )
}

export default SearchPage
