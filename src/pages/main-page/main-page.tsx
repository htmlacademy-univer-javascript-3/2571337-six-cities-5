import { JSX, useMemo } from 'react';
import { OffersList } from '../../components/offers-list';
import { Header } from '../../components/header';
import { Map } from '../../components/map';
import { TCity } from '../../types/city.types';
import { useActiveOffer } from '../../hooks/use-active-offer';
import cn from 'classnames';
import { City } from '../../constants/cities';
import { useAppSelector } from '../../store/hooks';
import { LocationsList } from '../../components/locations-list';
import { SortingVariants } from '../../components/sorting-variants';
import { sortOffers } from '../../helpers/sort-offers';
import { Suspense } from '../../components/suspense';

interface MainPageProps {
  city: TCity;
}

export function MainPage({ city }: MainPageProps):JSX.Element {
  const { activeOffer, onActiveOfferHandler } = useActiveOffer();
  const {
    cityName,
    offers,
    sortingVariant,
    isLoading
  } = useAppSelector((state) => state.offers);

  const curentOffers = useMemo(() =>
    sortOffers(
      sortingVariant,
      offers.filter(({ city: { name } }) => name === cityName)
    ), [offers, cityName, sortingVariant]);

  return (
    <div className="page page--gray page--main">
      <Header/>
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <LocationsList cities={Object.values(City)}/>
          </section>
        </div>
        <div className="cities">
          <Suspense isLoading={isLoading}>
            <div className="cities__places-container container">
              <section className="cities__places places">
                <h2 className="visually-hidden">Places</h2>
                <b className="places__found">{curentOffers.length} places to stay in { cityName }</b>
                <SortingVariants/>
                <OffersList
                  block='cities'
                  className={cn('cities__places-list', 'tabs__content')}
                  onActiveOfferHandler={onActiveOfferHandler}
                  offers={curentOffers}
                />
              </section>
              <div className="cities__right-section">
                <Map className='cities__map' city={city} offers={curentOffers} activeOffer={activeOffer}/>
              </div>
            </div>
          </Suspense>
        </div>
      </main>
    </div>
  );
}
