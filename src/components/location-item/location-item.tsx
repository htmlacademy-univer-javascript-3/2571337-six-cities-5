import { Link } from 'react-router-dom';
import { useAppSelector } from '../../store/hooks';

import cn from 'classnames';
import { City } from '../../constants/cities';
import { selectCityName } from '../../store/offers-process/selectors';


type LocationItemProps = {
    city: City;
    onClick: () => void;
}

export const LocationItem = ({ city, onClick }: LocationItemProps) => {
  const {cityName} = useAppSelector(selectCityName);

  return (
    <li className="locations__item">
      <Link
        onClick={onClick}
        className={cn('locations__item-link tabs__item', {'tabs__item--active': cityName === city})}
        to="#"
      >
        <span>{city}</span>
      </Link>
    </li>
  );
};
