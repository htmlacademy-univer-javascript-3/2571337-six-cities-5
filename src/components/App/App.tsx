import { JSX } from 'react';
import { MainPage } from '../../pages/MainPage';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { LoginPage } from '../../pages/LoginPage';
import { FavoritesPage } from '../../pages/FavoritesPage';
import { OfferPage } from '../../pages/OfferPage';
import { NotFoundPage } from '../../pages/NotFoundPage';
import { PrivateRoute } from '../PrivateRoute/PrivateRoute';
import { AppRoute } from '../../constants/routes';
import { CommonOffer } from '../../types/offers';

interface AppProps {
    offers: CommonOffer[];
}

export function App({ offers }: AppProps):JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoute.MAIN} element={<MainPage offers={offers}/>}/>
        <Route path={AppRoute.LOGIN} element={<LoginPage/>}/>
        <Route path={AppRoute.FAVORITES} element={<PrivateRoute><FavoritesPage offers={offers}/></PrivateRoute>}/>
        <Route path={AppRoute.OFFER} element={<OfferPage/>}/>
        <Route path={AppRoute.NOT_FOUND} element={<NotFoundPage />}/>
        <Route path='*' element={<Navigate to={AppRoute.NOT_FOUND}/>}/>
      </Routes>
    </BrowserRouter>
  );
}
