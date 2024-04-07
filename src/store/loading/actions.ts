import { id } from '@/utils/id'

import { AppThunk } from '..'
import { addId, removeId } from '.'

const loadingActions = {
  onLoading: (): AppThunk<() => void> => (dispatch) => {
    const loadId = id()
    dispatch(addId(loadId))

    return () => {
      dispatch(removeId(loadId))
    }
  },
}

export default loadingActions
