export const ImageGalleryItem = ({
  webformatURL,
  largeImageURL,
  onSelectImage
}) => {
  return (
    <li
      className="ImageGalleryItem"
      onClick={() => onSelectImage(largeImageURL)}
    >
      <img
        className="ImageGalleryItem-image"
        src={webformatURL}
        alt="image"
        large={largeImageURL}
      />
    </li>
  );
};
