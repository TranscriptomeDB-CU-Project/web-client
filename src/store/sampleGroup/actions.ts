import SampleApi from '@/api/SampleApi'

import { AppThunk } from '..'
import columnActions from '../column/actions'
import loadingActions from '../loading/actions'
import { selectedColSelectors } from '../selectedColumn'
import { reset, setColumn, setValue } from '.'

const sampleGroupActions = {
  fetch: (): AppThunk<void> => async (dispatch, getState) => {
    const token = getState().token.sampleToken
    const column = getState().sampleGroup.column
    const select = selectedColSelectors.getQuery(getState())

    if (!token || !column) return

    const onFinish = dispatch(loadingActions.onLoading())

    const res = await SampleApi.getGroup(token, column, select)
    dispatch(setValue(res.data.filter((item) => item.value.trim() !== '')))

    onFinish()
  },
  setColumn:
    (name: string): AppThunk<void> =>
    async (dispatch) => {
      if (name === '') dispatch(setValue([]))
      const column = dispatch(columnActions.getColumn(name))
      dispatch(setColumn(column))
    },
  reset,
}

export default sampleGroupActions
