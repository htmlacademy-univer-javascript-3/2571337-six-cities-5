import { makeFakeCity } from '../../mocks/cities';
import { makeFakeCommonOffer, makeFakeOffer, makeFakeSortingVariant } from '../../mocks/offers';
import { TState } from '../../types/state.types';
import { datatype } from 'faker';
import { selectCityName, selectFavoriteOffers, selectFilteredByCityOffers, selectIsLoading, selectNearbyOffers, selectOffer, selectOffers, selectSortingVariant } from './selectors';
import { sortOffers } from '../../helpers/sort-offers';

describe('Test offers selectors', () => {
  const state: Pick<TState, 'offers'> = {
    offers: {
      cityName: makeFakeCity().name,
      favoriteOffers: Array(6).fill('').map(() => makeFakeCommonOffer()),
      isLoading: datatype.boolean(),
      nearbyOffers: Array(6).fill('').map(() => makeFakeCommonOffer()),
      offers: Array(6).fill('').map(() => makeFakeCommonOffer()),
      sortingVariant: makeFakeSortingVariant(),
      offer: makeFakeOffer()
    }
  };

  it('Test selectOffers. Should return the same offers', () => {
    const result = selectOffers(state);

    expect(result).toEqual(state.offers.offers);
  });

  it('Test selectCityName. Should return the same cityName', () => {
    const result = selectCityName(state);

    expect(result).toBe(state.offers.cityName);
  });

  it('Test selectSortingVariant. Should return the same sortingVariant', () => {
    const result = selectSortingVariant(state);

    expect(result).toBe(state.offers.sortingVariant);
  });

  it('Test selectIsLoading. Should return the same isLoading', () => {
    const result = selectIsLoading(state);

    expect(result).toBe(state.offers.isLoading);
  });

  it('Test selectNearbyOffers. Should return the same nearbyOffers', () => {
    const result = selectNearbyOffers(state);

    expect(result).toEqual(state.offers.nearbyOffers);
  });

  it('Test selectOffer. Should return the same offer', () => {
    const result = selectOffer(state);

    expect(result).toEqual(state.offers.offer);
  });

  it('Test selectFavoriteOffers. Should return the same favoriteOffers', () => {
    const result = selectFavoriteOffers(state);

    expect(result).toEqual(state.offers.favoriteOffers);
  });

  it('Test selectFilteredByCityOffers. Should return filtered by city and sorted by sortVariant offers', () => {
    const expectedOffers = sortOffers(
      state.offers.sortingVariant,
      state.offers.offers.filter(({ city: { name } }) => name === state.offers.cityName)
    );

    const result = selectFilteredByCityOffers(state);

    expect(result.filteredOffers).toEqual(expectedOffers);
  });
});
