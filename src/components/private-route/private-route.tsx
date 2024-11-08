import { PropsWithChildren } from 'react';
import { Navigate } from 'react-router-dom';
import { AppRoute } from '../../constants/routes';
import { AuthStatus } from '../../constants/user';
import { useAppSelector } from '../../store/hooks';


type PrivateRouteProps = {
  to?: AppRoute;
  needAuthStatus?: AuthStatus;
} & PropsWithChildren;
export function PrivateRoute({
  children,
  needAuthStatus = AuthStatus.Authorized,
  to = AppRoute.Login
}: PrivateRouteProps){
  const userStatus = useAppSelector((state) => state.user.authorizationStatus);
  return userStatus === needAuthStatus ? children : <Navigate to={to}/>;
}
