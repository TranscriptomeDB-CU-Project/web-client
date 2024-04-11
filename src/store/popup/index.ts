import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { LoadingStore, Popup } from './types'

const initialState: LoadingStore = {
  queue: [],
}

const popupSlice = createSlice({
  name: 'popup',
  initialState,
  reducers: {
    show: (state, action: PayloadAction<Popup>) => {
      state.queue.push(action.payload)
    },
    close: (state) => {
      state.queue.shift()
    },
  },
  selectors: {
    current: (state) => (state.queue.length > 0 ? state.queue[0] : undefined),
  },
})

export const popupActions = popupSlice.actions
export const popupSelectors = popupSlice.selectors

export default popupSlice.reducer
