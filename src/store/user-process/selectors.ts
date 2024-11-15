import { TState } from '../../types/state.types';

export const selectAuthStatus = (state: TState) => ({authStatus: state.user.authorizationStatus});
export const selectUserEmail = (state: TState) => ({ email: state.user.user?.email });
