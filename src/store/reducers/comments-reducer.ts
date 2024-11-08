import { createReducer } from '@reduxjs/toolkit';
import { addNewComment, fillComments } from '../action';
import { TComment } from '../../types/comment.types';

type InitialState = {
    comments: TComment[];
}

const initialState: InitialState = {
  comments: []
};

export const commentsReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(fillComments, (state, { payload: comments }) => {
      state.comments = comments;
    })
    .addCase(addNewComment, (state, { payload: newComment }) => {
      state.comments.push(newComment);
    });
});
