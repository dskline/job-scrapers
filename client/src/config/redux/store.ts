import { useDispatch } from 'react-redux'
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { createWrapper, HYDRATE } from 'next-redux-wrapper'

import { reducer as jobList } from 'src/features/core/JobList/store'

const combinedReducers = combineReducers({
  jobList,
})

const reducer = (state, action) => {
  if (action.type === HYDRATE) {
    return { ...state, ...action.payload }
  } else {
    return combinedReducers(state, action)
  }
}
const wrappedStore = configureStore({
  reducer,
  devTools: process.env.NODE_ENV === 'development',
})

export const store = createWrapper(() => wrappedStore)
export const useAppDispatch = () => useDispatch<AppDispatch>()

export type RootState = ReturnType<typeof wrappedStore.getState>;
export type AppDispatch = typeof wrappedStore.dispatch;
