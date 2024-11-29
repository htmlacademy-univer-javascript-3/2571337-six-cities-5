import { render, screen } from '@testing-library/react';
import { OFFER_IMAGES_MAX_COUNT } from '../../../../constants/offers';
import { makeFakeImageWithoutSizes } from '../../../../mocks/images';
import { OfferGallery } from './offer-gallery';

describe('Component: OfferGallery', () => {
  const offerGalleryProps: {
        images: string[];
    } = {
      images: Array(OFFER_IMAGES_MAX_COUNT).fill('').map(() => makeFakeImageWithoutSizes())
    };
  it('should render correctly with length=OFFER_IMAGES_MAX_COUNT', () => {
    const expectedImagesLength = OFFER_IMAGES_MAX_COUNT;
    const galleryContainerTestId = 'galleryContainer';

    render(<OfferGallery {...offerGalleryProps}/>);

    expect(screen.getByTestId(galleryContainerTestId).childNodes.length).toBe(expectedImagesLength);
  });

  it('should render correctly with length > OFFER_IMAGES_MAX_COUNT', () => {
    const expectedImagesLength = OFFER_IMAGES_MAX_COUNT;
    const galleryContainerTestId = 'galleryContainer';

    render(<OfferGallery {...offerGalleryProps} images={[...offerGalleryProps.images, makeFakeImageWithoutSizes()]}/>);

    expect(screen.getByTestId(galleryContainerTestId).childNodes.length).toBe(expectedImagesLength);
  });
});
