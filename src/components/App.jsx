import { useState } from 'react';
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
  const [largeImageURL, setLargeImageURLl] = useState('');

  const onSubmit = searchQuery => {
    if (searchQuery === '') {
      Notiflix.Notify.info('You cannot search by empty field, try again.');
      return;
    }

    setSearchQuery(searchQuery);
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
      console.log('onNextPage say:', error.message);
    }
  };

  const onClickImage = url => {
    setShowModal(true);
    setLargeImageURLl(url);
  };

  const onModalClose = () => {
    setShowModal(false);
    setLargeImageURLl('');
  };

  return (
    // <div className={css.container}>
    <div>
      <Searchbar onSubmit={onSubmit} />
      {/* <ul className={css.App}> */}
        <ImageGallery firstPage={firstPage} onClickImage={onClickImage} />
      {/* </ul> */}
      {isLoading && <Loader />}
      {showBtn && <Button onNextPage={onNextPage} />}
      {showModal && (
        <Modal largeImageURL={largeImageURL} onModalClose={onModalClose} />
      )}
    </div>
  );
}
