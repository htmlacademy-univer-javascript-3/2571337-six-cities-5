import { Link } from 'react-router-dom';

export const Footer = () => (
  <footer className="footer container" data-testid="favorite__footer">
    <Link className="footer__logo-link" to="/">
      <img
        className="footer__logo"
        src="img/logo.svg"
        alt="6 cities logo"
        width={64}
        height={33}
      />
    </Link>
  </footer>
);
