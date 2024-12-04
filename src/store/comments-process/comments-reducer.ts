import { createSlice } from '@reduxjs/toolkit';
import { TComment } from '../../types/comment.types';
import { addCommentFx, fetchComments } from './api-actions';

type InitialState = {
    comments: TComment[];
    isLoading: boolean;
    errorMessage: string | null;
}

const initialState: InitialState = {
  comments: [],
  isLoading: false,
  errorMessage: null
};

const commentsSlice = createSlice({
  initialState,
  name: 'comments',
  reducers: {
    clearError: (state) => {
      state.errorMessage = null;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchComments.fulfilled, (state, { payload: comments }) => {
        state.comments = comments;
      })
      .addCase(addCommentFx.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addCommentFx.fulfilled, (state, { payload: comment }) => {
        state.comments.push(comment);
        state.isLoading = false;
        state.errorMessage = null;
      })
      .addCase(addCommentFx.rejected, (state, { error }) => {
        state.isLoading = false;
        state.errorMessage = error.message ?? 'Неизвестная ошибка';
      });
  },
});

export const commentsReducer = commentsSlice.reducer;
export const { clearError } = commentsSlice.actions;
