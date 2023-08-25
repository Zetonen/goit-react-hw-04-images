import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';

export const ImageGallery = ({gallery, onSelectImage}) => {
  return (
    <ul className="ImageGallery">
        {gallery.map(({id, webformatURL, largeImageURL}) => <ImageGalleryItem key={id} webformatURL={webformatURL} largeImageURL={largeImageURL} onSelectImage={onSelectImage}/>)}
      
    </ul>
  );
};
