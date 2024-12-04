import { render, screen } from '@testing-library/react';
import { StubEmptyFavoritesView } from './stub-empty-favorites-view';

describe('Component: StubEmptyFavoritesView', () => {
  it('should render', () => {
    const statusText = /Nothing yet saved./;
    const descriptionText = /Save properties to narrow down search or plan your future trips./;

    render(<StubEmptyFavoritesView/>);

    expect(screen.getByText(statusText)).toBeInTheDocument();
    expect(screen.getByText(descriptionText)).toBeInTheDocument();
  });

});
