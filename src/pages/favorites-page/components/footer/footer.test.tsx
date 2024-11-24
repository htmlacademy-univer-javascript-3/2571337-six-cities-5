import { render, screen } from '@testing-library/react';
import { withHistory } from '../../../../mocks/mocks-component';
import { Footer } from './footer';

describe('Component: Footer', () => {
  it('should render correctly', () => {
    const expectedImageAltText = '6 cities logo';
    const favoriteFooterTestId = 'favorite__footer';
    const prependedComponent = withHistory(<Footer/>);
    render(prependedComponent);

    expect(screen.getByAltText(expectedImageAltText)).toBeInTheDocument();
    expect(screen.getByTestId(favoriteFooterTestId)).toBeInTheDocument();

  });
});
