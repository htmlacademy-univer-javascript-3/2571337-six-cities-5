import { MockStore, configureMockStore } from '@jedmao/redux-mock-store';
import { redirect } from './redirect';
import {browserHistory} from '../../browser-history';
import { AnyAction } from '@reduxjs/toolkit';
import { redirectToRoute } from '../action';
import { AppRoute } from '../../constants/routes';
import { TState } from '../../types/state.types';

vi.mock('../../browser-history', () => ({
  browserHistory: {
    location: { pathname: ''},
    push(path: string) {
      this.location.pathname = path;
    }
  }
}));

describe('Redirect middleware', () => {
  let store: MockStore;

  beforeAll(() => {
    const middleware = [redirect];
    const mockStoreCreator = configureMockStore<TState, AnyAction>(middleware);
    store = mockStoreCreator();
  });

  beforeEach(() => {
    browserHistory.push('');
  });

  it('should redirect to "/login" with redirectToRoute action', () => {
    const redirectAction = redirectToRoute(AppRoute.Login);

    store.dispatch(redirectAction);

    expect(browserHistory.location.pathname).toBe(AppRoute.Login);
  });

  it('should not redirect to "/" with empty action', () => {
    const emptyAction = { type: '', payload: AppRoute.Main };

    store.dispatch(emptyAction);

    expect(browserHistory.location.pathname).not.toBe(AppRoute.Main);
  });
});
