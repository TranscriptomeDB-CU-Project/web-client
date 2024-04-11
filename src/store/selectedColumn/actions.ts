import { GetTokenRequestDTO, ParameterCondition, ParamsWithOps } from '@/dto/types'

import { AppThunk } from '..'
import columnActions from '../column/actions'
import { add, addToSelect, rearrange, remove, reset, resetToSelect, setQuery, setSort } from '.'

const baseAddInitialColumns =
  (query: ParamsWithOps | ParameterCondition): AppThunk<void> =>
  (dispatch) => {
    if ((query as ParamsWithOps).params) {
      const params = (query as ParamsWithOps).params
      params.forEach((param) => {
        dispatch(baseAddInitialColumns(param))
      })
    } else {
      const key = (query as ParameterCondition).key
      console.log('key', key)
      dispatch(addToSelect(key))
    }
  }
const selectedColActions = {
  add:
    (name: string): AppThunk<void> =>
    (dispatch) => {
      const column = dispatch(columnActions.getColumn(name))
      if (!column) return

      dispatch(add(column))
    },
  setSort:
    (name: string): AppThunk<void> =>
    (dispatch) => {
      const column = dispatch(columnActions.getColumn(name))
      if (!column) return

      dispatch(setSort(column))
    },
  rearrange:
    (from: number, to: number): AppThunk<void> =>
    (dispatch) => {
      dispatch(rearrange({ from, to }))
    },
  setQuery:
    (colname: string): AppThunk<(query: string) => void> =>
    (dispatch) => {
      return (query: string) => {
        dispatch(setQuery({ colname, query }))
      }
    },
  addInitialColumns:
    (query: GetTokenRequestDTO): AppThunk<void> =>
    async (dispatch) => {
      dispatch(baseAddInitialColumns(query.query))
    },
  remove,
  reset,
  resetToSelect,
}

export default selectedColActions
