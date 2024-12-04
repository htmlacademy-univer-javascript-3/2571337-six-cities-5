import { withHistory, withStore } from '../../../../mocks/mocks-component';
import { LocationItem } from './location-item';
import { render, screen } from '@testing-library/react';

describe('Component: LocationItem', () => {
  it('should render correctly', () => {
    const randomCityElement = 'randomCityElement';
    const componentWithRouting = withHistory(<LocationItem/>);
    const { componentWithStore: preparedComponent } = withStore(componentWithRouting);

    render(preparedComponent);

    expect(screen.getByTestId(randomCityElement)).toBeInTheDocument();
  });
});
