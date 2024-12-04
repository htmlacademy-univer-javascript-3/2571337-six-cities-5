import { render, screen } from '@testing-library/react';
import { Suspense } from './suspense';

describe('Component: Suspense', () => {
  const suspenseProps: {
        children: string;
        isLoading: boolean;
    } = {
      children: 'React Node',
      isLoading: false
    };

  it('should render correctly with isLoading=false', () => {
    const expectedNode = suspenseProps.children;

    render(<Suspense {...suspenseProps}/>);

    expect(screen.getByText(expectedNode)).toBeInTheDocument();
  });

  it('should render correctly with isLoading=true', () => {
    const notExpectedNode = suspenseProps.children;

    render(<Suspense {...suspenseProps} isLoading/>);

    expect(screen.queryByText(notExpectedNode)).not.toBeInTheDocument();
  });
});
