import { NavLink } from 'react-router-dom';

type LocationItemProps = {
    city: string;
}
export const LocationItem = ({ city }: LocationItemProps) => (
  <li className="locations__item">
    <NavLink className={({isActive}) => `locations__item-link tabs__item ${isActive && 'tabs__item--active'}`} to="#">
      <span>{city}</span>
    </NavLink>
  </li>
);
