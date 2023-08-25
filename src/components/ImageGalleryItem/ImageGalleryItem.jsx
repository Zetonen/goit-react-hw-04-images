export const ImageGalleryItem = ({
  webformatURL,
  largeImageURL,
  onSelectImage,
  id
}) => {
  return (
    <li
      className="ImageGalleryItem"
      onClick={() => onSelectImage(largeImageURL)}
    >
      <img
        className="ImageGalleryItem-image"
        src={webformatURL}
        alt={id}
        large={largeImageURL}
      />
    </li>
  );
};
