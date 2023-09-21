import { Component } from 'react';
import { fetchGallery } from 'services/gallery-api';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';
import { RotatingLines } from 'react-loader-spinner';
import { Notify } from 'notiflix';

export class App extends Component {
  state = {
    search: '',
    gallery: [],
    total: null,
    page: 1,
    loadMore: false,
    loading: false,
    showModal: false,
    modalScr: null,
    tags: null,
    notFound: false,
    error: null,
  };

  componentDidUpdate(prevProps, prevState) {
    const { search, page } = this.state;
    if (search !== prevState.search || page !== prevState.page) {
      this.getGallery();
    }
  }
  submitForm = data => {
    if (!data) {
      Notify.failure('Введіть коректний запит');
      return;
    }
    this.setState({
      search: data,
      page: 1,
      gallery: [],
      notFound: false,
      error: null,
    });
  };
  getGallery = async () => {
    const { search, page } = this.state;
    try {
      this.setState({ loading: true });
      const response = await fetchGallery(search, page);
      const {
        data: { totalHits, hits },
      } = response;

      if (hits.length === 0) {
        this.setState({ notFound: true });
        return;
      }

      this.setState(prevState => ({
        gallery: [...prevState.gallery, ...hits],
        total: totalHits,
      }));

      page === 1 && Notify.success(`Hooray! We found ${totalHits} images.`);
    } catch (error) {
      this.setState({ error: error.message });
    } finally {
      this.setState({ loading: false });
    }
  };
  loadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };
  openModal = (src, alt) => {
    this.setState({ modalScr: src, showModal: true, tags: alt });
  };
  closeModal = () => {
    this.setState({ modalScr: null, showModal: false, tags: null });
  };

  render() {
    const { gallery, showModal, modalScr, loading, notFound, error, total,tags } =
      this.state;
    const loadMore = total / gallery.length > 1;
    return (
      <div className="App">
        <Searchbar onSubmit={this.submitForm} />
        {gallery.length !== 0 && (
          <ImageGallery gallery={gallery} onSelectImage={this.openModal} />
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
        {loadMore && !loading && gallery.length > 0 && <Button loadMore={this.loadMore} />}
        {showModal && <Modal src={modalScr} closeModal={this.closeModal} tags={tags}/>}
      </div>
    );
  }
}
