import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { SampleStore } from './types'

const initialState: SampleStore = {
  value: [],
  page: 1,
  maxPage: 1,
  limit: 20,
  isFetching: false,
  maxReachedPage: 0,
}

const sampleSlice = createSlice({
  name: 'sample',
  initialState,
  reducers: {
    setSample: (state, action: PayloadAction<SampleStore['value']>) => {
      state.value = action.payload
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload
    },
    setMaxPage: (state, action: PayloadAction<number>) => {
      state.maxPage = action.payload
    },
    setFetching: (state, action: PayloadAction<boolean>) => {
      state.isFetching = action.payload
    },
    setLimit: (state, action: PayloadAction<number>) => {
      state.maxReachedPage = 1
      state.limit = action.payload
    },
    setMaxReachedPage: (state, action: PayloadAction<number>) => {
      state.maxReachedPage = Math.max(state.maxReachedPage, action.payload)
    },
    reset: () => initialState,
  },
})

export const { setSample, setPage, setMaxPage, setFetching, setLimit, reset, setMaxReachedPage } = sampleSlice.actions
export default sampleSlice.reducer
