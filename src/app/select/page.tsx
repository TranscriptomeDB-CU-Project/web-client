'use client'

import { useSearchParams } from 'next/navigation'
import React, { useEffect } from 'react'

import WarningDialog from '@/components/WarningDialog'
import { useAppDispatch, useAppSelector } from '@/store'
import columnActions from '@/store/column/actions'
import { popupActions, popupSelectors } from '@/store/popup'
import selectedColActions from '@/store/selectedColumn/actions'
import { tokenActions } from '@/store/token'

import ColumnSection from './components/ColumnSection'
import GroupBySection from './components/GroupBySection'
import SampleSection from './components/SampleSection'
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

  const popupState = useAppSelector((state) => popupSelectors.current(state))

  return (
    <Container>
      <ColumnSection />
      <SampleSection />
      <GroupBySection />
      <WarningDialog
        handleSubmit={() => {
          dispatch(popupActions.close())
          popupState?.onAccept?.()
        }}
        isOpen={!!popupState}
        onClose={() => dispatch(popupActions.close())}
      />
    </Container>
  )
}

export default SelectPage
