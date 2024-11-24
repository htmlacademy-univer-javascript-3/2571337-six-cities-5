import { CommonOffer, Offer, PlaceType } from '../types/offer.types';
import { makeFakeCity, makeFakeLocation } from './cities';
import {finance, datatype } from 'faker';
import { makeFakeImageWithoutSizes, makeFakePreviewImageWithSize } from './images';
import { SortingVariant } from '../constants/sorting-variants';
import { makeFakeUser } from './users';

export const makeFakeOfferType = () => {
  const randomIndex = Math.floor(Math.random() * Object.values(PlaceType).length);
  const randomPlaceType = Object.values(PlaceType).find((_placeType, index) => (index === randomIndex)) ?? PlaceType.Apartment;
  return randomPlaceType;
};

export const makeFakeSortingVariant = ():SortingVariant => {
  const randomIndex = Math.floor(Math.random() * Object.values(SortingVariant).length);
  const randomSortingVariant = Object.values(SortingVariant)[randomIndex] ?? SortingVariant.Popular;
  return randomSortingVariant;
};

export const makeFakeCommonOffer = (offer?: CommonOffer | Offer):CommonOffer => ({
  id: offer?.id ?? String(datatype.uuid()),
  city: offer?.city ?? makeFakeCity(),
  isFavorite: offer?.isFavorite ?? datatype.boolean(),
  isPremium: offer?.isPremium ?? datatype.boolean(),
  location: offer?.location ?? makeFakeLocation(),
  previewImage: offer?.previewImage ?? makeFakePreviewImageWithSize(),
  price: offer?.price ?? +finance.amount(),
  rating: offer?.rating ?? datatype.number({ min: 1, max: 5 }),
  title: offer?.title ?? datatype.string(),
  type: offer?.type ?? makeFakeOfferType()
});

export const makeFakeOffer = ():Offer => ({
  id: String(datatype.uuid()),
  city: makeFakeCity(),
  isFavorite: datatype.boolean(),
  isPremium: datatype.boolean(),
  location: makeFakeLocation(),
  previewImage: makeFakePreviewImageWithSize(),
  price: +finance.amount(),
  rating: datatype.number({ min: 1, max: 5 }),
  title: datatype.string(),
  type: makeFakeOfferType(),
  bedrooms: datatype.number({ min: 0 }),
  description: datatype.string(),
  goods: datatype.array(7).map((el) => String(el)),
  maxAdults: datatype.number({ min: 0 }),
  host: makeFakeUser(),
  images: datatype.array(7).map(() => String(makeFakeImageWithoutSizes()))
});
