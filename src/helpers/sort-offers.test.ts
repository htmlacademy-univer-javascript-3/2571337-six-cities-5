import { SortingVariant } from '../constants/sorting-variants';
import { makeFakeCommonOffer } from '../mocks/offers';
import { sortOffers } from './sort-offers';

describe('Test function: sortOffers', () => {

  it('should return the same offers with incorrect sort variant = [""]', () => {
    const expectedOffers = [makeFakeCommonOffer(), makeFakeCommonOffer(), makeFakeCommonOffer()];
    const result = sortOffers('' as SortingVariant, expectedOffers);
    expect(result).toEqual(expectedOffers);
  });

  it('should return the same offers with sort variant = [SortingVariant.Popular]', () => {
    const expectedOffers = [makeFakeCommonOffer(), makeFakeCommonOffer(), makeFakeCommonOffer()];
    const result = sortOffers(SortingVariant.Popular, expectedOffers);
    expect(result).toEqual(expectedOffers);
  });

  it('should return sorted offers by price from low to high with sort variant = [SortingVariant.PriceFromLowToHigh]', () => {
    const offers = [makeFakeCommonOffer(), makeFakeCommonOffer(), makeFakeCommonOffer()];
    const expectedOffers = offers.slice().sort((a, b) => a.price - b.price);
    const result = sortOffers(SortingVariant.PriceFromLowToHigh, offers);
    expect(result).toEqual(expectedOffers);
  });

  it('should return sorted offers by price from high to low with sort variant = [SortingVariant.PriceFromHighToLow]', () => {
    const offers = [makeFakeCommonOffer(), makeFakeCommonOffer(), makeFakeCommonOffer()];
    const expectedOffers = offers.slice().sort((a, b) => b.price - a.price);
    const result = sortOffers(SortingVariant.PriceFromHighToLow, offers);
    expect(result).toEqual(expectedOffers);
  });

  it('should return sorted offers by rating from top to bottom with sort variant = [SortingVariant.TopRatedFirst]', () => {
    const offers = [makeFakeCommonOffer(), makeFakeCommonOffer(), makeFakeCommonOffer()];
    const expectedOffers = offers.slice().sort((a, b) => b.rating - a.rating);
    const result = sortOffers(SortingVariant.TopRatedFirst, offers);
    expect(result).toEqual(expectedOffers);
  });
});
