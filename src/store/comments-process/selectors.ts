import { createSelector } from '@reduxjs/toolkit';
import { TState } from '../../types/state.types';
import { sortByDate } from '../../utils/sort-by-date';

export const selectComments = ((state:TState) => ({comments:state.comments.comments}));

export const selectFilteredComments = createSelector(
  [selectComments],
  ({comments}) => ({
    commentsLength: comments.length,
    filteredComments: sortByDate(comments.slice(0, 10), 'date')
  })
);
