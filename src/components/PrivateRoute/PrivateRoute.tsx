import React, { PropsWithChildren } from 'react';
import { Navigate } from 'react-router-dom';
import { AppRoute } from '../../constants/routes';

export function PrivateRoute({ children }: PropsWithChildren){
  const isAuth = false;
  return isAuth ? children : <Navigate to={AppRoute.LOGIN}/>;
}
