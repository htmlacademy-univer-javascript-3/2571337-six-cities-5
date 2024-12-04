import { JSX, useMemo } from 'react';
import { CommonOffer } from '../../types/offer.types';
import { FavoriteCard } from './components/favorite-card';
import { Footer } from './components/footer';
import { useAppSelector } from '../../store/hooks';
import { selectFavoriteOffers } from '../../store/offers-process/selectors';
import cn from 'classnames';
import { StubEmptyFavoritesView } from './components/stub-empty-favorites-view';

export function FavoritesPage(): JSX.Element {
  const offers = useAppSelector(selectFavoriteOffers);

  const citiesOffers = useMemo(() => {
    const map = new Map<string, CommonOffer[]>();
    for (const offer of offers) {
      const key = offer.city.name;
      const mapItem = map.get(key);
      if (mapItem) {
        mapItem.push(offer);
      } else {
        map.set(key, [offer]);
      }
    }
    return map;
  }, [offers]);

  return (
    <>
      <main className={cn('page__main page__main--favorites', { 'page__main--favorites-empty': !offers || offers.length === 0 })}>
        <div className="page__favorites-container container">
          <section className={cn('favorites', { 'favorites--empty': !offers || offers.length === 0 })}>
            {
              !offers || offers.length === 0
                ? <StubEmptyFavoritesView/>
                :
                <>
                  <h1 className="favorites__title">Saved listing</h1>
                  <ul className="favorites__list">
                    { Array.from(citiesOffers).map(([cityName, offersInCity]) => (
                      <FavoriteCard
                        key={cityName}
                        cityName={cityName}
                        offersInCity={offersInCity}
                      />)
                    )}
                  </ul>
                </>
            }

          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
