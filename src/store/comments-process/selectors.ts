import { createSelector } from '@reduxjs/toolkit';
import { TState } from '../../types/state.types';
import { sortByDate } from '../../utils/sort-by-date';
import { MAX_COMMENTS_ON_PAGE } from '../../constants/offers';

export const selectComments = ((state:TState) => ({comments:state.comments.comments}));
export const selectLoadingState = ((state:TState) => ({isLoading:state.comments.isLoading}));
export const selectError = ((state:TState) => ({errorMessage:state.comments.errorMessage}));

export const selectFilteredComments = createSelector(
  [selectComments],
  ({comments}) => ({
    commentsLength: comments.length,
    filteredComments: sortByDate(comments.slice(0, MAX_COMMENTS_ON_PAGE), 'date')
  })
);
