import { makeFakeComment } from '../../mocks/comments';
import { TState } from '../../types/state.types';
import { datatype } from 'faker';
import { selectComments, selectError, selectFilteredComments, selectLoadingState } from './selectors';
import { MAX_COMMENTS_ON_PAGE } from '../../constants/offers';

const MOCK_COMMENTS_LENGTH = 15;

describe('Test comments selectors', () => {
  const state: Pick<TState, 'comments'> = {
    comments: {
      comments: Array(MOCK_COMMENTS_LENGTH).fill('').map(() => makeFakeComment()),
      errorMessage: datatype.string(),
      isLoading: datatype.boolean()
    }
  };

  it('Test: selectComments. Should return the same comments', () => {
    const result = selectComments(state);

    expect(result).toEqual(state.comments.comments);
  });

  it('Test: selectLoadingState. Should return the same loading state', () => {

    const result = selectLoadingState(state);

    expect(result).toBe(state.comments.isLoading);
  });

  it('Test: selectError. Should return the same error', () => {

    const result = selectError(state);

    expect(result).toEqual(state.comments.errorMessage);
  });

  it('Test: selectFilteredComments. Should return the comments length and sorted by date top 10 comments', () => {

    const result = selectFilteredComments(state);

    expect(result).toEqual({ commentsLength: state.comments.comments.length, filteredComments: state.comments.comments.slice().sort((prev, next) => Number(new Date(next.date)) - Number(new Date(prev.date))).slice(0, MAX_COMMENTS_ON_PAGE) });
  });
});
