import React from 'react';
import ImageGalleryItem from './ImageGalleryItem';

const ImageGallery = ({ images, onImageClick }) => {
  return (
    <ul className="ImageGallery">
      {images.map(image => (
        <ImageGalleryItem key={image.id} image={image} onClick={() => onImageClick(image.largeImageURL)} />
      ))}
    </ul>
  );
};

export default ImageGallery;