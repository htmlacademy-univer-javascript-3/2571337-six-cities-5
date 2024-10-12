import { JSX } from 'react';
import { CommonOffer } from '../../types/offers';
import { Link } from 'react-router-dom';

interface OfferCardProps {
  offer: CommonOffer;
  onMouseEnterHandler: (id: CommonOffer['id'] | null) => void;
}

export function OfferCard({ offer, onMouseEnterHandler }: OfferCardProps):JSX.Element {
  const { isPremium, previewImage, price, rating, isFavorite, title, type, id } = offer;

  return (
    <article
      className="cities__card place-card"
      onMouseEnter={() => onMouseEnterHandler(offer.id)}
      onMouseLeave={() => onMouseEnterHandler(null)}
    >
      {
        isPremium &&
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      }
      <div className="cities__image-wrapper place-card__image-wrapper">
        <a href="#">
          <img
            className="place-card__image"
            src={previewImage}
            width={260}
            height={200}
            alt="Place image"
          />
        </a>
      </div>
      <div className="place-card__info">
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
            <span style={{ width: `${20 * rating}%` }} />
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`/offer/${id}`}>
            {title}
          </Link>
        </h2>
        <p className="place-card__type">{type}</p>
      </div>
    </article>
  );
}
