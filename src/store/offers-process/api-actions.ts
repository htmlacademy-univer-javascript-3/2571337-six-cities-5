import { AxiosInstance } from 'axios';
import { TAppDispatch, TState } from '../../types/state.types';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { CommonOffer, Offer, SetFavoriteOfferStatusParams } from '../../types/offer.types';
import { APIRoute } from '../../constants/api';
import { redirectToRoute } from '../action';
import { AppRoute } from '../../constants/routes';

export const fetchOffers = createAsyncThunk<CommonOffer[], undefined,
    {
        state: TState;
        dispatch: TAppDispatch;
        extra: AxiosInstance;
    }
>(
  'offers/fetchOffers',
  async (_arg, { extra:api }) => {
    const dataOffers = await api.get<CommonOffer[]>(APIRoute.Offers);
    return dataOffers.data;
  }
);

export const fetchOffer = createAsyncThunk<Offer | undefined, string,
{
    state: TState;
    dispatch: TAppDispatch;
    extra: AxiosInstance;
}
>(
  'offers/fetchOffer',
  async (offerId, { dispatch, extra: api }) => {
    try {
      const {data: offer} = await api.get<Offer>(`${APIRoute.Offers}${offerId}/`);
      return offer;
    } catch {
      dispatch(redirectToRoute(AppRoute.NotFound));
    }
  }
);

export const fetchFavoriteOffers = createAsyncThunk<CommonOffer[] | undefined, undefined,
{
    state: TState;
    dispatch: TAppDispatch;
    extra: AxiosInstance;
}
>(
  'offers/fetchFavoriteOffers',
  async (_arg, { dispatch, extra: api }) => {
    try {
      const {data: favoriteOffers} = await api.get<CommonOffer[]>(`${APIRoute.Favorite}`);
      return favoriteOffers;
    } catch {
      dispatch(redirectToRoute(AppRoute.NotFound));
    }
  }
);

export const setFavoriteOfferStatus = createAsyncThunk<Offer | undefined, SetFavoriteOfferStatusParams,
{
    state: TState;
    dispatch: TAppDispatch;
    extra: AxiosInstance;
}
>(
  'offers/setFavoriteOfferStatus',
  async ({ offerId, status }, { dispatch, extra: api }) => {
    try {
      const offer = await api.post<Offer>(`${APIRoute.Favorite}${offerId}/${status}/`);
      dispatch(fetchFavoriteOffers());
      return offer.data;
    } catch {
      dispatch(redirectToRoute(AppRoute.NotFound));
    }
  }
);

export const fetchNearbyOffers = createAsyncThunk<CommonOffer[] | undefined, string,
{
    state: TState;
    dispatch: TAppDispatch;
    extra: AxiosInstance;
}
>(
  'offers/fetchNearbyOffers',
  async (offerId, { dispatch, extra: api }) => {
    try {
      const {data: nearbyOffers} = await api.get<CommonOffer[]>(`${APIRoute.Offers}${offerId}/nearby/`);
      return nearbyOffers;
    } catch {
      dispatch(redirectToRoute(AppRoute.NotFound));
    }
  }
);
