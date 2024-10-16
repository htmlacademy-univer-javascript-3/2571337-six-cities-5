import { PropsWithChildren } from 'react';
import { Navigate } from 'react-router-dom';
import { AppRoute } from '../../constants/routes';
import { AuthStatus } from '../../constants/user';

type PrivateRouteProps = {
  authStatus: AuthStatus;
} & PropsWithChildren;

export function PrivateRoute({ children, authStatus }: PrivateRouteProps){
  return authStatus === AuthStatus.Authorized ? children : <Navigate to={AppRoute.LOGIN}/>;
}
