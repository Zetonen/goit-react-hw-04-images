import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';

export const ImageGallery = ({gallery, onSelectImage}) => {
  return (
    <ul className="ImageGallery">
        {gallery.map(({id, webformatURL, largeImageURL, tags}) => <ImageGalleryItem key={id} id={id} webformatURL={webformatURL} largeImageURL={largeImageURL} onSelectImage={onSelectImage} tags={tags}/>)}
      
    </ul>
  );
};
