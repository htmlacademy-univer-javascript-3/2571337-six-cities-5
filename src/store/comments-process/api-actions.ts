import { createAsyncThunk } from '@reduxjs/toolkit';
import { AddCommentParams, TComment } from '../../types/comment.types';
import { TAppDispatch, TState } from '../../types/state.types';
import { AxiosInstance, AxiosResponse } from 'axios';
import { redirectToRoute } from '../action';
import { AppRoute } from '../../constants/routes';
import { APIRoute } from '../../constants/api';

export const fetchComments = createAsyncThunk<TComment[], string,
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
      return comments;
    } catch {
      dispatch(redirectToRoute(AppRoute.NotFound));
      return [];
    }
  }
);

export const addCommentFx = createAsyncThunk<TComment | null, AddCommentParams,
{
    state: TState;
    dispatch: TAppDispatch;
    extra: AxiosInstance;
}
>(
  'comments/addComment',
  async ({ commentData, offerId }, { dispatch, extra: api }) => {
    try {
      const {data: comment} = await api.post<AddCommentParams['commentData'], AxiosResponse<TComment>>(`${APIRoute.Comments}${offerId}`, commentData);
      return comment;
    } catch {
      dispatch(redirectToRoute(AppRoute.NotFound));
      return null;
    }
  }
);
