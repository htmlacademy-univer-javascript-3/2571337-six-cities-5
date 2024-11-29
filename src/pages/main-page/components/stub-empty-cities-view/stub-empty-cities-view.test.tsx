import { render, screen } from '@testing-library/react';
import { SortingVariant } from '../../../../constants/sorting-variants';
import { withHistory, withStore } from '../../../../mocks/mocks-component';
import { makeFakeCommonOffer, makeFakeOffer } from '../../../../mocks/offers';
import { TState } from '../../../../types/state.types';
import { StubEmptyCitiesView } from './stub-empty-cities-view';

describe('Component: StubEmptyCitiesView', () => {
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
        sortingVariant: SortingVariant.PriceFromLowToHigh
      },
    };
    vi.clearAllMocks();
  });

  it('should render correctly', () => {
    const componentWithHistory = withHistory(<StubEmptyCitiesView />);
    const { componentWithStore: prepandedComponent } = withStore(componentWithHistory, initialState);
    const expectedHeaderText = 'No places to stay available';
    const expectedText = `We could not find any property available at the moment in ${initialState.offers!.cityName}`;

    render(prepandedComponent);

    expect(screen.getByText(expectedHeaderText)).toBeInTheDocument();
    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });
});
