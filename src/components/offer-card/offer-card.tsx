import { JSX } from 'react';
import { CommonOffer } from '../../types/offer.types';
import { Link } from 'react-router-dom';
import { capitalize } from '../../utils/capitalize';
import { OfferPremiumMark } from '../offer-premium-mark';
import { ButtonToBookmark } from '../button-to-bookmark';
import { OfferRating } from '../offer-rating';

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
  onMouseEnterHandler?: (params: {idOffer: CommonOffer['id']}) => void;
  onMouseLeaveHandler?: () => void;
}

export function OfferCard({ offer, imageSize, block, onMouseEnterHandler, onMouseLeaveHandler }: OfferCardProps):JSX.Element {
  const { isPremium, previewImage, price, rating, isFavorite, title, type, id } = offer;

  return (
    <article
      className={`${block}__card place-card`}
      onMouseEnter={() => onMouseEnterHandler?.({ idOffer: id })}
      onMouseLeave={onMouseLeaveHandler}
    >
      <OfferPremiumMark className="place-card__mark" isPremium={isPremium} />
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
          <ButtonToBookmark
            block="place-card__bookmark"
            isFavorite={isFavorite}
            size="small"
          />
        </div>
        <OfferRating
          block="place-card"
          rating={rating}
        />
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
