import { JSX } from 'react';
import { Link } from 'react-router-dom';

import classes from './not-found-page.module.css';
import { AppRoute } from '../../constants/routes';

export function NotFoundPage(): JSX.Element {
  return (
    <div className={classes.page__container} data-testid="notFoundPage__container">
      <p className={classes.page__title}>404 Page Not Found</p>
      <Link className={classes.page__link} to={AppRoute.Main}>На главную</Link>
    </div>
  );
}
