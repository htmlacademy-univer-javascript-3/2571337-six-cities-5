import { City } from '../../constants/cities';
import { useAppDispatch } from '../../store/hooks';
import { changeCityName } from '../../store/offers-process/offers-reducer';
import { LocationItem } from '../location-item';

type LocationsListProps = {
    cities: City[];
}

export const LocationsList = ({ cities }: LocationsListProps) => {
  const dispatch = useAppDispatch();

  const onClickCityHandler = (city: City) => dispatch(changeCityName(city));

  return (
    <ul className="locations__list tabs__list">
      { cities.map((cityItem) => <LocationItem key={cityItem} onClick={() => onClickCityHandler(cityItem)} city={cityItem}/>) }
    </ul>
  );
};
