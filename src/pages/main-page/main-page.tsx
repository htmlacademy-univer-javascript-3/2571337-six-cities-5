import { JSX } from 'react';
import { CommonOffer } from '../../types/offer.types';
import { OffersList } from '../../components/offers-list';
import { Header } from '../../components/header';
import { cities } from '../../mocks/cities';
import { LocationItem } from '../../components/location-item';
import { Map } from '../../components/map';
import { TCity } from '../../types/city.types';
import { useSelectedOffer } from '../../hooks/use-selected-offer';
import cn from 'classnames';

interface MainPageProps {
  offers: CommonOffer[];
  city: TCity;
}

export function MainPage({ offers, city }: MainPageProps):JSX.Element {
  const { hoveredOfferHandler, selectedOffer } = useSelectedOffer();
  return (
    <div className="page page--gray page--main">
      <Header/>
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <ul className="locations__list tabs__list">
              { cities.map((cityItem) => <LocationItem key={cityItem} city={cityItem}/>) }
            </ul>
          </section>
        </div>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{offers.length} places to stay in Amsterdam</b>
              <form className="places__sorting" action="#" method="get">
                <span className="places__sorting-caption">Sort by</span>
                <span className="places__sorting-type" tabIndex={0}>
              Popular
                  <svg className="places__sorting-arrow" width={7} height={4}>
                    <use xlinkHref="#icon-arrow-select" />
                  </svg>
                </span>
                <ul className="places__options places__options--custom places__options--opened">
                  <li
                    className="places__option places__option--active"
                    tabIndex={0}
                  >
                Popular
                  </li>
                  <li className="places__option" tabIndex={0}>
                Price: low to high
                  </li>
                  <li className="places__option" tabIndex={0}>
                Price: high to low
                  </li>
                  <li className="places__option" tabIndex={0}>
                Top rated first
                  </li>
                </ul>
              </form>
              <OffersList
                block='cities'
                className={cn('cities__places-list', 'tabs__content')}
                onListOfferHover={hoveredOfferHandler}
                offers={offers}
              />
            </section>
            <div className="cities__right-section">
              <Map className='cities__map' city={city} offers={offers} selectedOffer={selectedOffer}/>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
