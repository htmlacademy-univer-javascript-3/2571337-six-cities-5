import { TComment } from '../../types/comment.types';
import { ReviewItem } from '../review-item';

type ReviewsListProps = {
    comments: TComment[];
}
export const ReviewsList = ({ comments }: ReviewsListProps) => (
  <ul data-testid="reviewsListContainer" className="reviews__list">
    { comments && comments.map((comment) => <ReviewItem key={comment.id} comment={comment}/>) }
  </ul>
);
