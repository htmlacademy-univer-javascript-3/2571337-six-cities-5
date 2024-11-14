import { JSX, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { ReviewForm } from '../../components/review-form';
import { ReviewsList } from '../../components/reviews-list';
import { Map } from '../../components/map';
import { OffersList } from '../../components/offers-list';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchNearbyOffers, fetchOffer } from '../../store/offers-process/api-actions';
import { fetchComments } from '../../store/comments-process/api-actions';
import { Spinner } from '../../components/spinner';
import { OfferGallery } from './components/offer-gallery';
import { OfferGoods } from './components/offer-goods';
import { OfferHost } from './components/offer-host';
import { stringWithPluralRule } from '../../utils/string-with-plural-rule';
import { AuthStatus } from '../../constants/user';
import { clearOffer } from '../../store/offers-process/offers-reducer';
import { OfferPremiumMark } from '../../components/offer-premium-mark';
import { ButtonToBookmark } from '../../components/button-to-bookmark';
import { OfferRating } from '../../components/offer-rating';
import { selectAuthStatus } from '../../store/user-process/selectors';
import { selectNearbyOffers, selectOffer } from '../../store/offers-process/selectors';
import { selectFilteredComments } from '../../store/comments-process/selectors';

export function OfferPage():JSX.Element {
  const {offerId} = useParams();
  const dispatch = useAppDispatch();
  const { authStatus } = useAppSelector(selectAuthStatus);
  const { nearbyOffers } = useAppSelector(selectNearbyOffers);
  const { offer } = useAppSelector(selectOffer);
  const { commentsLength, filteredComments } = useAppSelector(selectFilteredComments);

  const nearbyOffersOnMap = useMemo(
    () => offer
      ? [...nearbyOffers.slice(0, 3), offer]
      : []
    , [nearbyOffers, offer]);

  useEffect(() => () => {
    dispatch(clearOffer());
  }, [dispatch]);

  useEffect(() => {
    if (offerId){
      dispatch(fetchOffer(offerId));
      dispatch(fetchNearbyOffers(offerId));
      dispatch(fetchComments(offerId));
    }
  }, [dispatch, offerId]);

  if (!offer) {
    return <Spinner/>;
  }

  return (
    <main className="page__main page__main--offer">
      <section className="offer">
        <OfferGallery images={offer.images}/>
        <div className="offer__container container">
          <div className="offer__wrapper">
            <OfferPremiumMark className="offer__mark" isPremium={offer.isPremium} />
            <div className="offer__name-wrapper">
              <h1 className="offer__name">
                { offer.title }
              </h1>
              <ButtonToBookmark
                block="offer__bookmark"
                isFavorite={offer.isFavorite}
                size="big"
              />
            </div>
            <OfferRating
              block="offer"
              rating={offer.rating}
              renderValue
            />
            <ul className="offer__features">
              <li className="offer__feature offer__feature--entire">{offer.type}</li>
              <li className="offer__feature offer__feature--bedrooms">
                {stringWithPluralRule('Bedroom', offer.bedrooms)}
              </li>
              <li className="offer__feature offer__feature--adults">
              Max {stringWithPluralRule('adult', offer.maxAdults)}
              </li>
            </ul>
            <div className="offer__price">
              <b className="offer__price-value">€{offer.price}</b>
              <span className="offer__price-text">&nbsp;night</span>
            </div>
            <OfferGoods goods={offer.goods}/>
            <OfferHost host={offer.host} description={offer.description}/>
            <section className="offer__reviews reviews">
              <h2 className="reviews__title">
                  Reviews · <span className="reviews__amount">{commentsLength}</span>
              </h2>
              <ReviewsList comments={filteredComments}/>
              {
                authStatus === AuthStatus.Authorized && <ReviewForm offerId={offer.id} />
              }
            </section>
          </div>
        </div>
        <section className="offer__map map">
          {
            nearbyOffersOnMap.length > 0 &&
              <Map
                city={offer.city}
                offers={nearbyOffersOnMap}
                activeOffer={offer.id}
              />
          }
        </section>
      </section>
      <div className="container">
        <section className="near-places places">
          <h2 className="near-places__title">
          Other places in the neighbourhood
          </h2>
          <OffersList
            block='near-places'
            className='near-places__list'
            offers={nearbyOffers}
          />
        </section>
      </div>
    </main>
  );
}
