import { render, screen } from '@testing-library/react';
import { City } from '../../constants/cities';
import { makeFakeCity } from '../../mocks/cities';
import { withHistory, withStore } from '../../mocks/mocks-component';
import { makeFakeCommonOffer, makeFakeOffer, makeFakeSortingVariant } from '../../mocks/offers';
import { TState } from '../../types/state.types';
import { LocationItem } from './location-item';
import userEvent from '@testing-library/user-event';

const mockClickHandler = vi.fn();

describe('Component: LocationItem', () => {
  const initialState: Partial<TState> = {
    offers: {
      cityName: makeFakeCity().name,
      favoriteOffers: [makeFakeCommonOffer()],
      isLoading: false,
      nearbyOffers: [makeFakeCommonOffer()],
      offer: makeFakeOffer(),
      offers: [makeFakeCommonOffer()],
      sortingVariant: makeFakeSortingVariant()
    }
  };
  const city = City.Amsterdam;
  const locationItemProp: {
    onClick: () => void;
    city: City;
  } = {
    onClick: mockClickHandler,
    city: City.Amsterdam
  };

  beforeAll(() => {
    vi.clearAllMocks();
  });

  it('should render correctly', () => {
    const componentWithHistory = withHistory(<LocationItem {...locationItemProp}/>);
    const { componentWithStore: prepandedComponent} = withStore(componentWithHistory, initialState);

    render(prepandedComponent);

    expect(screen.getByText(city)).toBeInTheDocument();
  });

  it('should render correctly with the same city from prop and app store', () => {
    const locationItemLinkTestId = 'locationItem__link';
    const expectedClass = 'tabs__item--active';
    const componentWithHistory = withHistory(<LocationItem {...locationItemProp}/>);
    const { componentWithStore: prepandedComponent} = withStore(componentWithHistory, {...initialState, offers: {...initialState.offers!, cityName: city}});

    render(prepandedComponent);

    expect(screen.getByTestId(locationItemLinkTestId)).toHaveClass(expectedClass);
  });

  it('should called 1 time when user clicked on link', async () => {
    const locationItemLinkTestId = 'locationItem__link';
    const componentWithHistory = withHistory(<LocationItem {...locationItemProp}/>);
    const { componentWithStore: prepandedComponent} = withStore(componentWithHistory, {...initialState, offers: {...initialState.offers!, cityName: city}});
    vi.spyOn(locationItemProp, 'onClick');

    render(prepandedComponent);
    await userEvent.click(screen.getByTestId(locationItemLinkTestId));

    expect(mockClickHandler).toBeCalledTimes(1);
  });
});
