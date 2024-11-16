import { AxiosInstance } from 'axios';
import { TAppDispatch, TState } from '../../types/state.types';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { CommonOffer, Offer, SetFavoriteOfferStatusParams } from '../../types/offer.types';
import { APIRoute } from '../../constants/api';

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

export const fetchOffer = createAsyncThunk<Offer, string,
{
    state: TState;
    dispatch: TAppDispatch;
    extra: AxiosInstance;
}
>(
  'offers/fetchOffer',
  async (offerId, { extra: api }) => {
    const {data: offer} = await api.get<Offer>(`${APIRoute.Offers}${offerId}/`);
    return offer;
  }
);

export const fetchFavoriteOffers = createAsyncThunk<CommonOffer[], undefined,
{
    state: TState;
    dispatch: TAppDispatch;
    extra: AxiosInstance;
}
>(
  'offers/fetchFavoriteOffers',
  async (_arg, { extra: api }) => {
    const {data: favoriteOffers} = await api.get<CommonOffer[]>(`${APIRoute.Favorite}`);
    return favoriteOffers;
  }
);

export const setFavoriteOfferStatus = createAsyncThunk<Offer, SetFavoriteOfferStatusParams,
{
    state: TState;
    dispatch: TAppDispatch;
    extra: AxiosInstance;
}
>(
  'offers/setFavoriteOfferStatus',
  async ({ offerId, status }, { dispatch, extra: api }) => {
    const offer = await api.post<Offer>(`${APIRoute.Favorite}${offerId}/${status}/`);
    dispatch(fetchFavoriteOffers());
    return offer.data;
  }
);

export const fetchNearbyOffers = createAsyncThunk<CommonOffer[], string,
{
    state: TState;
    dispatch: TAppDispatch;
    extra: AxiosInstance;
}
>(
  'offers/fetchNearbyOffers',
  async (offerId, { extra: api }) => {
    const {data: nearbyOffers} = await api.get<CommonOffer[]>(`${APIRoute.Offers}${offerId}/nearby/`);
    return nearbyOffers;
  }
);
