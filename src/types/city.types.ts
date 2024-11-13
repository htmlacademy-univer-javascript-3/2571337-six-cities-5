import { City } from '../constants/cities';
import { TLocation } from './location.types';

export type TCity = {
    name: City;
    location: TLocation;
}
