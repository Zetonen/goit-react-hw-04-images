export const ImageGalleryItem = ({
  webformatURL,
  largeImageURL,
  onSelectImage,
  tags,
}) => {
  return (
    <li
      className="ImageGalleryItem"
      onClick={() => onSelectImage(largeImageURL, tags)}
    >
      <img
        className="ImageGalleryItem-image"
        src={webformatURL}
        alt={tags}
        large={largeImageURL}
      />
    </li>
  );
};
