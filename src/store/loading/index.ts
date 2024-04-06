import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { LoadingStore } from './types'

const initialState: LoadingStore = {
  value: false,
  loadingIds: new Set<string>(),
}

const loadingSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    addId: (state, action: PayloadAction<string>) => {
      state.loadingIds.add(action.payload)
      state.value = true
    },
    removeId: (state, action: PayloadAction<string>) => {
      state.loadingIds.delete(action.payload)
      state.value = state.loadingIds.size > 0
    },
  },
})

export const { addId, removeId } = loadingSlice.actions
export default loadingSlice.reducer
