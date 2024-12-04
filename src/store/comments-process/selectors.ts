import { createSelector } from '@reduxjs/toolkit';
import { TState } from '../../types/state.types';
import { sortByDate } from '../../utils/sort-by-date';
import { MAX_COMMENTS_ON_PAGE } from '../../constants/offers';

export const selectComments = ((state:Pick<TState, 'comments'>) => (state.comments.comments));
export const selectLoadingState = ((state:Pick<TState, 'comments'>) => (state.comments.isLoading));
export const selectError = ((state:Pick<TState, 'comments'>) => (state.comments.errorMessage));

export const selectFilteredComments = createSelector(
  [selectComments],
  (comments) => ({
    commentsLength: comments.length,
    filteredComments: sortByDate(comments, 'date')
      .slice(0, MAX_COMMENTS_ON_PAGE)
  })
);
