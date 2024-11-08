import { JSX } from 'react';
import { CommonOffer } from '../../types/offer.types';
import { Link } from 'react-router-dom';
import { capitalize } from '../../utils/capitalize';

type TImageSize = 'small' | 'large';
const imageSizeMap: Record<TImageSize, { width: number; height: number }> = {
  large: {
    height: 200,
    width: 260
  },
  small: {
    width: 150,
    height: 110
  }
};

interface OfferCardProps {
  offer: CommonOffer;
  imageSize: TImageSize;
  block: string;
  onActiveOfferHandler?: (id: CommonOffer['id'] | null) => void;
}

export function OfferCard({ offer, onActiveOfferHandler, imageSize, block }: OfferCardProps):JSX.Element {
  const { isPremium, previewImage, price, rating, isFavorite, title, type, id } = offer;

  const onMouseEnterHandler = () => {
    onActiveOfferHandler?.(id);
  };

  const onMouseLeaveHandler = () => {
    onActiveOfferHandler?.(null);
  };


  return (
    <article
      className={`${block}__card place-card`}
      onMouseEnter={onMouseEnterHandler}
      onMouseLeave={onMouseLeaveHandler}
    >
      {
        isPremium &&
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      }
      <div className={`${block}__image-wrapper place-card__image-wrapper`}>
        <Link to="#">
          <img
            className="place-card__image"
            src={previewImage}
            {...imageSizeMap[imageSize]}
            alt="Place image"
          />
        </Link>
      </div>
      <div className={`${block}__card-info place-card__info`}>
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">€{price}</b>
            <span className="place-card__price-text">/&nbsp;night</span>
          </div>
          <button
            className={`place-card__bookmark-button ${isFavorite && 'place-card__bookmark-button--active'} button`}
            type="button"
          >
            <svg
              className="place-card__bookmark-icon"
              width={18}
              height={19}
            >
              <use xlinkHref="#icon-bookmark" />
            </svg>
            <span className="visually-hidden">To bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: `${20 * Math.ceil(rating)}%` }} />
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`/offer/${id}`}>
            {title}
          </Link>
        </h2>
        <p className="place-card__type">{capitalize(type)}</p>
      </div>
    </article>
  );
}
