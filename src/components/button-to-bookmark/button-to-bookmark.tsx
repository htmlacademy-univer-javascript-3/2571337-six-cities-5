import cn from 'classnames';

const SvgSize = {
  small: {
    width: 18,
    height: 19
  },
  big: {
    width: 31,
    height: 33
  }
} as const;

type ButtonToBookmarkProps = {
    block: string;
    size: keyof typeof SvgSize;
    isFavorite: boolean;
    onClick: () => void;
}

export const ButtonToBookmark = ({ block, size, isFavorite, onClick }: ButtonToBookmarkProps) => {
  const handleButtonToBookmarkClick = () => onClick();
  return (
    <button
      className={cn('button', `${block}-button`, {[`${block}-button--active`]: isFavorite})}
      type="button"
      onClick={handleButtonToBookmarkClick}
      data-testid="buttonToBookmark"
    >
      <svg
        className={cn(`${block}-icon`)}
        {...SvgSize[size]}
      >
        <use xlinkHref="#icon-bookmark" />
      </svg>
      <span className="visually-hidden">To bookmarks</span>
    </button>
  );
};
