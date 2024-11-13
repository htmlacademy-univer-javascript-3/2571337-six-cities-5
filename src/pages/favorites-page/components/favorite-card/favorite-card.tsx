import { Link } from 'react-router-dom';
import { CommonOffer } from '../../../../types/offer.types';
import { OfferCard } from '../../../../components/offer-card';

type FavoriteCardProps = {
    cityName: string;
    offersInCity: CommonOffer[];
}
export const FavoriteCard = ({ cityName, offersInCity }: FavoriteCardProps) => (
  <li className="favorites__locations-items">
    <div className="favorites__locations locations locations--current">
      <div className="locations__item">
        <Link className="locations__item-link" to="#">
          <span>{cityName}</span>
        </Link>
      </div>
    </div>
    <div className="favorites__places">
      { offersInCity.map((offer) => <OfferCard offer={offer} key={offer.id} block='favorites' imageSize='small'/>) }
    </div>
  </li>
);
