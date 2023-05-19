import React, { Component } from 'react';

import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import Button from './Button';
import Loader from './Loader';
import Modal from './Modal';
import { fetchImages } from '../services/imageApi';

export class App extends Component {
  state = {
    searchQuery: '',
    images: [],
    page: 1,
    loading: false,
    showModal: false,
    largeImageURL: '',
    status: 'idle',
  };

  componentDidUpdate(_, prevState) {
    const { searchQuery, page, status } = this.state;

    if (status === 'searching' && (searchQuery !== prevState.searchQuery || page !== prevState.page)) {
      this.fetchData();
    }
  }

  handleSearchSubmit = query => {
    this.setState({
      searchQuery: query,
      page: 1,
      images: [],
      status: 'searching',
    });
  };

  openModal = () => {
    this.setState({ showModal: true });
    document.addEventListener('keydown', this.handleKeyDown);
  };

  closeModal = () => {
    this.setState({ showModal: false });
    document.removeEventListener('keydown', this.handleKeyDown);
  };

  handleKeyDown = (event) => {
    if (event.code === 'Escape') {
      this.closeModal();
    }
  };

  loadMoreImages = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
      status: 'searching',
    }));
  };

  fetchData = async () => {
    const { searchQuery, page } = this.state;

    try {
      this.setState({ loading: true });
      const data = await fetchImages(searchQuery, page);
      this.setState(prevState => ({
        images: [...prevState.images, ...data],
        
        status: 'idle',
      }));
    } catch (error) {
      console.error('Error fetching images:', error);
      this.setState({ status: 'idle' });
    } finally {
      this.setState({ loading: false });
    }
  };

  render() {
    const { images, loading, showModal, largeImageURL
 } = this.state;
    return (
      <div>
        <Searchbar onSubmit={this.handleSearchSubmit} />
        <ImageGallery images={images} onImageClick={this.openModal} />
        {loading && <Loader />}
        {images.length > 0 && !loading && <Button onClick={this.loadMoreImages} />}
        {showModal && (
          <Modal image={largeImageURL} onClose={this.closeModal} />
        )}
      </div>
    );
  }
}
