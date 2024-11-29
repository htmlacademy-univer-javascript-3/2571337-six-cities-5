import { createReducer } from '@reduxjs/toolkit';
import { setAuthorizationStatus } from '../action';
import { AuthStatus } from '../../constants/user';

type InitialState = {
    authorizationStatus: AuthStatus;
}

const initialState: InitialState = {
  authorizationStatus: AuthStatus.Unknown
};

export const usersReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setAuthorizationStatus, (state, { payload: authStatus }) => {
      state.authorizationStatus = authStatus;
    });
});
