'use client'

import { useSearchParams } from 'next/navigation'
import React, { useEffect } from 'react'

import { useAppDispatch } from '@/store'
import columnActions from '@/store/column/actions'
import selectedColActions from '@/store/selectedColumn/actions'
import { tokenActions } from '@/store/token'

import ColumnSection from './components/ColumnSection'
import GroupBySection from './components/GroupBySection'
import SampleSection from './components/SampleSection'
import { SampleProvider } from './context/SampleContext'
import { Container } from './styled'

const SelectPage = () => {
  const token = useSearchParams().get('token') as string
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(tokenActions.setSampleToken(token))
    dispatch(columnActions.fetchColumns())

    return () => {
      dispatch(tokenActions.setSampleToken(''))
      dispatch(columnActions.reset())
      dispatch(selectedColActions.reset())
    }
  }, [dispatch, token])

  return (
    <SampleProvider>
      <Container>
        <ColumnSection />
        <SampleSection />
        <GroupBySection />
      </Container>
    </SampleProvider>
  )
}

export default SelectPage
