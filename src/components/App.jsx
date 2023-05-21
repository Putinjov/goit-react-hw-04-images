import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Searchbar from './SearchBar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import fetchImagesWithQuery from 'services/imageApi';
import Modal from './Modal/Modal';
import Loader from './Loader/Loader';
import Button from './Button/Button';
import css from './App.module.css';

export class App extends Component {
  state = {
    searchData: '',
    images: [],
    page: 0,
    largeImage: '',
    showModal: false,
    isLoading: false,
    error: null,
    showButton: false,
    totalPages: 0,
  };

  componentDidUpdate(prevProps, prevState) {
    const { searchData, page } = this.state;

    if (prevState.page !== page || prevState.searchData !== searchData) {
      this.fetchImages();
    }
  }

  fetchImages = async () => {
    const { searchData, page, images } = this.state;

    try {
      this.setState({ isLoading: true });
      const response = await fetchImagesWithQuery(searchData, page);
      const data = response.data;

      if (data.hits.length === 0) {
        toast.error('Nothing found', {
          position: toast.POSITION.TOP_CENTER,
        });
        this.setState({ showButton: false });
        return;
      }

      const newImages = data.hits.filter(({ id }) => !images.some(image => image.id === id));
      const totalPages = Math.ceil(data.totalHits / 12);
      this.setState(prevState => ({
        images: [...prevState.images, ...newImages],
        showButton: prevState.page < totalPages,
        totalPages: totalPages,
      }));
    } catch (error) {
      this.setState({ error });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  onSubmit = searchData => {
    if (searchData.trim() === '') {
      toast.error('Enter the meaning for search', {
        position: toast.POSITION.TOP_CENTER,
      });
      return;
    }

    if (searchData === this.state.searchData) {
      return;
    }

    this.setState({
      searchData: searchData,
      page: 1,
      images: [],
    });
  };

  nextPage = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  openModal = index => {
    const { images } = this.state;

    this.setState({
      showModal: true,
      largeImage: images[index].largeImageURL,
    });
  };

  toggleModal = () => {
    this.setState(prevState => ({ showModal: !prevState.showModal }));
  };

  render() {
    const { images, isLoading, largeImage, showModal, showButton } = this.state;

    return (
      <div className={css.App}>
        <Searchbar onSubmit={this.onSubmit} />
        {images.length > 0 && (
          <ImageGallery images={images} openModal={this.openModal} />
        )}
        {showModal && <Modal toggleModal={this.toggleModal} largeImage={largeImage} />}
        {isLoading && <Loader />}
        <ToastContainer autoClose={2500} />
        {showButton && <Button nextPage={this.nextPage} />}
      </div>
    );
  }
}
