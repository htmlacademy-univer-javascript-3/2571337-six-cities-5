import { render, screen } from '@testing-library/react';
import { makeFakeComment } from '../../mocks/comments';
import { withHistory, withStore } from '../../mocks/mocks-component';
import { makeFakeCommonOffer } from '../../mocks/offers';
import { CommonOffer } from '../../types/offer.types';
import { TState } from '../../types/state.types';
import { ReviewForm } from './review-form';
import { extractActionsTypes } from '../../mocks/mocks';
import { APIRoute } from '../../constants/api';
import userEvent from '@testing-library/user-event';
import { COMMENT_MAX_LENGTH, COMMENT_MIN_LENGTH } from '../../constants/review-form';
import { addCommentFx } from '../../store/comments-process/api-actions';
import { clearError } from '../../store/comments-process/comments-reducer';

describe('Component: ReviewForm', () => {
  const reviewFormProps: {
        offerId: CommonOffer['id'];
    } = {
      offerId: makeFakeCommonOffer().id
    };

  let initialState: Partial<TState>;

  beforeEach(() => {
    initialState = {
      comments: {
        comments: [makeFakeComment()],
        errorMessage: null,
        isLoading: false
      }
    };
  });

  it('should render correctly with isLoading=false', () => {
    const expectedText = 'Your review';
    const raingInputTestId = 'ratingInput__5';
    const commentInputTestId = 'commentInput';
    const submitTestId = 'submitReview';
    const componentWithHistory = withHistory(<ReviewForm {...reviewFormProps}/>);
    const { componentWithStore: prepandedComponent } = withStore(componentWithHistory, initialState);

    render(prepandedComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
    expect(screen.getByTestId(raingInputTestId)).toBeInTheDocument();
    expect(screen.getByTestId(commentInputTestId)).toBeInTheDocument();
    expect(screen.getByTestId(commentInputTestId)).not.toBeDisabled();
    expect(screen.getByTestId(submitTestId)).toBeInTheDocument();
  });

  it('should render correctly with isLoading=true', () => {
    const commentInputTestId = 'commentInput';
    const componentWithHistory = withHistory(<ReviewForm {...reviewFormProps} />);
    const { componentWithStore: prepandedComponent } = withStore(componentWithHistory, {comments: {...initialState.comments!, isLoading: true}});

    render(prepandedComponent);

    expect(screen.getByTestId(commentInputTestId)).toBeDisabled();
  });

  describe('test submit review form', () => {
    it('should dispatch "clearError" "addCommentFx.pending" "addCommentFx.fulfilled"', async () => {
      const raingInputTestId = 'ratingInput__5';
      const commentInputTestId = 'commentInput';
      const submitTestId = 'submitReview';
      const componentWithHistory = withHistory(<ReviewForm {...reviewFormProps}/>);
      const { componentWithStore: prepandedComponent, mockAxiosAdapter, mockStore } = withStore(componentWithHistory, initialState);
      mockAxiosAdapter.onPost(`${APIRoute.Comments}${reviewFormProps.offerId}`).reply(201);

      render(prepandedComponent);
      await userEvent.type(screen.getByTestId(commentInputTestId), Array(COMMENT_MAX_LENGTH).fill('a').join(''));
      await userEvent.click(screen.getByTestId(raingInputTestId));
      await userEvent.click(screen.getByTestId(submitTestId));
      const expectedActions = extractActionsTypes(mockStore.getActions());

      expect(expectedActions).toEqual([clearError.type, addCommentFx.pending.type, addCommentFx.fulfilled.type]);
    });

    it('should dispatch "clearError" with more then comment_max_length', async () => {
      const raingInputTestId = 'ratingInput__5';
      const commentInputTestId = 'commentInput';
      const submitTestId = 'submitReview';
      const componentWithHistory = withHistory(<ReviewForm {...reviewFormProps}/>);
      const { componentWithStore: prepandedComponent, mockAxiosAdapter, mockStore } = withStore(componentWithHistory, initialState);
      mockAxiosAdapter.onPost(`${APIRoute.Comments}${reviewFormProps.offerId}`).reply(201);

      render(prepandedComponent);
      await userEvent.type(screen.getByTestId(commentInputTestId), Array(COMMENT_MAX_LENGTH + 1).fill('a').join(''));
      await userEvent.click(screen.getByTestId(raingInputTestId));
      await userEvent.click(screen.getByTestId(submitTestId));
      const expectedActions = extractActionsTypes(mockStore.getActions());

      expect(expectedActions).toEqual([clearError.type]);
    });

    it('should dispatch "clearError" with less then comment_min_length', async () => {
      const raingInputTestId = 'ratingInput__5';
      const commentInputTestId = 'commentInput';
      const submitTestId = 'submitReview';
      const componentWithHistory = withHistory(<ReviewForm {...reviewFormProps}/>);
      const { componentWithStore: prepandedComponent, mockAxiosAdapter, mockStore } = withStore(componentWithHistory, initialState);
      mockAxiosAdapter.onPost(`${APIRoute.Comments}${reviewFormProps.offerId}`).reply(201);

      render(prepandedComponent);
      await userEvent.type(screen.getByTestId(commentInputTestId), Array(COMMENT_MIN_LENGTH - 1).fill('a').join(''));
      await userEvent.click(screen.getByTestId(raingInputTestId));
      await userEvent.click(screen.getByTestId(submitTestId));
      const expectedActions = extractActionsTypes(mockStore.getActions());

      expect(expectedActions).toEqual([clearError.type]);
    });

    it('should dispatch "clearError" with not clicked on rating', async () => {
      const commentInputTestId = 'commentInput';
      const submitTestId = 'submitReview';
      const componentWithHistory = withHistory(<ReviewForm {...reviewFormProps}/>);
      const { componentWithStore: prepandedComponent, mockAxiosAdapter, mockStore } = withStore(componentWithHistory, initialState);
      mockAxiosAdapter.onPost(`${APIRoute.Comments}${reviewFormProps.offerId}`).reply(201);

      render(prepandedComponent);
      await userEvent.type(screen.getByTestId(commentInputTestId), Array(COMMENT_MIN_LENGTH).fill('a').join(''));
      await userEvent.click(screen.getByTestId(submitTestId));
      const expectedActions = extractActionsTypes(mockStore.getActions());

      expect(expectedActions).toEqual([clearError.type]);
    });
  });
});
