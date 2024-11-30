import { APIRoute } from '../../constants/api';
import { AuthStatus } from '../../constants/user';
import { extractActionsTypes } from '../../mocks/mocks';
import { withHistory, withStore } from '../../mocks/mocks-component';
import { makeFakeCommonOffer, makeFakeOffer, makeFakeSortingVariant } from '../../mocks/offers';
import { makeFakeUser } from '../../mocks/users';
import { login } from '../../store/user-process/api-actions';
import { setAuthorizationStatus } from '../../store/user-process/user-reducer';
import { TState } from '../../types/state.types';
import { internet } from 'faker';
import { LoginPage } from './login-page';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('Component: LoginPage', () => {
  let initialState: Partial<TState>;

  beforeEach(() => {
    initialState = {
      offers: {
        cityName: makeFakeCommonOffer().city.name,
        favoriteOffers: [makeFakeCommonOffer()],
        isLoading: false,
        nearbyOffers: [makeFakeCommonOffer()],
        offer: makeFakeOffer(),
        offers: [makeFakeCommonOffer()],
        sortingVariant: makeFakeSortingVariant()
      },
      user: {
        authorizationStatus: AuthStatus.Authorized,
        user: makeFakeUser()
      },
    };
  });

  it('should render correctly', () => {
    const imgAltText = '6 cities logo';
    const headerText = 'Sign in';
    const emailText = 'E-mail';
    const passwordText = 'Password';
    const componentWithRouting = withHistory(<LoginPage/>);
    const { componentWithStore: preparedComponent } = withStore(componentWithRouting);

    render(preparedComponent);

    expect(screen.getByAltText(imgAltText)).toBeInTheDocument();
    expect(screen.getAllByText(headerText).length).toBe(2);
    expect(screen.getByText(emailText)).toBeInTheDocument();
    expect(screen.getByText(passwordText)).toBeInTheDocument();
  });

  it('should render correcltly with enter email and password', async () => {
    const emailElement = 'emailElement';
    const passwordElement = 'passwordElement';
    const expectedEmailText = 'student@gmail.com';
    const expectedPasswordText = '12344321';
    const componentWithRouting = withHistory(<LoginPage/>);
    const { componentWithStore: preparedComponent } = withStore(componentWithRouting);

    render(preparedComponent);
    await userEvent.type(screen.getByTestId(emailElement), expectedEmailText);
    await userEvent.type(screen.getByTestId(passwordElement), expectedPasswordText);

    expect(screen.getByDisplayValue(expectedEmailText)).toBeInTheDocument();
    expect(screen.getByDisplayValue(expectedPasswordText)).toBeInTheDocument();
  });

  it('should dispatch "login.pending" "setAuthorizationStatus" "login.fulfilled" when user typed email, password and submit form', async () => {
    const emailElement = 'emailElement';
    const passwordElement = 'passwordElement';
    const typedEmailText = internet.email();
    const typedPasswordText = '12aa';
    const componentWithRouting = withHistory(<LoginPage/>);
    const { componentWithStore: preparedComponent, mockAxiosAdapter, mockStore } = withStore(componentWithRouting, initialState);
    mockAxiosAdapter.onPost(APIRoute.Login).reply(201);

    render(preparedComponent);
    await userEvent.type(screen.getByTestId(emailElement), typedEmailText);
    await userEvent.type(screen.getByTestId(passwordElement), typedPasswordText);
    await userEvent.click(screen.getByRole('button'));
    const actions = extractActionsTypes(mockStore.getActions());

    expect(actions).toEqual([login.pending.type, setAuthorizationStatus.type, login.fulfilled.type]);
  });
});
