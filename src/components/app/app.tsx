import { JSX } from 'react';
import { MainPage } from '../../pages/main-page';
import { Navigate, Route, Routes } from 'react-router-dom';
import { LoginPage } from '../../pages/login-page';
import { FavoritesPage } from '../../pages/favorites-page';
import { OfferPage } from '../../pages/offer-page';
import { NotFoundPage } from '../../pages/not-found-page';
import { PrivateRoute } from '../private-route/private-route';
import { AppRoute } from '../../constants/routes';

import { AuthStatus } from '../../constants/user';
import { MainLayout } from '../../layouts/main-layout';
import { useAppSelector } from '../../store/hooks';
import { selectAuthStatus } from '../../store/user-process/selectors';
import { Spinner } from '../spinner';

export function App():JSX.Element {
  const authStatus = useAppSelector(selectAuthStatus);

  if (authStatus === AuthStatus.Unknown) {
    return <Spinner />;
  }
  return (
    <Routes>
      <Route
        path={AppRoute.Main}
        element={
          <MainLayout className="page--gray page--main">
            <MainPage />
          </MainLayout>
        }
      />
      <Route
        path={AppRoute.Login}
        element={
          <PrivateRoute needAuthStatus={AuthStatus.Unauthorized} to={AppRoute.Main}>
            <LoginPage/>
          </PrivateRoute>
        }
      />
      <Route
        path={AppRoute.Favorites}
        element={
          <PrivateRoute>
            <MainLayout>
              <FavoritesPage />
            </MainLayout>
          </PrivateRoute>
        }
      />
      <Route
        path={AppRoute.Offer}
        element={
          <MainLayout>
            <OfferPage/>
          </MainLayout>
        }
      />
      <Route
        path={AppRoute.NotFound}
        element={<NotFoundPage />}
      />
      <Route
        path='*'
        element={<Navigate to={AppRoute.NotFound}/>}
      />
    </Routes>
  );
}
