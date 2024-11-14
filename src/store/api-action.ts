import { TAppDispatch, TState } from '../types/state.types';
import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { setError } from './action';

export const clearError = createAsyncThunk<void, undefined,
{
    state: TState;
    dispatch: TAppDispatch;
    extra: AxiosInstance;
}
>(
  'app/clearError',
  (_arg, { dispatch }) => {
    setTimeout(() => {
      dispatch(setError(null));
    }, 2000);
  }
);
