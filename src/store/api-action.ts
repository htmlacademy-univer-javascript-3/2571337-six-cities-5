import { TAppDispatch, TState } from '../types/state.types';
import { AxiosInstance } from 'axios';
import { APIRoute } from '../constants/api';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { CommonOffer } from '../types/offer.types';
import { fillOffers, setIsLoading } from './action';

export const fetchOffers = createAsyncThunk<void, undefined,
    {
        state: TState;
        dispatch: TAppDispatch;
        extra: AxiosInstance;
    }
>(
  'offers/fetchOffers',
  async (_arg, { dispatch, extra:api }) => {
    dispatch(setIsLoading(true));
    const dataOffers = await api.get<CommonOffer[]>(APIRoute.Offers);
    dispatch(fillOffers(dataOffers.data));
    dispatch(setIsLoading(false));
  }
);
