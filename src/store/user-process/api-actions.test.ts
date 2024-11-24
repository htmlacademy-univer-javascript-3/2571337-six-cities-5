import { configureMockStore } from '@jedmao/redux-mock-store';
import thunk from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import { createApi } from '../../services/api';
import { TState } from '../../types/state.types';
import { Action } from '@reduxjs/toolkit';
import { AppThunkDispatch, extractActionsTypes } from '../../mocks/mocks';
import { beforeEach } from 'vitest';
import { APIRoute } from '../../constants/api';
import { makeFakeUser } from '../../mocks/users';
import * as tokenService from '../../services/token';
import { checkAuth, login, logout } from './api-actions';
import { setAuthorizationStatus, setUser } from './user-reducer';
import { fetchFavoriteOffers, fetchOffers } from '../offers-process/api-actions';
import { makeFakeCommonOffer } from '../../mocks/offers';
import { redirectToRoute } from '../action';
import { AuthCredentials } from '../../types/user.types';
import { datatype, internet } from 'faker';

describe('Test Async Actions in User Slice', () => {
  const api = createApi();
  const mockAxiosAdapter = new MockAdapter(api);
  const middleware = [thunk.withExtraArgument(api)];
  const mockStoreCreator = configureMockStore<TState, Action<string>, AppThunkDispatch>(middleware);

  let store: ReturnType<typeof mockStoreCreator>;

  beforeEach(() => {
    store = mockStoreCreator();
  });

  describe('Test checkAuth', () => {
    it('should once called setToken with token from server', async () => {
      const user = makeFakeUser();
      mockAxiosAdapter.onGet(`${APIRoute.Login}`).reply(200, user);
      vi.spyOn(tokenService, 'setToken');

      await store.dispatch(checkAuth());

      expect(tokenService.setToken).toBeCalledWith(user.token);
      expect(tokenService.setToken).toBeCalledTimes(1);
    });

    it('should dispatch "checkAuth.pending" "setAuthorizationStatus" "setUser" "fetchFavoriteOffers.pending" "fetchFavoriteOffers.fulfilled" "checkAuth.fulfilled"', async () => {
      const user = makeFakeUser();
      const fakeFavoriteOffers = [makeFakeCommonOffer()];
      mockAxiosAdapter.onGet(`${APIRoute.Login}`).reply(200, user);
      mockAxiosAdapter.onGet(`${APIRoute.Favorite}`).reply(200, fakeFavoriteOffers);

      await store.dispatch(checkAuth());
      const expectedActions = extractActionsTypes(store.getActions());

      expect(expectedActions).toEqual([checkAuth.pending.type, setAuthorizationStatus.type, setUser.type, fetchFavoriteOffers.pending.type, fetchFavoriteOffers.fulfilled.type, checkAuth.fulfilled.type]);
    });

    it('should dispatch "checkAuth.pending" "setAuthorizationStatus" "redirectToRoute" "checkAuth.fulfilled"', async () => {
      const user = makeFakeUser();
      mockAxiosAdapter.onGet(`${APIRoute.Login}`).reply(401, user);

      await store.dispatch(checkAuth());
      const expectedActions = extractActionsTypes(store.getActions());

      expect(expectedActions).toEqual([checkAuth.pending.type, setAuthorizationStatus.type, redirectToRoute.type, checkAuth.fulfilled.type]);
    });
  });

  describe('Test login', () => {
    it('should once called setToken with token from server', async () => {
      const user = makeFakeUser();
      const fakeAuthCredentials:AuthCredentials = {
        email: internet.email(),
        password: datatype.string()
      };

      mockAxiosAdapter.onPost(`${APIRoute.Login}`).reply(200, user);

      vi.spyOn(tokenService, 'setToken');

      await store.dispatch(login(fakeAuthCredentials));

      expect(tokenService.setToken).toBeCalledWith(user.token);
      expect(tokenService.setToken).toBeCalledTimes(1);
    });

    it(`should dispatch 
        "login.pending"
         "setAuthorizationStatus" 
         "setUser" 
         "fetchFavoriteOffers.pending" 
         "fetchFavoriteOffers.fulfilled" 
         "fetchOffers.pending" 
         "fetchOffers.fulfilled" 
         "redirectToRoute"
         "login.fulfilled"
         `, async () => {
      const user = makeFakeUser();
      const fakeFavoriteOffers = [makeFakeCommonOffer()];
      const fakeOffers = [makeFakeCommonOffer()];
      const fakeAuthCredentials:AuthCredentials = {
        email: internet.email(),
        password: datatype.string()
      };
      mockAxiosAdapter.onGet(`${APIRoute.Login}`).reply(200, user);
      mockAxiosAdapter.onGet(`${APIRoute.Favorite}`).reply(200, fakeFavoriteOffers);
      mockAxiosAdapter.onGet(`${APIRoute.Offers}`).reply(200, fakeOffers);

      await store.dispatch(login(fakeAuthCredentials));

      const expectedActions = extractActionsTypes(store.getActions());
      expect(expectedActions).toEqual([
        login.pending.type,
        setAuthorizationStatus.type,
        setUser.type,
        fetchFavoriteOffers.pending.type,
        fetchFavoriteOffers.fulfilled.type,
        fetchOffers.pending.type,
        fetchOffers.fulfilled.type,
        redirectToRoute.type,
        login.fulfilled.type
      ]);
    });

    it('should dispatch "login.pending" "setAuthorizationStatus" "login.fulfilled"', async () => {
      const user = makeFakeUser();
      const fakeAuthCredentials:AuthCredentials = {
        email: internet.email(),
        password: datatype.string()
      };
      mockAxiosAdapter.onPost(`${APIRoute.Login}`).reply(401, user);

      await store.dispatch(login(fakeAuthCredentials));

      const expectedActions = extractActionsTypes(store.getActions());
      expect(expectedActions).toEqual([login.pending.type, setAuthorizationStatus.type, login.fulfilled.type]);
    });
  });

  describe('Test logout', () => {
    it('should once called dropToken', async () => {
      mockAxiosAdapter.onDelete(`${APIRoute.Logout}`).reply(204);
      vi.spyOn(tokenService, 'dropToken');

      await store.dispatch(logout());

      expect(tokenService.dropToken).toBeCalledTimes(1);
    });

    it('should dispatch "logout.pending" "setUser" "setAuthorizationStatus" "fetchOffers.pending" "fetchOffers.fulfilled" "logout.fulfilled"', async () => {
      mockAxiosAdapter.onDelete(`${APIRoute.Logout}`).reply(204);

      await store.dispatch(logout());

      const expectedActions = extractActionsTypes(store.getActions());
      expect(expectedActions).toEqual([logout.pending.type, setUser.type, setAuthorizationStatus.type, fetchOffers.pending.type, fetchOffers.fulfilled.type, logout.fulfilled.type]);
    });

    it('should dispatch "logout.pending" "setAuthorizationStatus" "logout.fulfilled"', async () => {
      mockAxiosAdapter.onDelete(`${APIRoute.Logout}`).reply(404);

      await store.dispatch(logout());

      const expectedActions = extractActionsTypes(store.getActions());
      expect(expectedActions).toEqual([logout.pending.type, setAuthorizationStatus.type, logout.fulfilled.type]);
    });
  });
});
