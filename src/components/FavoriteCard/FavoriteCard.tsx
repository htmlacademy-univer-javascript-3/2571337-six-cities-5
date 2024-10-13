import { CommonOffer } from '../../types/offer';
import { OfferCard } from '../OfferCard';

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
