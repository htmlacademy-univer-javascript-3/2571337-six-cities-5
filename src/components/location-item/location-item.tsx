import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { changeCityName } from '../../store/action';

import cn from 'classnames';
import { City } from '../../constants/cities';


type LocationItemProps = {
    city: City;
}

export const LocationItem = ({ city }: LocationItemProps) => {
  const cityName = useAppSelector((state) => state.offers.cityName);
  const dispatch = useAppDispatch();

  const clickCityHandler = () => dispatch(changeCityName(city));

  return (
    <li className="locations__item">
      <Link
        onClick={clickCityHandler}
        className={cn('locations__item-link tabs__item', {'tabs__item--active': cityName === city})}
        to="#"
      >
        <span>{city}</span>
      </Link>
    </li>
  );
};
