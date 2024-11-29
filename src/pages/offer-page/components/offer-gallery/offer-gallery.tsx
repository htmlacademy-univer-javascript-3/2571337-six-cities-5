import { OFFER_IMAGES_MAX_COUNT } from '../../../../constants/offers';

type OfferGalleryProps = {
    images: string[];
}
export const OfferGallery = ({ images }: OfferGalleryProps) => (
  <div className="offer__gallery-container container">
    <div data-testid="galleryContainer" className="offer__gallery">
      {
        images.slice(0, OFFER_IMAGES_MAX_COUNT).map((imageSrc) => (
          <div className="offer__image-wrapper" key={imageSrc}>
            <img
              className="offer__image"
              src={imageSrc}
              alt="Photo studio"
            />
          </div>
        ))
      }
    </div>
  </div>
);
