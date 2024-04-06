import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { LoadingStore } from './types'

const initialState: LoadingStore = {
  value: false,
  loadingIds: [],
}

const loadingSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    addId: (state, action: PayloadAction<string>) => {
      state.loadingIds.push(action.payload)
      state.value = true
    },
    removeId: (state, action: PayloadAction<string>) => {
      state.loadingIds.splice(state.loadingIds.indexOf(action.payload), 1)
      state.value = state.loadingIds.length > 0
    },
  },
})

export const { addId, removeId } = loadingSlice.actions
export default loadingSlice.reducer
