import { AuthStatus } from '../../constants/user';
import { makeFakeUser } from '../../mocks/users';
import { setAuthorizationStatus, setUser, usersReducer } from './user-reducer';

describe('Test User Slice', () => {
  it('should set authorizationStatus with action "setAuthorizationStatus"', () => {
    const initialState = {
      authorizationStatus: AuthStatus.Unauthorized,
      user: null
    };

    const expectedAuthorizationStatus = AuthStatus.Authorized;

    const result = usersReducer(initialState, setAuthorizationStatus(expectedAuthorizationStatus));

    expect(result.authorizationStatus).toBe(expectedAuthorizationStatus);
  });

  it('should set user with action "setUser"', () => {
    const initialState = {
      authorizationStatus: AuthStatus.Unauthorized,
      user: null
    };

    const expectedUser = makeFakeUser();

    const result = usersReducer(initialState, setUser(expectedUser));

    expect(result.user).toEqual(expectedUser);
  });
});
