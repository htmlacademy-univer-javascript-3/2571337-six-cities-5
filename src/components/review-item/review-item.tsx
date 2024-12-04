import { TComment } from '../../types/comment.types';
import { convertDateToString } from '../../utils/convert-date-to-string';
import { OfferRating } from '../offer-rating';

type ReviewItemProps = {
    comment: TComment;
}

export const ReviewItem = ({ comment }: ReviewItemProps) => (
  <li className="reviews__item">
    <div className="reviews__user user">
      <div className="reviews__avatar-wrapper user__avatar-wrapper">
        <img
          className="reviews__avatar user__avatar"
          src={comment.user.avatarUrl}
          width={54}
          height={54}
          alt="Reviews avatar"
        />
      </div>
      <span className="reviews__user-name">{comment.user.name}</span>
    </div>
    <div className="reviews__info">
      <OfferRating
        block='reviews'
        rating={comment.rating}
      />
      <p className="reviews__text">
        { comment.comment }
      </p>
      <time data-testid="timeElement" className="reviews__time" dateTime={convertDateToString(comment.date, 'YYYYMMDD')}>
        { convertDateToString(comment.date, 'MMMMYYYY') }
      </time>
    </div>
  </li>
);
