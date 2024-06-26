import { combineReducers } from '@reduxjs/toolkit'

import column from './column'
import loading from './loading'
import popup from './popup'
import sample from './sample'
import sampleGroup from './sampleGroup'
import selectedColumn from './selectedColumn'
import selectedSample from './selectedSample'
import token from './token'

const reducers = combineReducers({
  loading,
  token,
  column,
  selectedColumn,
  sample,
  selectedSample,
  sampleGroup,
  popup,
})

const rootReducer = (state: any, action: any) => {
  return reducers(state, action)
}

export default rootReducer
