import css from './spinner.module.css';

export const Spinner = () => (
  <div className={css.loader__container}>
    <span className={css.loader}></span>
  </div>
);
