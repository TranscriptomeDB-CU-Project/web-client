import SampleApi from '@/api/SampleApi'

import { AppThunk } from '..'
import columnActions from '../column/actions'
import loadingActions from '../loading/actions'
import { reset, setColumn, setValue } from '.'

const sampleGroupActions = {
  fetch: (): AppThunk<void> => async (dispatch, getState) => {
    const token = getState().token.sampleToken
    const column = getState().sampleGroup.column

    if (!token || !column) return

    const onFinish = dispatch(loadingActions.onLoading())

    const res = await SampleApi.getGroup(token, column)
    dispatch(setValue(res.data))

    onFinish()
  },
  setColumn:
    (name: string): AppThunk<void> =>
    async (dispatch) => {
      const column = dispatch(columnActions.getColumn(name))
      dispatch(setColumn(column))
    },
  reset,
}

export default sampleGroupActions
