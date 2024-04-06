import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { LoadingStore } from './types'

const initialState: LoadingStore = {}

const tokenSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    setSampleToken: (state, action: PayloadAction<string>) => {
      state.sampleToken = action.payload
    },
  },
})

export const tokenActions = tokenSlice.actions
export default tokenSlice.reducer
