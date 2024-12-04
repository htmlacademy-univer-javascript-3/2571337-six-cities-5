import { AuthStatus } from '../../constants/user';
import { makeFakeCity } from '../../mocks/cities';
import { withHistory, withStore } from '../../mocks/mocks-component';
import { makeFakeCommonOffer, makeFakeOffer, makeFakeSortingVariant } from '../../mocks/offers';
import { makeFakeUser } from '../../mocks/users';
import { TState } from '../../types/state.types';
import { Header } from './header';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as tokenService from '../../services/token';
import { APIRoute } from '../../constants/api';
import { logout } from '../../store/user-process/api-actions';
import { extractActionsTypes } from '../../mocks/mocks';
import { setAuthorizationStatus, setUser } from '../../store/user-process/user-reducer';
import { fetchOffers } from '../../store/offers-process/api-actions';

describe('Component: Header', () => {
  let initialState: Partial<TState>;

  beforeEach(() => {
    initialState = {
      user: {
        user: makeFakeUser(),
        authorizationStatus: AuthStatus.Authorized
      },
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
    vi.clearAllMocks();
  });

  it('should render correctly when user is authorized', () => {
    const expectedEmail = initialState.user?.user?.email ?? '';
    const dataTestIdFavoritesLength = 'favoriteOffersLength';
    const expectedFavotitesLength = initialState.offers?.favoriteOffers.length ?? '';
    const expectedTextForAuth = 'Log Out';
    const componentWithHistory = withHistory(
      <Header />
    );
    const { componentWithStore: prepandedComponent } = withStore(componentWithHistory, initialState);

    render(prepandedComponent);

    expect(screen.getByText(expectedEmail)).toBeInTheDocument();
    expect(+screen.getByTestId(dataTestIdFavoritesLength).innerHTML).toBe(expectedFavotitesLength);
    expect(screen.getByText(expectedTextForAuth)).toBeInTheDocument();
  });

  it('should render correctly when user is unauthorized', () => {
    const expectedTextForAuth = 'Sign in';
    const componentWithHistory = withHistory(
      <Header />
    );
    const { componentWithStore: prepandedComponent } = withStore(componentWithHistory, {...initialState, user: { user: null, authorizationStatus: AuthStatus.Unauthorized }});

    render(prepandedComponent);

    expect(screen.getByText(expectedTextForAuth)).toBeInTheDocument();
  });

  describe('test click on logout', () => {
    const buttonLogoutTestId = 'buttonLogout';
    it('should once called dropToken', async () => {
      const componentWithHistory = withHistory(
        <Header />
      );
      const { componentWithStore: prepandedComponent, mockAxiosAdapter } = withStore(componentWithHistory, initialState);
      mockAxiosAdapter.onDelete(`${APIRoute.Logout}`).reply(204);
      vi.spyOn(tokenService, 'dropToken');

      render(prepandedComponent);
      await userEvent.click(screen.getByTestId(buttonLogoutTestId));

      expect(tokenService.dropToken).toBeCalledTimes(1);
    });

    it('should dispatch "logout.pending" "setUser" "setAuthorizationStatus" "fetchOffers.pending" "fetchOffers.fulfilled" "logout.fulfilled"', async () => {
      const componentWithHistory = withHistory(
        <Header />
      );
      const { componentWithStore: prepandedComponent, mockAxiosAdapter, mockStore } = withStore(componentWithHistory, initialState);
      mockAxiosAdapter.onDelete(`${APIRoute.Logout}`).reply(204);
      mockAxiosAdapter.onGet(`${APIRoute.Offers}`).reply(200);

      render(prepandedComponent);
      await userEvent.click(screen.getByTestId(buttonLogoutTestId));

      const expectedActions = extractActionsTypes(mockStore.getActions());
      expect(expectedActions).toEqual([logout.pending.type, setUser.type, setAuthorizationStatus.type, fetchOffers.pending.type, fetchOffers.fulfilled.type, logout.fulfilled.type]);
    });

    it('should dispatch "logout.pending" "setAuthorizationStatus" "logout.fulfilled"', async () => {
      const componentWithHistory = withHistory(
        <Header />
      );
      const { componentWithStore: prepandedComponent, mockAxiosAdapter, mockStore } = withStore(componentWithHistory, initialState);
      mockAxiosAdapter.onDelete(`${APIRoute.Logout}`).reply(404);

      render(prepandedComponent);
      await userEvent.click(screen.getByTestId(buttonLogoutTestId));

      const expectedActions = extractActionsTypes(mockStore.getActions());
      expect(expectedActions).toEqual([logout.pending.type, setAuthorizationStatus.type, logout.fulfilled.type]);
    });
  });
});
