'use client'

import React from 'react'

import Button from '@/components/Button'
import Text from '@/components/Text'

import CellLine from './components/CellLine'
import ConditionSection from './components/ConditionSection'
import GeneralParameter from './components/GeneralParameter'
import { SearchProvider, useSearch } from './context/SearchContext'
import { SectionContainer } from './styled'

const SearchPage = () => {
  const { getToken } = useSearch()
  return (
    <>
      <Text variant="h1">Search</Text>
      <div style={{ display: 'flex', gap: '24px' }}>
        <SectionContainer>
          <CellLine />
          <GeneralParameter />
        </SectionContainer>
        <SectionContainer style={{ flexGrow: 1 }}>
          <ConditionSection />
          <Button size="large" onClick={getToken} filled style={{ alignSelf: 'flex-end' }}>
            Next
          </Button>
        </SectionContainer>
      </div>
    </>
  )
}

const SearchPageWithProvider = () => {
  return (
    <SearchProvider>
      <SearchPage />
    </SearchProvider>
  )
}

export default SearchPageWithProvider
