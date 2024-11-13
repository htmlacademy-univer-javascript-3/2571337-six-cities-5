import cn from 'classnames';

const SvgSize = {
  small: {
    width: 18,
    heigth: 19
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
}

export const ButtonToBookmark = ({ block, size, isFavorite }: ButtonToBookmarkProps) => (
  <button
    className={cn('button', `${block}-button`, {[`${block}-button--active`]: isFavorite})}
    type="button"
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
