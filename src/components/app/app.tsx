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
import { TCity } from '../../types/city.types';
import { TComment } from '../../types/comment.types';

interface AppProps {
    offers: CommonOffer[];
    city: TCity;
    comments: TComment[];
}

export function App({ offers, city, comments }: AppProps):JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoute.Main} element={<MainPage city={city} />}/>
        <Route path={AppRoute.Login} element={<LoginPage/>}/>
        <Route
          path={AppRoute.Favorites}
          element={
            <PrivateRoute authStatus={AuthStatus.Authorized}>
              <FavoritesPage offers={offers}/>
            </PrivateRoute>
          }
        />
        <Route path={AppRoute.Offer} element={<OfferPage comments={comments} offers={offers}/>}/>
        <Route path={AppRoute.NotFound} element={<NotFoundPage />}/>
        <Route path='*' element={<Navigate to={AppRoute.NotFound}/>}/>
      </Routes>
    </BrowserRouter>
  );
}
