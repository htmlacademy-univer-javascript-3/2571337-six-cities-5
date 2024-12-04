import { FavoriteOfferStatus } from '../constants/offers';
import { TCity } from './city.types';
import { TLocation } from './location.types';
import { TUser } from './user.types';

export enum PlaceType {
    Apartment = 'apartment',
    Room = 'room',
    House = 'house',
    Hotel = 'hotel'
}

type Rate = number;

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
    previewImage?: string;
} & Omit<CommonOffer, 'previewImage'>;

export type SetFavoriteOfferStatusParams = {
    status: FavoriteOfferStatus;
    offerId: CommonOffer['id'];
}
