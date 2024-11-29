import { render, screen } from '@testing-library/react';
import { makeFakeComment } from '../../mocks/comments';
import { TComment } from '../../types/comment.types';
import { ReviewItem } from './review-item';

describe('Component: ReviewItem', () => {
  const reviewItemProps:{
        comment: TComment;
    } = {
      comment: makeFakeComment()
    };
  it('should render correctly', () => {
    const timeElementTestId = 'timeElement';
    const expectedUserName = reviewItemProps.comment.user.name;
    const expectedCommentText = reviewItemProps.comment.comment;

    render(<ReviewItem {...reviewItemProps}/>);

    expect(screen.getByTestId(timeElementTestId)).toBeInTheDocument();
    expect(screen.getByText(expectedCommentText)).toBeInTheDocument();
    expect(screen.getByText(expectedUserName)).toBeInTheDocument();
  });
});
