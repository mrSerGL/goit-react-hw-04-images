import { useState, useEffect } from 'react';
import Notiflix from 'notiflix';
import Searchbar from './Searchbar';
import GalleryService from '../services/GalleryService';
import ImageGallery from './ImageGallery';
import Button from './Button';
import Loader from './Loader';
import Modal from './Modal';
import './App.css';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [firstPage, setFirstPage] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [showBtn, setShowBtn] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState('');

  useEffect(() => {
    try {
      setIsLoading(true);
      getImages(searchQuery);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log('useEffect says:', error.message);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery]);

  const onSubmit = searchQuery => {
    if (searchQuery === '') {
      Notiflix.Notify.info('You cannot search by empty field, try again.');
      return;
    }

    setSearchQuery(searchQuery);
    setIsLoading(true);
  };

  const getImages = searchQuery => {
    setIsLoading(true);
    const galleryService = new GalleryService();
    galleryService.name = searchQuery;

    try {
      galleryService.getImages(searchQuery).then(response => {
        setFirstPage(response.hits);
        setIsLoading(false);

        if (response.hits.length < 12) {
          setShowBtn(false);
        }
        if (response.hits.length === 12) {
          setShowBtn(true);
        }
        if (response.hits.length === 0) {
          Notiflix.Notify.failure('No matches found!');
        }
      });
    } catch (error) {
      setIsLoading(false);
      console.log('onSubmit say:', error.message);
    }
  };

  const scrollToDown = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };

  const onNextPage = () => {
    setPage(prevState => prevState + 1);
    setIsLoading(true);

    const galleryService = new GalleryService();
    galleryService.name = searchQuery;
    galleryService.page = page + 1;

    try {
      galleryService.getImages(searchQuery).then(response => {
        setFirstPage(prevState => [...prevState, ...response.hits]);
        setIsLoading(false);
 
      });
    } catch (error) {
      setIsLoading(false);
      console.log('onNextPage says:', error.message);
    } 
  };

  useEffect(() => {
    if (page > 1) {
      scrollToDown();
    }
        // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [firstPage]);

  const onClickImage = url => {
    setShowModal(true);
    setLargeImageURL(url);
  };

  const onModalClose = () => {
    setShowModal(false);
    setLargeImageURL('');
  };

 

  return (
    <div>
      <Searchbar onSubmit={onSubmit} />
      <ImageGallery firstPage={firstPage} onClickImage={onClickImage} />
      {isLoading && <Loader />}
      {showBtn && <Button onNextPage={onNextPage} />}
      {showModal && (
        <Modal largeImageURL={largeImageURL} onModalClose={onModalClose} />
      )}
    </div>
  );
}
