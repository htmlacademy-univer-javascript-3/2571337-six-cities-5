import { render, screen } from '@testing-library/react';
import { withHistory, withStore } from '../../../../mocks/mocks-component';
import { makeFakeCommonOffer, makeFakeOffer, makeFakeSortingVariant } from '../../../../mocks/offers';
import { TState } from '../../../../types/state.types';
import { CityTabs } from './city-tabs';

describe('Component: CityTabs', () => {
  let initialState:Partial<TState>;
  const fakeCommonOffer = makeFakeCommonOffer();

  beforeEach(() => {
    initialState = {
      offers: {
        cityName: fakeCommonOffer.city.name,
        favoriteOffers: [makeFakeCommonOffer()],
        isLoading: false,
        nearbyOffers: [makeFakeCommonOffer()],
        offer: makeFakeOffer(),
        offers: [fakeCommonOffer],
        sortingVariant: makeFakeSortingVariant()
      },
    };
  });

  it('should render correctly', () => {
    const cityTabsSectionTestId = 'cityTabsSection';
    const componentWithHistory = withHistory(<CityTabs/>);
    const { componentWithStore: prepandedComponent } = withStore(componentWithHistory, initialState);

    render(prepandedComponent);

    expect(screen.getByTestId(cityTabsSectionTestId)).toBeInTheDocument();
  });
});
