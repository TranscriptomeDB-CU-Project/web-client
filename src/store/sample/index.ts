import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { SampleStore } from './types'

const initialState: SampleStore = {
  value: [],
  page: 1,
  maxPage: 1,
  limit: 20,
  isFetching: false,
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
      state.limit = action.payload
    },
    reset: () => initialState,
  },
})

export const { setSample, setPage, setMaxPage, setFetching, setLimit, reset } = sampleSlice.actions
export default sampleSlice.reducer
