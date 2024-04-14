import SampleApi from '@/api/SampleApi'

import { AppThunk } from '..'
import loadingActions from '../loading/actions'
import { popupActions } from '../popup'
import { selectedColSelectors } from '../selectedColumn'
import { reset, setFetching, setLimit, setMaxPage, setMaxReachedPage, setPage, setSample } from '.'

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

    if (page > res.maxpage && res.maxpage > 0) {
      dispatch(setPage(res.maxpage))
    }
    dispatch(setMaxReachedPage(res.page))
    dispatch(setMaxPage(res.maxpage))
    dispatch(setSample(res.data))
    dispatch(setFetching(false))
    onFinish()
  },
  setPage:
    (page: number): AppThunk<void> =>
    async (dispatch, getState) => {
      const limit = getState().sample.limit
      const estimatedCount = page * limit
      const maxReacheSample = getState().sample.maxReachedPage * limit

      // only show warning dialog when the selected page is far from the maxReachedPage
      if (estimatedCount > 1000 + maxReacheSample) {
        dispatch(
          popupActions.show({
            onAccept: () => {
              dispatch(setPage(page))
            },
          }),
        )
      } else dispatch(setPage(page))
    },
  setLimit,
  reset,
}

export default sampleActions
