import { render, screen } from '@testing-library/react';

import { withHistory } from '../../mocks/mocks-component';
import { NotFoundPage } from './not-found-page';

describe('Component: NotFoundPage', () => {
  it('should render correctly', () => {
    const pageContainerTestId = 'notFoundPage__container';
    const expectedHeaderText = '404 Page Not Found';
    const expectedLinkText = 'На главную';
    const prependedComponent = withHistory(<NotFoundPage/>);

    render(prependedComponent);

    expect(screen.getByTestId(pageContainerTestId)).toBeInTheDocument();
    expect(screen.getByText(expectedHeaderText)).toBeInTheDocument();
    expect(screen.getByText(expectedLinkText)).toBeInTheDocument();
  });
});
