import { ChangeEvent, FormEvent, Fragment, useEffect, useState } from 'react';
import { COMMENT_MAX_LENGTH, COMMENT_MIN_LENGTH } from '../../constants/review-form';
import { toStringOrNumber } from '../../utils/to-string-or-number';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { CommonOffer } from '../../types/offer.types';
import { addCommentFx } from '../../store/comments-process/api-actions';
import { selectError, selectLoadingState } from '../../store/comments-process/selectors';
import { clearError } from '../../store/comments-process/comments-reducer';
import { showErrorMessage } from '../../helpers/error-message';

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

type ReviewFormProps = {
  offerId: CommonOffer['id'];
}

export const ReviewForm = ({ offerId }: ReviewFormProps) => {
  const [reviewsFormValues, setReviewsFormValues] = useState(initialReviewsFormValues);
  const { isLoading } = useAppSelector(selectLoadingState);
  const { errorMessage } = useAppSelector(selectError);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

  useEffect(() => {
    if (!isLoading && !errorMessage) {
      setReviewsFormValues(initialReviewsFormValues);
      dispatch(clearError());
    }
    if (!isLoading && errorMessage) {
      showErrorMessage(errorMessage);
    }
  }, [errorMessage, isLoading, dispatch]);

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const key = e.target.name;
    const value = e.target.value;
    setReviewsFormValues((prev) => ({
      ...prev,
      [key]: toStringOrNumber(reviewsFormValues, key, value)
    }));
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(addCommentFx({ offerId, commentData: reviewsFormValues }));

  };

  const isValid = reviewsFormValues.comment.length >= COMMENT_MIN_LENGTH && reviewsFormValues.comment.length <= COMMENT_MAX_LENGTH && reviewsFormValues.rating > 0;

  return (
    <form className="reviews__form form" onSubmit={onSubmit} method="post">
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
              disabled={isLoading}
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
        disabled={isLoading}
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
          disabled={!isValid || isLoading}
        >
      Submit
        </button>
      </div>
    </form>

  );
};
