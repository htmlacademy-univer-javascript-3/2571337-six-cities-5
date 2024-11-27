import { render, screen, fireEvent } from '@testing-library/react';
import { OfferCard } from '.';
import { City } from '../../constants/cities';
import { AuthStatus } from '../../constants/user';
import { withHistory, withStore } from '../../mocks/mocks-component';
import { makeFakeCommonOffer, makeFakeOffer, makeFakeSortingVariant } from '../../mocks/offers';
import { makeFakeUser } from '../../mocks/users';
import { CommonOffer } from '../../types/offer.types';
import { TState } from '../../types/state.types';
import userEvent from '@testing-library/user-event';
import { extractActionsTypes } from '../../mocks/mocks';
import { APIRoute } from '../../constants/api';
import { FavoriteOfferStatus } from '../../constants/offers';
import { fetchFavoriteOffers, setFavoriteOfferStatus } from '../../store/offers-process/api-actions';
import { redirectToRoute } from '../../store/action';

const mockOnMouseEnterHandler = vi.fn();
const mockOnMouseLeaveHandler = vi.fn();


describe('Component: OfferCard', () => {
  const locationsListProps: {
    offer: CommonOffer;
    imageSize: 'small' | 'large';
    block: string;
    onMouseEnterHandler?: (params: {idOffer: CommonOffer['id']}) => void;
    onMouseLeaveHandler?: () => void;
    } = {
      block: 'block',
      imageSize: 'small',
      offer: makeFakeCommonOffer(),
      onMouseEnterHandler: mockOnMouseEnterHandler,
      onMouseLeaveHandler: mockOnMouseLeaveHandler
    };
  const initialState: Partial<TState> = {
    user: {
      authorizationStatus: AuthStatus.Authorized,
      user: makeFakeUser()
    },
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
    const articleOfferCardTestId = 'articleOfferCard';
    const expectedTitleOfferCard = locationsListProps.offer.title;
    const expectedType = new RegExp(`${locationsListProps.offer.type}`, 'i');
    const componentWithHistory = withHistory(<OfferCard {...locationsListProps}/>);
    const { componentWithStore: prepandedComponent} = withStore(componentWithHistory, initialState);

    render(prepandedComponent);

    expect(screen.getByTestId(articleOfferCardTestId)).toBeInTheDocument();
    expect(screen.getByText(expectedTitleOfferCard)).toBeInTheDocument();
    expect(screen.getByText(expectedType)).toBeInTheDocument();
  });

  it('should onMouseEnterHandler called once', () => {
    const articleOfferCardTestId = 'articleOfferCard';
    const componentWithHistory = withHistory(<OfferCard {...locationsListProps}/>);
    const { componentWithStore: prepandedComponent} = withStore(componentWithHistory, initialState);
    vi.spyOn(locationsListProps, 'onMouseEnterHandler');

    render(prepandedComponent);
    fireEvent.mouseEnter(screen.getByTestId(articleOfferCardTestId));

    expect(mockOnMouseEnterHandler).toBeCalledTimes(1);
  });

  it('should onMouseLeaveHandler called once', () => {
    const articleOfferCardTestId = 'articleOfferCard';
    const componentWithHistory = withHistory(<OfferCard {...locationsListProps}/>);
    const { componentWithStore: prepandedComponent} = withStore(componentWithHistory, initialState);
    vi.spyOn(locationsListProps, 'onMouseLeaveHandler');

    render(prepandedComponent);
    fireEvent.mouseLeave(screen.getByTestId(articleOfferCardTestId));

    expect(mockOnMouseLeaveHandler).toBeCalledTimes(1);
  });

  it('should dispatch "setFavoriteOfferStatus.pending" "fetchFavoriteOffers.pending.type" "fetchFavoriteOffers.fulfilled" "setFavoriteOfferStatus.fulfilled" with authorized user', async () => {
    const buttonToBookmarkTestId = 'buttonToBookmark';
    const componentWithHistory = withHistory(<OfferCard {...locationsListProps}/>);
    const { componentWithStore: prepandedComponent, mockStore, mockAxiosAdapter} = withStore(componentWithHistory, initialState);
    mockAxiosAdapter.onPost(`${APIRoute.Favorite}${locationsListProps.offer.id}/${locationsListProps.offer.isFavorite ? FavoriteOfferStatus.NotFavorite : FavoriteOfferStatus.Favorite}/`).reply(201);
    mockAxiosAdapter.onGet(`${APIRoute.Favorite}`).reply(200);
    const expectedActions = [setFavoriteOfferStatus.pending.type, fetchFavoriteOffers.pending.type, fetchFavoriteOffers.fulfilled.type, setFavoriteOfferStatus.fulfilled.type];

    render(prepandedComponent);
    await userEvent.click(screen.getByTestId(buttonToBookmarkTestId));
    const actions = extractActionsTypes(mockStore.getActions());

    expect(actions).toEqual(expectedActions);
  });

  it('should dispatch "redirectToRoute" with unauthorized user', async () => {
    const buttonToBookmarkTestId = 'buttonToBookmark';
    const componentWithHistory = withHistory(<OfferCard {...locationsListProps}/>);
    const { componentWithStore: prepandedComponent, mockStore} = withStore(componentWithHistory, {...initialState, user: {...initialState.user!, authorizationStatus: AuthStatus.Unauthorized}});
    const expectedActions = [redirectToRoute.type];

    render(prepandedComponent);
    await userEvent.click(screen.getByTestId(buttonToBookmarkTestId));
    const actions = extractActionsTypes(mockStore.getActions());

    expect(actions).toEqual(expectedActions);
  });
});
