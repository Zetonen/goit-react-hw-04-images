import { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';
import { RotatingLines } from 'react-loader-spinner';
import { Notify } from 'notiflix';

import axios from 'axios';

const KEY = '36802723-0938614ccb0b003a152802b8b';

export class App extends Component {
  state = {
    search: '',
    gallery: [],
    total: null,
    page: 1,
    loadMore: false,
    loading: false,
    modalScr: null,
    notFound: false,
  };

  componentDidUpdate(nextProps, nextState) {
    if (this.state.search !== nextState.search) {
      this.getGallery();
    }
    if (this.state.page !== nextState.page) {
      this.searchMoreImage();
    }
  }
  submitForm = data => {
    if (!data) {
      Notify.failure('Введіть коректний запит');
      return;
    }
    this.setState({
      search: data,
      loadMore: false,
      page: 1,
      gallery: [],
      notFound: false,
    });
  };
  getGallery = async () => {
    try {
      this.setState({ loading: true });
      const response = await axios.get(
        `https://pixabay.com/api/?q=${this.state.search}&page=1&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`
      );

      const {
        data: { totalHits, hits },
      } = response;
      if (totalHits === 0) {
        this.setState({ loading: false, notFound: true });
        return;
      }

      this.setState({
        gallery: [...hits],
        total: totalHits,
        loading: false,
      });

      Notify.success(`Hooray! We found ${totalHits} images.`);

      if (hits.length < totalHits) {
        this.setState({ loadMore: true });
      }
    } catch (error) {
      console.log(error);
    }
  };
  loadMore = () => {
    this.setState({ page: this.state.page + 1 });
  };
  searchMoreImage = async () => {
    try {
      const { search, page, total } = this.state;
      this.setState({ loading: true });
      const response = await axios.get(
        `https://pixabay.com/api/?q=${search}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=${12}`
      );
      const {
        data: { hits },
      } = response;
      this.setState(prevState => ({
        gallery: [...prevState.gallery, ...hits],
        loading: false,
      }));
      if (page * 12 > total) {
        this.setState({ loadMore: false });
        Notify.info(
          "We're sorry, but you've reached the end of search results."
        );
      }
    } catch (error) {
      console.log(error);
    }
  };
  selectImage = src => {
    this.setState({ modalScr: src });
  };
  closeModal = () => {
    this.setState({ modalScr: null });
  };

  render() {
    const { gallery, loadMore, modalScr, loading, notFound } = this.state;
    return (
      <div className="App">
        {modalScr && <Modal src={modalScr} closeModal={this.closeModal} />}
        <Searchbar onSubmit={this.submitForm} />
        {gallery.length !== 0 && (
          <ImageGallery gallery={gallery} onSelectImage={this.selectImage} />
        )}
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
        {loadMore && (loading || <Button loadMore={this.loadMore} />)}
      </div>
    );
  }
}
