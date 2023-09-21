import { useState, useEffect } from 'react';
import { fetchGallery } from 'services/gallery-api';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';
import { RotatingLines } from 'react-loader-spinner';
import { Notify } from 'notiflix';

export const App = () => {
  const [search, setSearch] = useState('');
  const [gallery, setGallery] = useState([]);
  const [total, setTotal] = useState(null);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalScr, setModalSrc] = useState(null);
  const [tags, setTags] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const [error, setError] = useState(null);

  const submitForm = data => {
    if (!data) {
      Notify.failure('Введіть коректний запит');
      return;
    }
    setSearch(data);
    setPage(1);
    setGallery([]);
    setNotFound(false);
    setError(null);
  };

  const handlesLoadMore = () => {
    setPage(prevState => prevState + 1);
  };
  const openModal = (src, alt) => {
    setModalSrc(src);
    setShowModal(true);
    setTags(alt);
  };
  const closeModal = () => {
    setModalSrc(null);
    setShowModal(false);
    setTags(null);
  };
  useEffect(() => {
    const getGallery = async () => {
      try {
        setLoading(true);
        const response = await fetchGallery(search, page);
        const {
          data: { totalHits, hits },
        } = response;

        if (hits.length === 0) {
          setNotFound(true);
          return;
        }
        setGallery(prevState => [...prevState, ...hits]);
        setTotal(totalHits);
        page === 1 && Notify.success(`Hooray! We found ${totalHits} images.`);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    if (search) {
      getGallery();
    }
  }, [search, page]);

  const loadMoreBtn = total / gallery.length > 1;
  return (
    <div className="App">
      <Searchbar onSubmit={submitForm} />
      {gallery.length !== 0 && (
        <ImageGallery gallery={gallery} onSelectImage={openModal} />
      )}
      {error && <p>{error}</p>}
      {notFound && (
        <p style={{ textAlign: 'center', fontSize: '32px' }}>
          Нічого не знайдено
        </p>
      )}
      {loading && (
        <div style={{ margin: 'auto' }}>
          <RotatingLines
            strokeColor="grey"
            strokeWidth="5"
            animationDuration="0.75"
            width="96"
            visible={true}
          />
        </div>
      )}
      {loadMoreBtn && !loading && gallery.length > 0 && (
        <Button loadMore={handlesLoadMore} />
      )}
      {showModal && (
        <Modal src={modalScr} closeModal={closeModal} tags={tags} />
      )}
    </div>
  );
};
