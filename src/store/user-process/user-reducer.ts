import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthStatus } from '../../constants/user';
import { TUser } from '../../types/user.types';

type InitialState = {
    authorizationStatus: AuthStatus;
    user: TUser | null;
}

const initialState: InitialState = {
  authorizationStatus: AuthStatus.Unknown,
  user: null
};

const usersSlice = createSlice({
  initialState,
  name: 'user',
  reducers: {
    setAuthorizationStatus: (state, { payload: authStatus }: PayloadAction<AuthStatus>) => {
      state.authorizationStatus = authStatus;
    },
    setUser: (state, { payload: user }: PayloadAction<TUser | null>) => {
      state.user = user;
    }
  }
});

export const usersReducer = usersSlice.reducer;
export const { setAuthorizationStatus, setUser } = usersSlice.actions;
