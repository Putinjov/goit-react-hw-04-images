import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Searchbar from './SearchBar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import fetchImages from 'services/imageApi';
import Modal from './Modal/Modal';
import Loader from './Loader/Loader';
import Button from './Button/Button';
import css from './App.module.css';

export const App = () => {
  const [searchData, setSearchData] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [largeImage, setLargeImage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showButton, setShowButton] = useState(false);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    if (searchData !== '') {
      fetchImagesData();
    }
  }, [page, searchData]);

  const fetchImagesData = async () => {
    try {
      setIsLoading(true);
      const response = await fetchImages(searchData, page);
      const data = response.data;

      if (data.hits.length === 0) {
        toast.error('Nothing found', {
          position: toast.POSITION.TOP_CENTER,
        });
        setShowButton(false);
        return;
      }

      const newImages = data.hits.filter(
        ({ id }) => !images.some(image => image.id === id)
      );
      const totalPages = Math.ceil(data.totalHits / 12);
      setImages(prevImages => [...prevImages, ...newImages]);
      setShowButton(page < totalPages);
      setTotalPages(totalPages);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = searchData => {
    if (searchData.trim() === '') {
      toast.error('Enter the meaning for search', {
        position: toast.POSITION.TOP_CENTER,
      });
      return;
    }

    if (searchData === searchData) {
      return;
    }

    setSearchData(searchData);
    setPage(1);
    setImages([]);
  };

  const nextPage = () => {
    setPage(prevPage => prevPage + 1);
  };

  const openModal = index => {
    setLargeImage(images[index].largeImageURL);
    setShowModal(true);
  };

  const toggleModal = () => {
    setShowModal(prevShowModal => !prevShowModal);
  };

  return (
    <div className={css.App}>
      <Searchbar onSubmit={onSubmit} />
      {images.length > 0 && (
        <ImageGallery images={images} openModal={openModal} />
      )}
      {showModal && <Modal toggleModal={toggleModal} largeImage={largeImage} />}
      {isLoading && <Loader />}
      <ToastContainer autoClose={2500} />
      {showButton && <Button nextPage={nextPage} />}
    </div>
  );
};
