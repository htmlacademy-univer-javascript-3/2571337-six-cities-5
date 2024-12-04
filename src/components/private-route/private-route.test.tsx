import { createMemoryHistory, MemoryHistory } from 'history';
import { withHistory, withStore } from '../../mocks/mocks-component';
import { Route, Routes } from 'react-router-dom';
import { AppRoute } from '../../constants/routes';
import { PrivateRoute } from './private-route';
import { AuthStatus } from '../../constants/user';
import { TState } from '../../types/state.types';
import { makeFakeUser } from '../../mocks/users';
import { render, screen } from '@testing-library/react';

describe('Component: PrivateRoute', () => {
  let mockHistory: MemoryHistory;
  beforeAll(() => {
    mockHistory = createMemoryHistory();
  });

  beforeEach(() => {
    mockHistory.push(AppRoute.Favorites);
  });

  it('should render correctly route when authStatus equal needAuthStatus from prop', () => {
    const expectedText = 'private route';
    const notExpectedText = 'public route';
    const componentWithHistory = withHistory(
      <Routes>
        <Route path={AppRoute.Login} element={<span>{notExpectedText}</span>}/>
        <Route
          path={AppRoute.Favorites}
          element={
            <PrivateRoute needAuthStatus={AuthStatus.Authorized} to={AppRoute.Login}>
              <span>{expectedText}</span>
            </PrivateRoute>
          }
        />
      </Routes>,
      mockHistory
    );
    const initialState:Partial<TState> = {
      user: {
        user: makeFakeUser(),
        authorizationStatus: AuthStatus.Authorized
      }
    };
    const { componentWithStore: prepandedComponent } = withStore(componentWithHistory, initialState);

    render(prepandedComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
    expect(screen.queryByText(notExpectedText)).not.toBeInTheDocument();
  });

  it('should render public route when authStatus not equal needAuthStatus from prop', () => {
    const expectedText = 'public route';
    const notExpectedText = 'private route';
    const initialState:Partial<TState> = {
      user: {
        user: makeFakeUser(),
        authorizationStatus: AuthStatus.Unauthorized
      }
    };
    const componentWithHistory = withHistory(
      <Routes>
        <Route path={AppRoute.Login} element={<span>{expectedText}</span>}/>
        <Route
          path={AppRoute.Favorites}
          element={
            <PrivateRoute needAuthStatus={AuthStatus.Authorized} to={AppRoute.Login}>
              <span>{notExpectedText}</span>
            </PrivateRoute>
          }
        />
      </Routes>,
      mockHistory
    );
    const { componentWithStore: prepandedComponent } = withStore(componentWithHistory, initialState);

    render(prepandedComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
    expect(screen.queryByText(notExpectedText)).not.toBeInTheDocument();
  });
});
