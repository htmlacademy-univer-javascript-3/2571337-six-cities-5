import { ChangeEvent, Fragment, useState } from 'react';

const rates = new Array(5).fill('').map((_, index) => index + 1).reverse();

export const ReviewsForm = () => {
  const [review, setReview] = useState({
    comment: '',
    rating: 0
  });

  const changeFormValues = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setReview((prev) => ({
      ...prev,
      [name]: typeof prev[name as keyof typeof prev] === 'number' ? Number(value) : value
    }));
  };

  const isValid = review.comment.length >= 50 && review.comment.length <= 300 && review.rating > 0;

  return (
    <form className="reviews__form form" action="#" method="post">
      <label className="reviews__label form__label" htmlFor="review">
    Your review
      </label>
      <div className="reviews__rating-form form__rating">
        { rates.map((rate) => (
          <Fragment key={rate}>
            <input
              className="form__rating-input visually-hidden"
              name="rating"
              onChange={changeFormValues}
              value={rate}
              id={`${rate}-stars`}
              type="radio"
            />
            <label
              htmlFor={`${rate}-stars`}
              className="reviews__rating-label form__rating-label"
              title="perfect"
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
        onChange={changeFormValues}
        placeholder="Tell how was your stay, what you like and what can be improved"
        value={review.comment}
      />
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
      To submit review please make sure to set
          <span className="reviews__star">rating</span> and describe your stay with
      at least <b className="reviews__text-amount">50 characters</b>.
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
