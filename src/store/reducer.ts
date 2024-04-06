import { combineReducers } from '@reduxjs/toolkit'

import column from './column'
import loading from './loading'
import selectedColumn from './selectedColumn'
import token from './token'

const reducers = combineReducers({
  loading,
  token,
  column,
  selectedColumn,
})

const rootReducer = (state: any, action: any) => {
  return reducers(state, action)
}

export default rootReducer
