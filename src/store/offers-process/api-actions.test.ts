import { configureMockStore } from '@jedmao/redux-mock-store';
import thunk from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import { createApi } from '../../services/api';
import { TState } from '../../types/state.types';
import { Action } from '@reduxjs/toolkit';
import { AppThunkDispatch, extractActionsTypes } from '../../mocks/mocks';
import { beforeEach } from 'vitest';
import { APIRoute } from '../../constants/api';
import { makeFakeCommonOffer, makeFakeOffer } from '../../mocks/offers';
import { fetchFavoriteOffers, fetchNearbyOffers, fetchOffer, fetchOffers, setFavoriteOfferStatus } from './api-actions';
import { FavoriteOfferStatus } from '../../constants/offers';
import { redirectToRoute } from '../action';

describe('Test Async Actions in Offers Slice', () => {
  const api = createApi();
  const mockAxiosAdapter = new MockAdapter(api);
  const middleware = [thunk.withExtraArgument(api)];
  const mockStoreCreator = configureMockStore<TState, Action<string>, AppThunkDispatch>(middleware);

  let store: ReturnType<typeof mockStoreCreator>;

  beforeEach(() => {
    store = mockStoreCreator();
  });

  it('should dispatch "fetchOffers.pending" "fetchOffers.fulfilled"', async () => {
    const fakeOffers = [makeFakeCommonOffer()];
    mockAxiosAdapter.onGet(`${APIRoute.Offers}`).reply(200, fakeOffers);

    await store.dispatch(fetchOffers());
    const expectedActions = extractActionsTypes(store.getActions());

    expect(expectedActions).toEqual([fetchOffers.pending.type, fetchOffers.fulfilled.type]);
  });

  it('should dispatch "fetchOffers.pending" "fetchOffers.rejected"', async () => {
    mockAxiosAdapter.onGet(`${APIRoute.Offers}`).reply(404);

    await store.dispatch(fetchOffers());
    const expectedActions = extractActionsTypes(store.getActions());

    expect(expectedActions).toEqual([fetchOffers.pending.type, fetchOffers.rejected.type]);
  });

  it('should dispatch "fetchOffer.pending" "fetchOffer.fulfilled"', async () => {
    const offerId = '123';
    const fakeOffer = makeFakeOffer();
    mockAxiosAdapter.onGet(`${APIRoute.Offers}${offerId}/`).reply(200, fakeOffer);

    await store.dispatch(fetchOffer(offerId));
    const expectedActions = extractActionsTypes(store.getActions());

    expect(expectedActions).toEqual([fetchOffer.pending.type, fetchOffer.fulfilled.type]);
  });

  it('should dispatch "fetchOffer.pending" "redirectToRoute" "fetchOffer.fulfilled"', async () => {
    const offerId = '123';
    const fakeOffer = makeFakeOffer();
    mockAxiosAdapter.onGet(`${APIRoute.Offers}${offerId}/`).reply(404, fakeOffer);

    await store.dispatch(fetchOffer(offerId));
    const expectedActions = extractActionsTypes(store.getActions());

    expect(expectedActions).toEqual([fetchOffer.pending.type, redirectToRoute.type, fetchOffer.fulfilled.type]);
  });

  it('should dispatch "fetchNearbyOffers.pending" "fetchNearbyOffers.fulfilled"', async () => {
    const offerId = '123';
    const fakeNearbyOffers = [makeFakeCommonOffer()];
    mockAxiosAdapter.onGet(`${APIRoute.Offers}${offerId}/nearby/`).reply(200, fakeNearbyOffers);

    await store.dispatch(fetchNearbyOffers(offerId));
    const expectedActions = extractActionsTypes(store.getActions());

    expect(expectedActions).toEqual([fetchNearbyOffers.pending.type, fetchNearbyOffers.fulfilled.type]);
  });

  it('should dispatch "fetchFavoriteOffers.pending" "fetchFavoriteOffers.fulfilled"', async () => {
    const fakeFavoritesOffers = [makeFakeCommonOffer()];
    mockAxiosAdapter.onGet(`${APIRoute.Favorite}`).reply(200, fakeFavoritesOffers);

    await store.dispatch(fetchFavoriteOffers());
    const expectedActions = extractActionsTypes(store.getActions());

    expect(expectedActions).toEqual([fetchFavoriteOffers.pending.type, fetchFavoriteOffers.fulfilled.type]);
  });

  it('should dispatch "setFavoriteOfferStatus.pending" "fetchFavoriteOffers.pending" "fetchFavoriteOffers.fulfilled" "setFavoriteOfferStatus.fulfilled"', async () => {
    const fakeFavoritesOffers = [makeFakeCommonOffer()];
    const offerId = '123';
    const status = FavoriteOfferStatus.Favorite;
    const fakeOffer = makeFakeOffer();

    mockAxiosAdapter.onPost(`${APIRoute.Favorite}${offerId}/${status}/`).reply(201, fakeOffer);
    mockAxiosAdapter.onGet(`${APIRoute.Favorite}`).reply(200, fakeFavoritesOffers);

    await store.dispatch(setFavoriteOfferStatus({offerId, status}));
    const expectedActions = extractActionsTypes(store.getActions());

    expect(expectedActions).toEqual([setFavoriteOfferStatus.pending.type, fetchFavoriteOffers.pending.type, fetchFavoriteOffers.fulfilled.type, setFavoriteOfferStatus.fulfilled.type]);
  });

  it('should dispatch "setFavoriteOfferStatus.pending" "setFavoriteOfferStatus.rejected"', async () => {
    const offerId = '123';
    const status = FavoriteOfferStatus.Favorite;

    mockAxiosAdapter.onPost(`${APIRoute.Favorite}${offerId}/${status}/`).reply(404);

    await store.dispatch(setFavoriteOfferStatus({offerId, status}));
    const expectedActions = extractActionsTypes(store.getActions());

    expect(expectedActions).toEqual([setFavoriteOfferStatus.pending.type, setFavoriteOfferStatus.rejected.type]);
  });

});
