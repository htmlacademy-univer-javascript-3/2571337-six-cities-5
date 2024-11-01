import { JSX } from 'react';
import { OffersList } from '../../components/offers-list';
import { Header } from '../../components/header';
import { Map } from '../../components/map';
import { TCity } from '../../types/city.types';
import { useActiveOffer } from '../../hooks/use-active-offer';
import cn from 'classnames';
import { City } from '../../constants/cities';
import { useAppSelector } from '../../store/hooks';
import { LocationsList } from '../../components/locations-list';

interface MainPageProps {
  city: TCity;
}

export function MainPage({ city }: MainPageProps):JSX.Element {
  const { activeOffer, onActiveOfferHandler } = useActiveOffer();
  const { cityName, offers } = useAppSelector((state) => state.offers);
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
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{offers.filter(({ city: { name } }) => name === cityName).length} places to stay in { cityName }</b>
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
                onActiveOfferHandler={onActiveOfferHandler}
                offers={offers.filter(({ city: { name } }) => name === cityName)}
              />
            </section>
            <div className="cities__right-section">
              <Map className='cities__map' city={city} offers={offers} activeOffer={activeOffer}/>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
