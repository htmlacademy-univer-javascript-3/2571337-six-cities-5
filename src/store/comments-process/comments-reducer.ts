import { createSlice } from '@reduxjs/toolkit';
import { TComment } from '../../types/comment.types';
import { addCommentFx, fetchComments } from './api-actions';

type InitialState = {
    comments: TComment[];
}

const initialState: InitialState = {
  comments: []
};

const commentsSlice = createSlice({
  initialState,
  name: 'comments',
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchComments.fulfilled, (state, { payload: comments }) => {
        state.comments = comments;
      })
      .addCase(addCommentFx.fulfilled, (state, { payload: comment }) => {
        if (comment) {
          state.comments.push(comment);
        }
      });
  },
});

export const commentsReducer = commentsSlice.reducer;
