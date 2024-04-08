import React from 'react'

import { useAppSelector } from '@/store'

import Text from '../Text'
import { LoadingContainer } from './styled'

const Loading = () => {
  const isLoading = useAppSelector((state) => state.loading.value)

  if (isLoading) {
    return (
      <LoadingContainer>
        <Text color="white"> Loading... </Text>
      </LoadingContainer>
    )
  }
  return null
}

export default Loading
