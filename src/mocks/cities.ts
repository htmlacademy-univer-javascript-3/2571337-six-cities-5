import { City } from '../constants/cities';
import { TCity } from '../types/city.types';
import { address } from 'faker';
import { TLocation } from '../types/location.types';

export const makeFakeLocation = ():TLocation => ({
  latitude: Number(address.latitude()),
  longitude: Number(address.longitude()),
  zoom: 8
});

export const makeFakeCity = ():TCity => {
  const randomIndex = Math.floor(Math.random() * Object.values(City).length);
  const randomCity = Object.values(City)[randomIndex] ?? City.Amsterdam;
  return {
    name: randomCity,
    location: makeFakeLocation()
  };
};
