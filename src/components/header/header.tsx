import { Link } from 'react-router-dom';
import { AppRoute } from '../../constants/routes';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { AuthStatus } from '../../constants/user';
import css from './header.module.css';
import cn from 'classnames';
import { selectAuthStatus, selectUserEmail } from '../../store/user-process/selectors';
import { logout } from '../../store/user-process/api-actions';
import { selectFavoriteOffers } from '../../store/offers-process/selectors';

export const Header = () => {
  const {authStatus} = useAppSelector(selectAuthStatus);
  const { email } = useAppSelector(selectUserEmail);
  const { favoriteOffers } = useAppSelector(selectFavoriteOffers);
  const dispatch = useAppDispatch();

  const logOutHandler = () => {
    if (authStatus === AuthStatus.Authorized) {
      dispatch(logout());
    }
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Link className="header__logo-link" to="/">
              <img
                className="header__logo"
                src="img/logo.svg"
                alt="6 cities logo"
                width={81}
                height={41}
              />
            </Link>
          </div>
          <nav className="header__nav">
            <ul className="header__nav-list">
              {
                authStatus === AuthStatus.Authorized &&
                <li className="header__nav-item user">
                  <Link
                    className="header__nav-link header__nav-link--profile"
                    to={AppRoute.Favorites}
                  >
                    <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                    <span className="header__user-name user__name">
                      { email }
                    </span>
                    <span className="header__favorite-count">{favoriteOffers.length}</span>
                  </Link>
                </li>
              }
              <li className="header__nav-item">
                {
                  authStatus === AuthStatus.Authorized ?
                    <button
                      onClick={logOutHandler}
                      className={cn('header__nav-link', css.button)}
                    >
                      <span
                        className="header__signout"
                      >
                        Log Out
                      </span>
                    </button>
                    :
                    <Link
                      className="header__nav-link"
                      to={AppRoute.Login}
                    >
                      <span
                        className="header__signout"
                      >
                        Sign in
                      </span>
                    </Link>
                }

              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};
