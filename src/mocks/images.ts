import { image } from 'faker';

const ImageSize = {
  large: {
    height: 200,
    width: 260
  },
  small: {
    width: 150,
    height: 110
  }
} as const;

const CommentAvatarSize = {
  width: 54,
  height: 54
} as const;

export const makeFakePreviewImageWithSize = (size: keyof typeof ImageSize = 'large') => image.imageUrl(ImageSize[size].width, ImageSize[size].height);

export const makeFakeCommentAvatar = () => image.imageUrl(CommentAvatarSize.width, CommentAvatarSize.height);

export const makeFakeImageWithoutSizes = () => image.imageUrl();
