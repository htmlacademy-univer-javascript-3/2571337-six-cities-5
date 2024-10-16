import { TCity } from './city.types';
import { TLocation } from './location.types';
import { TUser } from './user.types';

export enum PlaceType {
    APARTMENT = 'apartment',
    ROOM = 'room',
    HOUSE = 'house',
    HOTEL = 'hotel'
}

type Rate = 0 | 1 | 2 | 3 | 4 | 5;

export type CommonOffer = {
    id: string;
    title: string;
    type: PlaceType;
    price: number;
    city: TCity;
    location: TLocation;
    isFavorite: boolean;
    isPremium: boolean;
    rating: Rate;
    previewImage: string;
}

export type Offer = {
    description: string;
    bedrooms: number;
    goods: string[];
    host: TUser;
    images: string[];
    maxAdults: number;
} & Omit<CommonOffer, 'previewImage'>;
