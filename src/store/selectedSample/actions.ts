import SampleApi from '@/api/SampleApi'
import { Column, ColumnQuery } from '@/dto/types'

import { AppThunk } from '..'
import loadingActions from '../loading/actions'
import { popupActions } from '../popup'
import { selectedColSelectors } from '../selectedColumn'
import { processIds, reset } from '.'

const baseSelect =
  (select: boolean, query: ColumnQuery[], exact?: ColumnQuery): AppThunk<void> =>
  async (dispatch, getState) => {
    dispatch(
      popupActions.show({
        onAccept: async () => {
          const token = getState().token.sampleToken

          if (!token) return

          const onFinish = dispatch(loadingActions.onLoading())

          const ids = await SampleApi.getIds(token, query, exact)
          dispatch(processIds({ ids, select }))

          onFinish()
        },
      }),
    )
  }

const selectedSampleActions = {
  byQuery:
    (select: boolean): AppThunk<void> =>
    async (dispatch, getState) => {
      const query = selectedColSelectors.getQuery(getState())
      dispatch(baseSelect(select, query))
    },
  byGroupVal:
    (column: Column | undefined, value: string, select: boolean): AppThunk<void> =>
    async (dispatch, getState) => {
      if (!column) return

      const exact = {
        colname: column.colname,
        keyword: value,
        coltype: column.coltype,
      }
      const query = selectedColSelectors.getQuery(getState())

      dispatch(baseSelect(select, query, exact))
    },
  all:
    (select: boolean): AppThunk<void> =>
    async (dispatch) => {
      if (!select) {
        dispatch(reset())
      } else {
        dispatch(baseSelect(select, []))
      }
    },
  toggle:
    (id: string): AppThunk<void> =>
    async (dispatch, getState) => {
      const selected = getState().selectedSample.value
      const select = !selected[id]

      dispatch(processIds({ ids: [id], select }))
    },
  download: (): AppThunk<void> => async (dispatch, getState) => {
    const ids = Object.keys(getState().selectedSample.value)
    await SampleApi.download(ids)
  },

  reset,
}

export default selectedSampleActions
