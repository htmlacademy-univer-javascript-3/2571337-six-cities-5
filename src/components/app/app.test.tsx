import { createMemoryHistory, MemoryHistory } from 'history';
import { withHistory, withStore } from '../../mocks/mocks-component';
import { App } from './app';
import { makeFakeStore } from '../../mocks/store';
import { render, screen } from '@testing-library/react';
import { AppRoute } from '../../constants/routes';
import { AuthStatus } from '../../constants/user';
import { makeFakeUser } from '../../mocks/users';

describe('Test Application Routing', () => {
  let mockHistory: MemoryHistory;

  beforeEach(() => {
    mockHistory = createMemoryHistory();
  });

  test('Should render <MainPage/> when user navigate to "/"', () => {
    const expectedHeaderText = 'Cities';
    const componentWithHistory = withHistory(<App/>, mockHistory);
    const { componentWithStore: prepandedComponent } = withStore(componentWithHistory, makeFakeStore());
    mockHistory.push(AppRoute.Main);

    render(prepandedComponent);

    expect(screen.getByText(expectedHeaderText)).toBeInTheDocument();
  });

  test('Should render <LoginPage/> when user navigate to "/login"', () => {
    const expectedPasswordElement = 'passwordElement';
    const expectedEmailElement = 'emailElement';
    const componentWithHistory = withHistory(<App/>, mockHistory);
    const { componentWithStore: prepandedComponent } = withStore(componentWithHistory, makeFakeStore({ user: {authorizationStatus: AuthStatus.Unauthorized, user: makeFakeUser()} }));
    mockHistory.push(AppRoute.Login);

    render(prepandedComponent);

    expect(screen.getByTestId(expectedPasswordElement)).toBeInTheDocument();
    expect(screen.getByTestId(expectedEmailElement)).toBeInTheDocument();
  });

  test('Should render <FavoritesPage/> when user navigate to "/favorites"', () => {
    const expectedHeaderText = 'Saved listing';
    const componentWithHistory = withHistory(<App/>, mockHistory);
    const { componentWithStore: prepandedComponent } = withStore(componentWithHistory, makeFakeStore({ user: {authorizationStatus: AuthStatus.Authorized, user: makeFakeUser()} }));
    mockHistory.push(AppRoute.Favorites);

    render(prepandedComponent);

    expect(screen.getByText(expectedHeaderText)).toBeInTheDocument();
  });

  test('Should render <OfferPage/> when user navigate to "/offer/:offerId"', () => {
    const expectedSecondHeaderText = 'Other places in the neighbourhood';
    const componentWithHistory = withHistory(<App/>, mockHistory);
    const { componentWithStore: prepandedComponent } = withStore(componentWithHistory, makeFakeStore());
    mockHistory.push(AppRoute.Offer);

    render(prepandedComponent);

    expect(screen.getByText(expectedSecondHeaderText)).toBeInTheDocument();
  });

  test('Should render <NotFoundPage/> when user navigate to "/not-found-page"', () => {
    const expectedHeaderText = /404 Page Not Found/;
    const componentWithHistory = withHistory(<App/>, mockHistory);
    const { componentWithStore: prepandedComponent } = withStore(componentWithHistory, makeFakeStore());
    mockHistory.push(AppRoute.NotFound);

    render(prepandedComponent);

    expect(screen.getByText(expectedHeaderText)).toBeInTheDocument();
  });

  test('Should render <NotFoundPage/> when user navigate to not correctly route', () => {
    const expectedHeaderText = /404 Page Not Found/;
    const componentWithHistory = withHistory(<App/>, mockHistory);
    const { componentWithStore: prepandedComponent } = withStore(componentWithHistory, makeFakeStore());
    mockHistory.push('/12345');

    render(prepandedComponent);

    expect(screen.getByText(expectedHeaderText)).toBeInTheDocument();
  });
});
