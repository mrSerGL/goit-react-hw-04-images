import { useState, useEffect, useMemo } from 'react';
import Notiflix from 'notiflix';
import Searchbar from './Searchbar';
import FetchImages from '../services/FetchImages';
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

    setPage(page => page + 1);

    setSearchQuery(searchQuery);
    setIsLoading(true);
  };

  const getImages = searchQuery => {
    setIsLoading(true);

    try {
      FetchImages(searchQuery, page).then(response => {
        setFirstPage(response.hits);
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
      });
    } catch (error) {
      setIsLoading(false);
      console.log('onSubmit say:', error.message);
    }
  };

  const onNextPage = () => {
    // setPage(prevState => prevState + 1);
    setPage(page => page + 1);
    setIsLoading(true);
    console.log(page);

    try {
      FetchImages(searchQuery, page).then(response => {
        setFirstPage(prevState => [...prevState, ...response.hits]);
        setIsLoading(false);
      });
    } catch (error) {
      setIsLoading(false);
      console.log('onNextPage says:', error.message);
    }
 
  };

  const scrollToDown = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };

  // if firstPage fhanged - scrollToDown 
  useEffect(() => {
    if (page > 1) {
      scrollToDown();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [firstPage]);

    // Используем useMemo для кэширования изображений
    const cachedImages = useMemo(() => {
      // Возвращаем кэшированный результат или пустой массив, если нет кэша
      return firstPage.length > 0 ? firstPage : [];
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
      <Searchbar onSubmit={onSubmit} id="top"/>
      <ImageGallery firstPage={cachedImages} onClickImage={onClickImage} />
      {isLoading && <Loader />}
      {/* {showBtn && <Button onNextPage={onNextPage} />} 
      */}
            {showBtn && <Button onNextPage={onNextPage} />}
      {showModal && (
        <Modal largeImageURL={largeImageURL} onModalClose={onModalClose} />
      )}
    
      <a href="#top"><button className="upButton"></button></a>
    </div>
  );
}
