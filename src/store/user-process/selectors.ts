import { TState } from '../../types/state.types';

export const selectAuthStatus = (state: Pick<TState, 'user'>) => (state.user.authorizationStatus);
export const selectUserEmail = (state: Pick<TState, 'user'>) => (state.user.user?.email);
