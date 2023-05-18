import React from 'react';
import Modal from "./Modal";

class ImageGalleryItem extends React.Component {
  state = {
    modalOpen: false,
  };

  openModal = () => {
    this.setState({ modalOpen: true });
    document.addEventListener('keydown', this.handleKeyDown);
  };

  closeModal = () => {
    this.setState({ modalOpen: false });
    document.removeEventListener('keydown', this.handleKeyDown);
  };

  handleKeyDown = (event) => {
    if (event.code === 'Escape') {
      this.closeModal();
    }
  };

  render() {
    const { image } = this.props;
    const { webformatURL, largeImageURL } = image;
    const { modalOpen } = this.state;

    return (
      <>
        <li className='ImageGalleryItem' onClick={this.openModal}>
          <img className='ImageGalleryItem-image' src={webformatURL} alt="" />
        </li>

        {modalOpen && (
          <Modal />
        )}
      </>
    );
  }
}

export default ImageGalleryItem;
