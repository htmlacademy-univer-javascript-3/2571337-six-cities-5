import { City } from '../../constants/cities';
import { LocationItem } from '../location-item';

type LocationsListProps = {
    cities: City[];
}

export const LocationsList = ({ cities }: LocationsListProps) => (
  <ul className="locations__list tabs__list">
    { cities.map((cityItem) => <LocationItem key={cityItem} city={cityItem}/>) }
  </ul>
);
