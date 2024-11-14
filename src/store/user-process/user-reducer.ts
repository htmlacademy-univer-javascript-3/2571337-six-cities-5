import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthStatus } from '../../constants/user';

type InitialState = {
    authorizationStatus: AuthStatus;
}

const initialState: InitialState = {
  authorizationStatus: AuthStatus.Unknown
};

const usersSlice = createSlice({
  initialState,
  name: 'user',
  reducers: {
    setAuthorizationStatus: (state, { payload: authStatus }: PayloadAction<AuthStatus>) => {
      state.authorizationStatus = authStatus;
    }
  }
});

export const usersReducer = usersSlice.reducer;
export const { setAuthorizationStatus } = usersSlice.actions;
