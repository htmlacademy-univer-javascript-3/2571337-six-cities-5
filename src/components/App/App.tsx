import { JSX } from 'react';
import { MainPage } from '../../pages/MainPage';
import { IPlace } from '../..';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { LoginPage } from '../../pages/LoginPage';
import { FavoritesPage } from '../../pages/FavoritesPage';
import { OfferPage } from '../../pages/OfferPage';
import { NotFoundPage } from '../../pages/NotFoundPage';
import { PrivateRoute } from '../PrivateRoute/PrivateRoute';
import { AppRoute } from '../../constants/routes';

interface AppProps {
    places: IPlace[];
}

export function App({ places }: AppProps):JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoute.MAIN} element={<MainPage places={places}/>}/>
        <Route path={AppRoute.LOGIN} element={<LoginPage/>}/>
        <Route path={AppRoute.FAVORITES} element={<PrivateRoute><FavoritesPage/></PrivateRoute>}/>
        <Route path={AppRoute.OFFER} element={<OfferPage/>}/>
        <Route path='*' element={<NotFoundPage/>}/>
      </Routes>
    </BrowserRouter>
  );
}
