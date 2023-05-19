import React from 'react';

class ImageGalleryItem extends React.Component {
  state = {
    modalOpen: false,
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
      </>
    );
  }
}

export default ImageGalleryItem;
