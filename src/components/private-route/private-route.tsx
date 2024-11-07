import { PropsWithChildren } from 'react';
import { Navigate } from 'react-router-dom';
import { AppRoute } from '../../constants/routes';
import { AuthStatus } from '../../constants/user';
import { useAppSelector } from '../../store/hooks';

export function PrivateRoute({ children }: PropsWithChildren){
  const authStatus = useAppSelector((state) => state.user.authorizationStatus);
  return authStatus === AuthStatus.Authorized ? children : <Navigate to={AppRoute.Login}/>;
}
