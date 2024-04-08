import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { Column } from '@/dto/types'

import { ColumnStore } from './types'

const initialState: ColumnStore = {
  value: {},
  isFetching: false,
}

const columnSlice = createSlice({
  name: 'column',
  initialState,
  reducers: {
    addColumn: (state, action: PayloadAction<Column[]>) => {
      action.payload.forEach((column) => {
        state.value[column.colname] = column
      })
    },
    setFetching: (state, action: PayloadAction<boolean>) => {
      state.isFetching = action.payload
    },
    reset: () => initialState,
  },
  selectors: {
    isEmpty: (state) => Object.keys(state.value).length === 0,
  },
})

export const { addColumn, setFetching, reset } = columnSlice.actions
export const columnSelectors = columnSlice.selectors

export default columnSlice.reducer
