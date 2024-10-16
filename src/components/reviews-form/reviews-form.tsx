import { ChangeEvent, Fragment, useState } from 'react';
import { COMMENT_MAX_LENGTH, COMMENT_MIN_LENGTH } from '../../constants/review-form';

const ratesTitleMap = {
  perfect: 5,
  good: 4,
  'not bad': 3,
  badly: 2,
  terribly: 1
};

export const ReviewsForm = () => {
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(0);

  const onChangeComment = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };

  const onChangeRating = (e: ChangeEvent<HTMLInputElement>) => {
    setRating(Number(e.target.value));
  };

  const isValid = comment.length >= COMMENT_MIN_LENGTH && comment.length <= COMMENT_MAX_LENGTH && rating > 0;

  return (
    <form className="reviews__form form" action="#" method="post">
      <label className="reviews__label form__label" htmlFor="review">
    Your review
      </label>
      <div className="reviews__rating-form form__rating">
        { Object.entries(ratesTitleMap).map(([title, rate]) => (
          <Fragment key={rate}>
            <input
              className="form__rating-input visually-hidden"
              name="rating"
              onChange={onChangeRating}
              value={rate}
              checked={rating === rate}
              id={`${rate}-stars`}
              type="radio"
            />
            <label
              htmlFor={`${rate}-stars`}
              className="reviews__rating-label form__rating-label"
              title={title}
            >
              <svg className="form__star-image" width={37} height={33}>
                <use xlinkHref="#icon-star" />
              </svg>
            </label>
          </Fragment>
        ))}
      </div>
      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="comment"
        onChange={onChangeComment}
        placeholder="Tell how was your stay, what you like and what can be improved"
        value={comment}
      />
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
      To submit review please make sure to set
          <span className="reviews__star">rating</span> and describe your stay with
      at least <b className="reviews__text-amount">{COMMENT_MIN_LENGTH} characters</b>.
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={!isValid}
        >
      Submit
        </button>
      </div>
    </form>

  );
};
