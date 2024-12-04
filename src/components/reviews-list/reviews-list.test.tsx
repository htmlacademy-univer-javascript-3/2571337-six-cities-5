import { render, screen } from '@testing-library/react';
import { makeFakeComment } from '../../mocks/comments';
import { TComment } from '../../types/comment.types';
import { ReviewsList } from './reviews-list';

describe('Component: ReviewsList', () => {
  const reviewsListProps: {
        comments: TComment[];
    } = {
      comments: [makeFakeComment()]
    };
  it('should render correctly', () => {
    const reviewsListContainerTestId = 'reviewsListContainer';
    const expectedChildCount = reviewsListProps.comments.length;

    render(<ReviewsList {...reviewsListProps}/>);

    expect(screen.getByTestId(reviewsListContainerTestId).childNodes.length).toBe(expectedChildCount);
  });
});
