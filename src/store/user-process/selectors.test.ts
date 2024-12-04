import { makeFakeAuthStatus, makeFakeUser } from '../../mocks/users';
import { TState } from '../../types/state.types';
import { selectAuthStatus, selectUserEmail } from './selectors';

describe('Test users selectors', () => {
  const state: Pick<TState, 'user'> = {
    user: {
      authorizationStatus: makeFakeAuthStatus(),
      user: makeFakeUser()
    }
  };

  it('Test selectAuthStatus. Should return the same authorizationStatus', () => {
    const result = selectAuthStatus(state);

    expect(result).toBe(state.user.authorizationStatus);
  });

  it('Test selectUserEmail. Should return the same user email', () => {
    const result = selectUserEmail(state);

    expect(result).toBe(state.user.user?.email);
  });
});
