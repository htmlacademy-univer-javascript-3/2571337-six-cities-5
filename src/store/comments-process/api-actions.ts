import { createAsyncThunk } from '@reduxjs/toolkit';
import { AddCommentParams, TComment } from '../../types/comment.types';
import { TAppDispatch, TState } from '../../types/state.types';
import { AxiosInstance, AxiosResponse } from 'axios';
import { APIRoute } from '../../constants/api';

export const fetchComments = createAsyncThunk<TComment[], string,
{
    state: TState;
    dispatch: TAppDispatch;
    extra: AxiosInstance;
}
>(
  'comments/fetchComments',
  async (offerId, { extra: api }) => {
    const {data: comments} = await api.get<TComment[]>(`${APIRoute.Comments}${offerId}/`);
    return comments;
  }
);

export const addCommentFx = createAsyncThunk<TComment, AddCommentParams,
{
    state: TState;
    dispatch: TAppDispatch;
    extra: AxiosInstance;
}
>(
  'comments/addComment',
  async ({ commentData, offerId }, { extra: api }) => {
    const {data: comment} = await api.post<AddCommentParams['commentData'], AxiosResponse<TComment>>(`${APIRoute.Comments}${offerId}`, commentData);
    return comment;
  }
);
