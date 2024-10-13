import { JSX, useMemo } from 'react';
import { CommonOffer } from '../../types/offer';
import { FavoriteCard } from '../../components/FavoriteCard/FavoriteCard';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';

type FavoritesPageProps = {
  offers: CommonOffer[];
}
export function FavoritesPage({ offers }: FavoritesPageProps): JSX.Element {
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
    <div className="page">
      <Header/>
      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <ul className="favorites__list">
              { Array.from(citiesOffers).map(([cityName, offersInCity]) => <FavoriteCard key={cityName} cityName={cityName} offersInCity={offersInCity}/>) }
            </ul>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
