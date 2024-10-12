import { PropsWithChildren } from 'react';
import { Navigate } from 'react-router-dom';
import { AppRoute } from '../../constants/routes';

export function PrivateRoute({ children }: PropsWithChildren){
  const isAuth = true;
  return isAuth ? children : <Navigate to={AppRoute.LOGIN}/>;
}
