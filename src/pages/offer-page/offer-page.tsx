import { JSX, useEffect } from 'react';
import { Header } from '../../components/header';
import { useParams } from 'react-router-dom';
import { ReviewForm } from '../../components/review-form';
import { ReviewsList } from '../../components/reviews-list';
import { Map } from '../../components/map';
import { OffersList } from '../../components/offers-list';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchComments, fetchNearbyOffers, fetchOffer } from '../../store/api-action';
import { Spinner } from '../../components/spinner';
import { OfferGallery } from './components/offer-gallery';
import cn from 'classnames';
import { OfferGoods } from './components/offer-goods';
import { OfferHost } from './components/offer-host';
import { stringWithPluralRule } from '../../utils/string-with-plural-rule';
import { sortByDate } from '../../utils/sort-by-date';
import { AuthStatus } from '../../constants/user';

export function OfferPage():JSX.Element {
  const {offerId} = useParams();
  const dispatch = useAppDispatch();
  const {offer, nearbyOffers, comments, authStatus} = useAppSelector((state) => ({
    offer: state.offers.offer,
    nearbyOffers: state.offers.nearbyOffers,
    comments: state.comments.comments,
    authStatus: state.user.authorizationStatus
  }));

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
    <div className="page">
      <Header/>
      <main className="page__main page__main--offer">
        <section className="offer">
          <OfferGallery images={offer.images}/>
          <div className="offer__container container">
            <div className="offer__wrapper">
              {
                offer.isPremium &&
                <div className="offer__mark">
                  <span>Premium</span>
                </div>
              }
              <div className="offer__name-wrapper">
                <h1 className="offer__name">
                  { offer.title }
                </h1>
                <button
                  className={cn('offer__bookmark-button button', {['offer__bookmark-button--active']: offer.isFavorite})}
                  type="button"
                >
                  <svg className="offer__bookmark-icon" width={31} height={33}>
                    <use xlinkHref="#icon-bookmark" />
                  </svg>
                  <span className="visually-hidden">To bookmarks</span>
                </button>
              </div>
              <div className="offer__rating rating">
                <div className="offer__stars rating__stars">
                  <span style={{ width: `${20 * Math.ceil(offer.rating)}%` }} />
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="offer__rating-value rating__value">{offer.rating}</span>
              </div>
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
                  Reviews · <span className="reviews__amount">{comments.length}</span>
                </h2>
                <ReviewsList comments={sortByDate(comments.slice(0, 10), 'date')}/>
                {
                  authStatus === AuthStatus.Authorized && <ReviewForm offerId={offer.id} />
                }
              </section>
            </div>
          </div>
          <Map
            className='offer__map'
            city={offer.city}
            offers={[...nearbyOffers.slice(0, 3), offer]}
            activeOffer={offer.id}
          />
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
    </div>
  );
}
