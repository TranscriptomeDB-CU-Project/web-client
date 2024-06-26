import ColumnApi from '@/api/ColumnApi'
import { Column } from '@/dto/types'

import { AppThunk } from '..'
import loadingActions from '../loading/actions'
import selectedColActions from '../selectedColumn/actions'
import { addColumn, reset, setFetching, setMainColFetching } from '.'

const columnActions = {
  fetchColumns: (): AppThunk<void> => async (dispatch, getState) => {
    const token = getState().token.sampleToken
    if (!token) return

    // set loading
    const onFinishBlockingFetch = dispatch(loadingActions.onLoading())
    dispatch(setFetching(true))
    dispatch(setMainColFetching(true))

    // main columns
    const main = await ColumnApi.getByToken(token)
    dispatch(addColumn(main))

    // selected columns
    const selectedCol = await ColumnApi.getInitialColumn(token)
    selectedCol.forEach((colname) => {
      dispatch(selectedColActions.add(colname))
    })

    dispatch(setMainColFetching(false))
    onFinishBlockingFetch()

    // secondary columns
    const secondary = await ColumnApi.getSecondaryByToken(token)
    dispatch(addColumn(secondary))
    dispatch(setFetching(false))
  },
  getSuggestion:
    (keyword: string, limit = 5): AppThunk<string[]> =>
    (dispatch, getState) => {
      if (keyword.length === 0) return []

      const columns = getState().column.value
      const selectedColumns = getState().selectedColumn.value

      return Object.keys(columns).reduce((suggestions, colname) => {
        if (suggestions.length >= limit) return suggestions
        if (colname.includes(keyword) && !selectedColumns.some((col) => col.column.colname === colname)) {
          suggestions.push(colname)
        }
        return suggestions
      }, [] as string[])
    },
  getColumn:
    (name: string): AppThunk<Column | undefined> =>
    (_, getState) => {
      return getState().column.value[name]
    },

  reset: reset,
}

export default columnActions
