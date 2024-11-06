import { ChangeEvent, Fragment, useState } from 'react';
import { COMMENT_MAX_LENGTH, COMMENT_MIN_LENGTH } from '../../constants/review-form';
import { toStringOrNumber } from '../../utils/toStringOrNumber';

const ratesTitleMap = {
  perfect: 5,
  good: 4,
  'not bad': 3,
  badly: 2,
  terribly: 1
};

const initialReviewsFormValues = {
  comment: '',
  rating: 0
};

export const ReviewsForm = () => {
  const [reviewsFormValues, setReviewsFormValues] = useState(initialReviewsFormValues);

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const key = e.target.name;
    const value = e.target.value;
    setReviewsFormValues((prev) => ({
      ...prev,
      [key]: toStringOrNumber(reviewsFormValues, key, value)
    }));
  };

  const isValid = reviewsFormValues.comment.length >= COMMENT_MIN_LENGTH && reviewsFormValues.comment.length <= COMMENT_MAX_LENGTH && reviewsFormValues.rating > 0;

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
              onChange={onChangeHandler}
              value={rate}
              checked={reviewsFormValues.rating === rate}
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
        onChange={onChangeHandler}
        placeholder="Tell how was your stay, what you like and what can be improved"
        value={reviewsFormValues.comment}
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
