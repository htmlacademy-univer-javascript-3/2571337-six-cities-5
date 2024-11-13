import { useMemo } from 'react';
import { useActiveOffer } from '../../../../hooks/use-active-offer';
import { useAppSelector } from '../../../../store/hooks';
import { sortOffers } from '../../../../helpers/sort-offers';
import { Suspense } from '../../../../components/suspense';
import { SortingVariants } from '../sorting-variants';
import { OffersList } from '../../../../components/offers-list';
import { Map } from '../../../../components/map';
import cn from 'classnames';

export const CitiesView = () => {
  const { activeOffer, onActiveOfferHandler } = useActiveOffer();
  const {
    cityName,
    offers,
    sortingVariant,
    isLoading
  } = useAppSelector((state) => state.offers);

  const filteredOffers = useMemo(() =>
    sortOffers(
      sortingVariant,
      offers.filter(({ city: { name } }) => name === cityName)
    ), [offers, cityName, sortingVariant]);

  return (
    <Suspense isLoading={isLoading}>
      <div className="cities">
        <div className="cities__places-container container">
          <section className="cities__places places">
            <h2 className="visually-hidden">Places</h2>
            <b className="places__found">{filteredOffers.length} places to stay in { cityName }</b>
            <SortingVariants />
            <OffersList
              block='cities'
              className={cn('cities__places-list', 'tabs__content')}
              onActiveOfferHandler={onActiveOfferHandler}
              offers={filteredOffers}
            />
          </section>
          <div className="cities__right-section">
            <section className="cities__map map">
              { filteredOffers.length > 0 && <Map key={cityName} city={filteredOffers[0].city} offers={filteredOffers} activeOffer={activeOffer}/>}
            </section>
          </div>
        </div>
      </div>
    </Suspense>
  );
};
