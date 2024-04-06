import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { SelectedSampleStore } from './types'

const initialState: SelectedSampleStore = {
  value: {},
  count: 0,
}

const selectedSlice = createSlice({
  name: 'selectedSample',
  initialState,
  reducers: {
    processIds: (state, action: PayloadAction<{ ids: string[]; select: boolean }>) => {
      const { ids, select } = action.payload
      if (select) {
        ids.forEach((id) => (state.value[id] = select))
        state.count += ids.length
      } else {
        ids.forEach((id) => delete state.value[id])
        state.count -= ids.length
      }
    },
    reset: () => initialState,
  },
})

export const { processIds, reset } = selectedSlice.actions
export default selectedSlice.reducer
