import { CommonOffer } from '../../types/offer.types';
import { OfferCard } from '../offer-card';

type FavoriteCardProps = {
    cityName: string;
    offersInCity: CommonOffer[];
}
export const FavoriteCard = ({ cityName, offersInCity }: FavoriteCardProps) => (
  <li className="favorites__locations-items">
    <div className="favorites__locations locations locations--current">
      <div className="locations__item">
        <a className="locations__item-link" href="#">
          <span>{cityName}</span>
        </a>
      </div>
    </div>
    <div className="favorites__places">
      { offersInCity.map((offer) => <OfferCard offer={offer} key={offer.id} block='favorites' imageSize='small'/>) }
    </div>
  </li>
);
