
type OfferGalleryProps = {
    images: string[];
}
export const OfferGallery = ({ images }: OfferGalleryProps) => (
  <div className="offer__gallery-container container">
    <div className="offer__gallery">
      {
        images.slice(0, 6).map((imageSrc) => (
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
