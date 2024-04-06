import SampleApi from '@/api/SampleApi'
import { Column, GetGroupSampleIdRequestDTO } from '@/dto/types'

import { AppThunk } from '..'
import loadingActions from '../loading/actions'
import { selectedColSelectors } from '../selectedColumn'
import { processIds, reset } from '.'

const baseSelect =
  (select: boolean, query: GetGroupSampleIdRequestDTO['select']): AppThunk<void> =>
  async (dispatch, getState) => {
    const token = getState().token.sampleToken

    if (!token) return

    const onFinish = dispatch(loadingActions.onLoading())

    const ids = await SampleApi.getIds(token, query)
    dispatch(processIds({ ids, select }))

    onFinish()
  }

const selectedSampleActions = {
  byQuery:
    (select: boolean): AppThunk<void> =>
    async (dispatch, getState) => {
      const query = selectedColSelectors.getQuery(getState())
      dispatch(baseSelect(select, query))
    },
  byGroupVal:
    (column: Column, value: string, select: boolean): AppThunk<void> =>
    async (dispatch) => {
      const query = [
        {
          colname: column.colname,
          keyword: value,
          coltype: column.coltype,
        },
      ]
      dispatch(baseSelect(select, query))
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
