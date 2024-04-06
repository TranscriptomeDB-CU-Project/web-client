import { AppThunk } from '..'
import columnActions from '../column/actions'
import { add, rearrange, remove, setQuery, setSort } from '.'

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
  remove,
}

export default selectedColActions
