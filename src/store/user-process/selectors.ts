import { TState } from '../../types/state.types';

export const selectAuthStatus = (state: TState) => ({authStatus: state.user.authorizationStatus});
