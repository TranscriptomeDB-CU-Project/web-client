import { configureStore, ThunkAction, UnknownAction } from '@reduxjs/toolkit'
import { enableMapSet } from 'immer'
import { shallowEqual, TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

import rootReducer from './reducer'

enableMapSet()
export const store = configureStore({
  reducer: rootReducer,
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppThunk<T> = ThunkAction<T, RootState, unknown, UnknownAction>

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = (selector) => {
  return useSelector(selector, shallowEqual)
}
