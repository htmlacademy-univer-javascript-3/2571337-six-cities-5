import { TAppDispatch, TState } from '../types/state.types';
import { AxiosInstance, AxiosResponse } from 'axios';
import { APIRoute } from '../constants/api';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { CommonOffer, Offer } from '../types/offer.types';
import { addNewComment, fillComments, fillNearbyOffers, fillOffer, fillOffers, redirectToRoute, setAuthorizationStatus, setError, setIsLoading } from './action';
import { AuthCredentials, TUser } from '../types/user.types';
import { dropToken, setToken } from '../services/token';
import { AuthStatus } from '../constants/user';
import { AppRoute } from '../constants/routes';
import { AddCommentParams, TComment } from '../types/comment.types';

export const clearError = createAsyncThunk<void, undefined,
{
    state: TState;
    dispatch: TAppDispatch;
    extra: AxiosInstance;
}
>(
  'app/clearError',
  (_arg, { dispatch }) => {
    setTimeout(() => {
      dispatch(setError(null));
    }, 2000);
  }
);

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

export const checkAuth = createAsyncThunk<void, undefined,
  {
      state: TState;
      dispatch: TAppDispatch;
      extra: AxiosInstance;
  }
>(
  'user/checkAuth',
  async (_arg, { dispatch, extra: api }) => {
    try {
      const user = await api.get<TUser>(APIRoute.Login);
      setToken(user.data.token);
      dispatch(setAuthorizationStatus(AuthStatus.Authorized));
    } catch {
      dispatch(setAuthorizationStatus(AuthStatus.Unauthorized));
      dispatch(redirectToRoute(AppRoute.Login));
    }
  }
);

export const login = createAsyncThunk<void, AuthCredentials,
  {
      state: TState;
      dispatch: TAppDispatch;
      extra: AxiosInstance;
  }
>(
  'user/login',
  async (authCredentials, { dispatch, extra: api }) => {
    try {
      const user = await api.post<AuthCredentials, AxiosResponse<TUser>>(APIRoute.Login, authCredentials);
      setToken(user.data.token);
      dispatch(setAuthorizationStatus(AuthStatus.Authorized));
      dispatch(redirectToRoute(AppRoute.Main));
    } catch {
      dispatch(setAuthorizationStatus(AuthStatus.Unauthorized));
    }
  }
);

export const logout = createAsyncThunk<void, undefined,
  {
      state: TState;
      dispatch: TAppDispatch;
      extra: AxiosInstance;
  }
>(
  'user/logout',
  async (_arg, { dispatch, extra: api }) => {
    try {
      await api.delete(APIRoute.Logout);
      dropToken();
      dispatch(setAuthorizationStatus(AuthStatus.Unauthorized));
    } catch {
      dispatch(setAuthorizationStatus(AuthStatus.Authorized));
    }
  }
);

export const fetchOffer = createAsyncThunk<void, string,
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
      dispatch(fillOffer(offer));
    } catch {
      dispatch(redirectToRoute(AppRoute.NotFound));
    }
  }
);

export const fetchNearbyOffers = createAsyncThunk<void, string,
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
      dispatch(fillNearbyOffers(nearbyOffers));
    } catch {
      dispatch(redirectToRoute(AppRoute.NotFound));
    }
  }
);

export const fetchComments = createAsyncThunk<void, string,
{
    state: TState;
    dispatch: TAppDispatch;
    extra: AxiosInstance;
}
>(
  'comments/fetchComments',
  async (offerId, { dispatch, extra: api }) => {
    try {
      const {data: comments} = await api.get<TComment[]>(`${APIRoute.Comments}${offerId}/`);
      dispatch(fillComments(comments));
    } catch {
      dispatch(redirectToRoute(AppRoute.NotFound));
    }
  }
);

export const addCommentFx = createAsyncThunk<void, AddCommentParams,
{
    state: TState;
    dispatch: TAppDispatch;
    extra: AxiosInstance;
}
>(
  'comments/addComment',
  async ({ commentData, offerId }, { dispatch, extra: api }) => {
    try {
      const comment = await api.post<AddCommentParams['commentData'], AxiosResponse<TComment>>(`${APIRoute.Comments}${offerId}`, commentData);
      dispatch(addNewComment(comment.data));
    } catch {
      dispatch(redirectToRoute(AppRoute.NotFound));
    }
  }
);
