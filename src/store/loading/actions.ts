import { id } from '@/utils/id'

import { AppThunk } from '..'
import { addId, removeId } from '.'

const loadingActions = {
  onLoading: (): AppThunk<string> => (dispatch) => {
    const loadId = id()
    dispatch(addId(loadId))
    return loadId
  },
  onFinished:
    (loadId: string): AppThunk<void> =>
    (dispatch) => {
      dispatch(removeId(loadId))
    },
}

export default loadingActions
