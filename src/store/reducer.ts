import { combineReducers } from '@reduxjs/toolkit'

import column from './column'
import loading from './loading'
import sample from './sample'
import selectedColumn from './selectedColumn'
import token from './token'

const reducers = combineReducers({
  loading,
  token,
  column,
  selectedColumn,
  sample,
})

const rootReducer = (state: any, action: any) => {
  return reducers(state, action)
}

export default rootReducer
