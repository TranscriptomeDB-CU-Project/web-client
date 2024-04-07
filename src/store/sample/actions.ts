import SampleApi from '@/api/SampleApi'

import { AppThunk } from '..'
import loadingActions from '../loading/actions'
import { selectedColSelectors } from '../selectedColumn'
import { reset, setFetching, setLimit, setMaxPage, setPage, setSample } from '.'

const sampleActions = {
  fetch: (): AppThunk<void> => async (dispatch, getState) => {
    const token = getState().token.sampleToken
    const { page, limit } = getState().sample

    if (!token) return

    dispatch(setFetching(true))
    const onFinish = dispatch(loadingActions.onLoading())

    const res = await SampleApi.getSamples({
      token,
      page,
      select: selectedColSelectors.getQuery(getState()),
      sort: selectedColSelectors.getSortQuery(getState()),
      limit,
    })

    if (page > res.maxpage) {
      dispatch(setPage(res.maxpage))
    }
    dispatch(setMaxPage(res.maxpage))
    dispatch(setSample(res.data))
    dispatch(setFetching(false))
    onFinish()
  },
  setPage,
  setLimit,
  reset,
}

export default sampleActions
