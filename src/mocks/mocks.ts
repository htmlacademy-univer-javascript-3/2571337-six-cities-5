import { ThunkDispatch } from 'redux-thunk';
import { TState } from '../types/state.types';
import { createApi } from '../services/api';
import { Action } from '@reduxjs/toolkit';
export type AppThunkDispatch = ThunkDispatch<TState, ReturnType<typeof createApi>, Action>;

export const extractActionsTypes = (actions: Action<string>[]) => actions.map(({ type }) => type);
