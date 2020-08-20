import {
  ActionReducerMapBuilder,
  createSlice,
  PayloadAction,
  SliceCaseReducers,
  ValidateSliceCaseReducers,
} from '@reduxjs/toolkit'
import { NoInfer } from '@reduxjs/toolkit/src/tsHelpers'
import { HYDRATE } from 'next-redux-wrapper'

export const createAppSlice = <T, Reducers extends SliceCaseReducers<T>>({
  name,
  initialState,
  reducers,
  extraReducers
}: {
  name: string,
  initialState: T,
  reducers: ValidateSliceCaseReducers<T, Reducers>,
  extraReducers: (builder: ActionReducerMapBuilder<NoInfer<T>>) => void
}) =>
    createSlice({
      name,
      initialState,
      reducers: {
        [HYDRATE]: (state: T, action: PayloadAction<T>) => ({
          ...state,
          ...action.payload,
        }),
        ...reducers,
      },
      extraReducers
    })
