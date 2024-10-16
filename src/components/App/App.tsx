import { JSX } from 'react';
import { MainPage } from '../../pages/main-page';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { LoginPage } from '../../pages/login-page';
import { FavoritesPage } from '../../pages/favorites-page';
import { OfferPage } from '../../pages/offer-page';
import { NotFoundPage } from '../../pages/not-found-page';
import { PrivateRoute } from '../private-route/private-route';
import { AppRoute } from '../../constants/routes';
import { CommonOffer } from '../../types/offer.types';
import { AuthStatus } from '../../constants/user';

interface AppProps {
    offers: CommonOffer[];
}

export function App({ offers }: AppProps):JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoute.MAIN} element={<MainPage offers={offers}/>}/>
        <Route path={AppRoute.LOGIN} element={<LoginPage/>}/>
        <Route
          path={AppRoute.FAVORITES}
          element={
            <PrivateRoute authStatus={AuthStatus.Authorized}>
              <FavoritesPage offers={offers}/>
            </PrivateRoute>
          }
        />
        <Route path={AppRoute.OFFER} element={<OfferPage offers={offers}/>}/>
        <Route path={AppRoute.NOT_FOUND} element={<NotFoundPage />}/>
        <Route path='*' element={<Navigate to={AppRoute.NOT_FOUND}/>}/>
      </Routes>
    </BrowserRouter>
  );
}
