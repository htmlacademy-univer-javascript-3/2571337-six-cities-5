import css from './spinner.module.css';

export const Spinner = () => (
  <div className={css.loader__container} data-testid="spinner__container">
    <span className={css.loader} data-testid="spinner__item"></span>
  </div>
);
