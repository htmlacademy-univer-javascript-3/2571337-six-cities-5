import { configureMockStore } from '@jedmao/redux-mock-store';
import thunk from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import { createApi } from '../../services/api';
import { TState } from '../../types/state.types';
import { Action } from '@reduxjs/toolkit';
import { AppThunkDispatch, extractActionsTypes } from '../../mocks/mocks';
import { beforeEach } from 'vitest';
import { APIRoute } from '../../constants/api';
import { makeFakeComment } from '../../mocks/comments';
import { addCommentFx, fetchComments } from './api-actions';
import { datatype } from 'faker';

describe('Test Async Actions in Comments Slice', () => {
  const api = createApi();
  const mockAxiosAdapter = new MockAdapter(api);
  const middleware = [thunk.withExtraArgument(api)];
  const mockStoreCreator = configureMockStore<TState, Action<string>, AppThunkDispatch>(middleware);

  let store: ReturnType<typeof mockStoreCreator>;

  beforeEach(() => {
    store = mockStoreCreator();
  });

  it('should dispatch "fetchComments.pending" "fetchComments.fulfilled"', async () => {
    const offerId = '123';
    const fakeComments = [makeFakeComment()];
    mockAxiosAdapter.onGet(`${APIRoute.Comments}${offerId}/`).reply(200, fakeComments);

    await store.dispatch(fetchComments(offerId));
    const expectedActions = extractActionsTypes(store.getActions());

    expect(expectedActions).toEqual([fetchComments.pending.type, fetchComments.fulfilled.type]);
  });

  it('should dispatch "addCommentFx.pending" "addCommentFx.fulfilled"', async () => {
    const offerId = '123';
    const fakeComment = makeFakeComment();
    const fakeCommentDataAndOfferId = { commentData: {comment: datatype.string(), rating: datatype.number({ min: 0, max: 5 })}, offerId };
    mockAxiosAdapter.onPost(`${APIRoute.Comments}${offerId}`).reply(201, fakeComment);

    await store.dispatch(addCommentFx(fakeCommentDataAndOfferId));
    const expectedActions = extractActionsTypes(store.getActions());

    expect(expectedActions).toEqual([addCommentFx.pending.type, addCommentFx.fulfilled.type]);
  });

  it('should dispatch "addCommentFx.pending" "addCommentFx.rejected"', async () => {
    const offerId = '123';
    const fakeComment = makeFakeComment();
    const fakeCommentDataAndOfferId = { commentData: {comment: datatype.string(), rating: datatype.number({ min: 0, max: 5 })}, offerId };
    mockAxiosAdapter.onPost(`${APIRoute.Comments}${offerId}`).reply(400, fakeComment);

    await store.dispatch(addCommentFx(fakeCommentDataAndOfferId));
    const expectedActions = extractActionsTypes(store.getActions());

    expect(expectedActions).toEqual([addCommentFx.pending.type, addCommentFx.rejected.type]);
  });
});
