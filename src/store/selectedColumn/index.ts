import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { Column, OrderDirection } from '@/dto/types'

import { SelectedColumnStore } from './types'

const initialState: SelectedColumnStore = {
  value: [],
}

const selectedColumnSlice = createSlice({
  name: 'selectedColumn',
  initialState,
  reducers: {
    add: (state, action: PayloadAction<Column>) => {
      state.value.push({ column: action.payload, query: '' })
    },
    remove: (state, action: PayloadAction<string>) => {
      state.value = state.value.filter(({ column }) => column.colname !== action.payload)
    },
    rearrange: (state, action: PayloadAction<{ from: number; to: number }>) => {
      const [removed] = state.value.splice(action.payload.from, 1)
      state.value.splice(action.payload.to, 0, removed)
    },
    setQuery: (state, action: PayloadAction<{ colname: string; query: string }>) => {
      const index = state.value.findIndex(({ column }) => column.colname === action.payload.colname)
      state.value[index].query = action.payload.query
    },
    setSort: (state, action: PayloadAction<Column>) => {
      const name = action.payload.colname
      if (state.sortBy?.column.colname === name) {
        if (state.sortBy.direction === OrderDirection.ASC) {
          state.sortBy.direction = OrderDirection.DESC
        } else {
          state.sortBy = undefined
        }
      } else {
        state.sortBy = {
          column: action.payload,
          direction: OrderDirection.ASC,
        }
      }
    },
    reset: () => initialState,
  },
  selectors: {
    getQuery: (state) => {
      return state.value.map(({ column, query }) => ({
        colname: column.colname,
        keyword: query,
        coltype: column.coltype,
      }))
    },
    getSortQuery: (state) => {
      const sortBy = state.sortBy
      if (!sortBy) return undefined
      return [
        {
          key: sortBy.column.colname,
          order: sortBy.direction,
          coltype: sortBy.column.coltype,
        },
      ]
    },
    getIsFiltered: (state) => {
      return state.value.some(({ query }) => query !== '')
    },
    getSelectable: (state) => {
      return state.value.map(({ column }) => ({
        label: column.colname,
        value: column.colname,
      }))
    },
  },
})

export const { add, remove, rearrange, setQuery, setSort } = selectedColumnSlice.actions
export const selectedColSelectors = selectedColumnSlice.selectors

export default selectedColumnSlice.reducer
