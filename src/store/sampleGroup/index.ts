import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { Column } from '@/dto/types'

import { SampleGroupStore } from './types'

const initialState: SampleGroupStore = {}

const sampleGroupSlice = createSlice({
  name: 'sampleGroup',
  initialState,
  reducers: {
    setColumn: (state, action: PayloadAction<Column | undefined>) => {
      state.column = action.payload
    },
    setValue: (state, action: PayloadAction<{ value: string; count: number }[]>) => {
      state.value = action.payload
    },
    reset: () => initialState,
  },
})

export const { setColumn, setValue, reset } = sampleGroupSlice.actions
export default sampleGroupSlice.reducer
