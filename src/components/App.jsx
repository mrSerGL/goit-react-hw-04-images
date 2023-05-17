import { useState, useEffect, useMemo } from 'react';
import Notiflix from 'notiflix';
import Searchbar from './Searchbar';
import FetchImages from '../services/FetchImages';
import ImageGallery from './ImageGallery';
// import Button from './Button';
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

  const onSubmit = searchQuery => {
    if (searchQuery !== '') {
      setPage(1);
      setFirstPage([]);
      setSearchQuery(searchQuery);
    }
  };

  useEffect(() => {
    if (searchQuery === '') {
      return;
    }

    setIsLoading(true);

    try {
      FetchImages(searchQuery, page).then(response => {
        setFirstPage(prevState => [...prevState, ...response.hits]);
        setIsLoading(false);

        if (response.hits.length < 12) {
          setShowBtn(false);
        }
        if (response.hits.length >= 12) {
          setShowBtn(true);
        }
        if (response.hits.length === 0) {
          Notiflix.Notify.failure('No matches found!');
        }
        setIsLoading(false);
      });
    } catch (error) {
      setIsLoading(false);
      console.log('onSubmit say:', error.message);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery, page]);

  useEffect(() => {
    // if firstPage changed - scrollToDown
    if (page > 1) {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth',
      });
    }
    // if firstPage.length >= 12 - showBtn
    if (firstPage.length >= 12) {
      setShowBtn(true);
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

  // Use useMemo to cache the images

  const cachedImages = useMemo(() => {
    return firstPage.length > 0 ? firstPage : [];
  }, [firstPage]);

  return (
    <div>
      <Searchbar onSubmit={onSubmit} id="top" />
      <ImageGallery firstPage={cachedImages} onClickImage={onClickImage} />
      {isLoading && <Loader />}
      {showBtn && (
        <button
          type="submit"
          className="Button"
          onClick={() => setPage(page => page + 1)}
        >
          Load more
        </button>
      )}

      {showModal && (
        <Modal largeImageURL={largeImageURL} onModalClose={onModalClose} />
      )}

      <a href="#top">
        <button className="upButton"></button>
      </a>
    </div>
  );
}
