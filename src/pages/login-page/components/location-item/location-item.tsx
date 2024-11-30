import { Link } from 'react-router-dom';
import { City } from '../../../../constants/cities';
import { AppRoute } from '../../../../constants/routes';
import { useAppDispatch } from '../../../../store/hooks';
import { changeCityName } from '../../../../store/offers-process/offers-reducer';

export const LocationItem = () => {
  const randomIndex = Math.floor(Math.random() * Object.values(City).length);
  const randomCity = Object.values(City).find((_city, index) => (index === randomIndex)) ?? City.Amsterdam;
  const dispatch = useAppDispatch();

  const handleLocationItemClick = () => {
    dispatch(changeCityName(randomCity));
  };

  return (
    <div className="locations__item">
      <Link onClick={handleLocationItemClick} className="locations__item-link" to={AppRoute.Main}>
        <span data-testid="randomCityElement">{randomCity}</span>
      </Link>
    </div>
  );
};
