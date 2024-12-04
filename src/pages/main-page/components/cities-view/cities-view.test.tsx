import { render, screen } from '@testing-library/react';
import { City } from '../../../../constants/cities';
import { withHistory, withStore } from '../../../../mocks/mocks-component';
import { makeFakeCommonOffer, makeFakeOffer, makeFakeSortingVariant } from '../../../../mocks/offers';
import { TState } from '../../../../types/state.types';
import { CitiesView } from './cities-view';
import { AuthStatus } from '../../../../constants/user';
import { makeFakeUser } from '../../../../mocks/users';

describe('Component: CitiesView', () => {
  let initialState: Partial<TState>;
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
      user: {
        authorizationStatus: AuthStatus.Authorized,
        user: makeFakeUser()
      },
    };
  });

  it('should render correctly with not empty filtered offers', () => {
    const citiesPlacesContainerTestId = 'citiesPlacesContainer';
    const notExpectedClass = 'cities__places-container--empty';
    const mapElementTestId = 'mapElement';
    const componentWithHistory = withHistory(<CitiesView />);
    const { componentWithStore: prepandedComponent } = withStore(componentWithHistory, initialState);
    const expectedText = `${initialState.offers!.offers.length} places to stay in ${ initialState.offers!.cityName }`;

    render(prepandedComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
    expect(screen.getByTestId(citiesPlacesContainerTestId)).not.toHaveClass(notExpectedClass);
    expect(screen.getByTestId(mapElementTestId)).toBeInTheDocument();
  });

  it('should render correctly with empty filtered offers', () => {
    const citiesPlacesContainerTestId = 'citiesPlacesContainer';
    const expectedClass = 'cities__places-container--empty';
    const mapElementTestId = 'mapElement';
    const componentWithHistory = withHistory(<CitiesView />);
    const { componentWithStore: prepandedComponent } = withStore(componentWithHistory, {...initialState, offers: { ...initialState.offers!, cityName: initialState.offers!.cityName === City.Amsterdam ? City.Brussels : City.Amsterdam }});
    const notExpectedText = `${initialState.offers!.offers.length} places to stay in ${ initialState.offers!.cityName }`;

    render(prepandedComponent);

    expect(screen.queryByText(notExpectedText)).not.toBeInTheDocument();
    expect(screen.getByTestId(citiesPlacesContainerTestId)).toHaveClass(expectedClass);
    expect(screen.queryByTestId(mapElementTestId)).not.toBeInTheDocument();
  });
});
