import { render, screen } from '@testing-library/react';
import { Spinner } from './spinner';

describe('Component: Spinner', () => {
  it('should render', () => {
    const spinnerContainer = 'spinner__container';
    const spinnerItem = 'spinner__item';

    render(<Spinner/>);

    expect(screen.getByTestId(spinnerContainer)).toBeInTheDocument();
    expect(screen.getByTestId(spinnerItem)).toBeInTheDocument();
  });
});
