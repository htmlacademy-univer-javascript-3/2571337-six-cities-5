import { render, screen } from '@testing-library/react';
import { City } from '../../constants/cities';
import { withHistory, withStore } from '../../mocks/mocks-component';
import { makeFakeCommonOffer, makeFakeOffer, makeFakeSortingVariant } from '../../mocks/offers';
import { TState } from '../../types/state.types';
import { LocationsList } from './locations-list';
import userEvent from '@testing-library/user-event';
import { extractActionsTypes } from '../../mocks/mocks';

describe('Component: LocationsList', () => {
  const locationsListProps: {
        cities: City[];
    } = {cities: Object.values(City)};
  const initialState: Partial<TState> = {
    offers: {
      cityName: City.Paris,
      favoriteOffers: [makeFakeCommonOffer()],
      isLoading: false,
      nearbyOffers: [makeFakeCommonOffer()],
      offer: makeFakeOffer(),
      offers: [makeFakeCommonOffer()],
      sortingVariant: makeFakeSortingVariant()
    }
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render correctly', () => {
    const componentWithHistory = withHistory(<LocationsList {...locationsListProps}/>);
    const { componentWithStore: prepandedComponent} = withStore(componentWithHistory, initialState);
    const locationItemTestId = 'locationItem';

    render(prepandedComponent);

    expect(screen.getAllByTestId(locationItemTestId).length).toBe(locationsListProps.cities.length);
  });

  it('should dispatch "changeCityName"', async () => {
    const componentWithHistory = withHistory(<LocationsList {...locationsListProps}/>);
    const { componentWithStore: prepandedComponent, mockStore} = withStore(componentWithHistory, initialState);
    const expectedActions = ['offers/changeCityName'];

    render(prepandedComponent);
    await userEvent.click(screen.getByText(City.Brussels));
    const actions = extractActionsTypes(mockStore.getActions());

    expect(actions).toEqual(expectedActions);
  });
});
