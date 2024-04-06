import React from 'react'

import { useAppSelector } from '@/store'

const Loading = () => {
  const isLoading = useAppSelector((state) => state.loading.value)

  if (isLoading) {
    return <div>Loading...</div>
  }
  return null
}

export default Loading
