import { AxiosInstance } from 'axios';
import { TAppDispatch, TState } from '../../types/state.types';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { CommonOffer, Offer } from '../../types/offer.types';
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
