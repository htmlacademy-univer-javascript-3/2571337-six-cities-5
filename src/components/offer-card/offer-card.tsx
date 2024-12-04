import { CommonOffer } from '../../types/offer.types';
import { Link } from 'react-router-dom';
import { capitalize } from '../../utils/capitalize';
import { OfferPremiumMark } from '../offer-premium-mark';
import { ButtonToBookmark } from '../button-to-bookmark';
import { OfferRating } from '../offer-rating';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setFavoriteOfferStatus } from '../../store/offers-process/api-actions';
import { FavoriteOfferStatus } from '../../constants/offers';
import { selectAuthStatus } from '../../store/user-process/selectors';
import { AuthStatus } from '../../constants/user';
import { redirectToRoute } from '../../store/action';
import { AppRoute } from '../../constants/routes';
import { memo } from 'react';

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

const OfferCard = ({ offer, imageSize, block, onMouseEnterHandler, onMouseLeaveHandler }: OfferCardProps) => {
  const dispatch = useAppDispatch();
  const authStatus = useAppSelector(selectAuthStatus);
  const { isPremium, previewImage, price, rating, isFavorite, title, type, id } = offer;

  const onClickToBookmark = () => {
    if (authStatus !== AuthStatus.Authorized) {
      dispatch(redirectToRoute(AppRoute.Login));
    } else {
      dispatch(setFavoriteOfferStatus({
        offerId: id,
        status: isFavorite ? FavoriteOfferStatus.NotFavorite : FavoriteOfferStatus.Favorite
      }));
    }
  };

  const handleOfferCardMouseEnter = () => onMouseEnterHandler?.({ idOffer: id });
  const handleOfferCardMouseLeave = () => onMouseLeaveHandler?.();

  return (
    <article
      data-testid="articleOfferCard"
      className={`${block}__card place-card`}
      onMouseEnter={handleOfferCardMouseEnter}
      onMouseLeave={handleOfferCardMouseLeave}
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
            onClick={onClickToBookmark}
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
};

export const MemoOfferCard = memo(OfferCard);
