import { makeFakeComment } from '../../mocks/comments';
import { AddCommentParams } from '../../types/comment.types';
import { addCommentFx, fetchComments } from './api-actions';
import { clearError, commentsReducer } from './comments-reducer';

describe('Test Comments Slice', () => {
  it('should return initial state with empty action', () => {
    const emptyAction = { type: '' };
    const initialState = {
      comments: [],
      isLoading: true,
      errorMessage: null
    };

    const result = commentsReducer(initialState, emptyAction);

    expect(result).toEqual(initialState);
  });

  it('should return default initial state with undefined state and empty action', () => {
    const emptyAction = { type: '' };
    const initialState = {
      comments: [],
      isLoading: false,
      errorMessage: null
    };

    const result = commentsReducer(undefined, emptyAction);

    expect(result).toEqual(initialState);
  });

  it('should clear error message with "clearError" action', () => {
    const initialState = {
      comments: [],
      isLoading: false,
      errorMessage: 'some message'
    };

    const result = commentsReducer(initialState, clearError);

    expect(result.errorMessage).toBeNull();
  });

  it('should set comments with "fetchComments.fulfilled" action', () => {
    const initialState = {
      comments: [],
      isLoading: false,
      errorMessage: 'some message'
    };
    const payloadComments = [makeFakeComment()];
    const expectedState = {
      comments: payloadComments,
      isLoading: false,
      errorMessage: 'some message'
    };

    const result = commentsReducer(initialState, fetchComments.fulfilled(payloadComments, '', ''));

    expect(result.comments).toEqual(expectedState.comments);
  });

  it('should set isLoading = true with "addCommentFx.pending" action', () => {
    const initialState = {
      comments: [],
      isLoading: false,
      errorMessage: 'some message'
    };
    const expectedState = {
      comments: [],
      isLoading: true,
      errorMessage: 'some message'
    };

    const result = commentsReducer(initialState, addCommentFx.pending);

    expect(result.isLoading).toBe(expectedState.isLoading);
  });

  it('should set isLoading = false and push in comments new comment with "addCommentFx.fulfilled" action', () => {
    const initialState = {
      comments: [],
      isLoading: true,
      errorMessage: 'some message'
    };
    const comment = makeFakeComment();
    const expectedState = {
      comments: [comment],
      isLoading: false,
      errorMessage: 'some message'
    };

    const result = commentsReducer(initialState, addCommentFx.fulfilled(comment, '', {} as AddCommentParams));

    expect(result).toEqual(expectedState);
  });

  it('should set isLoading = false and errorMessage with "addCommentFx.rejected" action', () => {
    const initialState = {
      comments: [],
      isLoading: true,
      errorMessage: 'some message'
    };
    const error = new Error('Some error');
    const expectedState = {
      comments: [],
      isLoading: false,
      errorMessage: error.message
    };

    const result = commentsReducer(initialState, addCommentFx.rejected(error, '', {} as AddCommentParams));

    expect(result).toEqual(expectedState);
  });
});
