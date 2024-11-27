import { withHistory, withStore } from '../../mocks/mocks-component';
import { ButtonToBookmark } from './button-to-bookmark';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

const mockClickHandler = vi.fn();

describe('Component: ButtonToBookmark', () => {
  let buttonToBookmarkProps: {
    block: string;
    size: 'big' | 'small';
    isFavorite: boolean;
    onClick: () => void;
  };

  beforeEach(() => {
    vi.clearAllMocks();
    buttonToBookmarkProps = {
      block:'block',
      isFavorite: false,
      size: 'small',
      onClick: mockClickHandler
    };
  });

  it('should render correctly with isFavorite = false', () => {
    const expectedText = /To bookmarks/;
    const expectedButtonClass = `${buttonToBookmarkProps.block}-button`;
    const notExpectedButtonClass = `${buttonToBookmarkProps.block}-button--active`;
    const componentWithHistory = withHistory(
      <ButtonToBookmark
        {...buttonToBookmarkProps}
      />
    );
    const { componentWithStore: prepandedComponent } = withStore(componentWithHistory);

    render(prepandedComponent);

    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByRole('button')).toHaveClass(expectedButtonClass);
    expect(screen.getByRole('button')).not.toHaveClass(notExpectedButtonClass);
    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });

  it('should render correctly with isFavorite = true', () => {
    const expectedButtonClass = `${buttonToBookmarkProps.block}-button--active`;
    const componentWithHistory = withHistory(
      <ButtonToBookmark
        {...buttonToBookmarkProps}
        isFavorite
      />
    );
    const { componentWithStore: prepandedComponent } = withStore(componentWithHistory);

    render(prepandedComponent);

    expect(screen.getByRole('button')).toHaveClass(expectedButtonClass);
  });

  it('should clicked on button once', async () => {
    const componentWithHistory = withHistory(
      <ButtonToBookmark
        {...buttonToBookmarkProps}
      />
    );
    const { componentWithStore: prepandedComponent } = withStore(componentWithHistory);
    vi.spyOn(buttonToBookmarkProps, 'onClick');

    render(prepandedComponent);
    await userEvent.click(screen.getByTestId('buttonToBookmark'));

    expect(mockClickHandler).toBeCalledTimes(1);
  });
});
