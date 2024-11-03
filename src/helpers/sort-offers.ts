import { SortingVariant } from '../constants/sorting-variants';
import { CommonOffer } from '../types/offer.types';

export function sortOffers(sortVariant: SortingVariant, offers: CommonOffer[]) {
  switch (sortVariant) {
    case SortingVariant.Popular: {
      return offers.slice();
    }
    case SortingVariant.PriceFromHighToLow: {
      return offers.toSorted((prevOffer, nextOffer) => nextOffer.price - prevOffer.price);
    }
    case SortingVariant.PriceFromLowToHigh: {
      return offers.toSorted((prevOffer, nextOffer) => prevOffer.price - nextOffer.price);
    }
    case SortingVariant.TopRatedFirst: {
      return offers.toSorted((prevOffer, nextOffer) => nextOffer.rating - prevOffer.rating);
    }
    default: {
      return offers;
    }
  }
}
