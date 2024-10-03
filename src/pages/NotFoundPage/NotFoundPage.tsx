import React, { JSX } from 'react';
import { Link } from 'react-router-dom';

import classes from './NotFoundPage.module.css';

export function NotFoundPage(): JSX.Element {
  return (
    <div className={classes.page__container}>
      <p className={classes.page__title}>404 Page Not Found</p>
      <Link className={classes.page__link} to='/'>На главную</Link>
    </div>
  );
}
