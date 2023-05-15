import React, { Component } from 'react';
import Notiflix from 'notiflix';
import Searchbar from './Searchbar';
import GalleryService from '../services/GalleryService';
import ImageGallery from './ImageGallery';
import Button from './Button';
import Loader from './Loader';
import Modal from './Modal';
import css from './App.module.css';

export default class App extends Component {
  state = {
    searchQuery: '',
    firstPage: [],
    page: 1,
    isLoading: false,
    showBtn: false,
    showModal: false,
    largeImageURL: '',
  };

  onSubmit = searchQuery => {
    if (searchQuery === '') {
      Notiflix.Notify.info('You cannot search by empty field, try again.');
      return;
    }

    this.setState({
      searchQuery: searchQuery,
      isLoading: true,
    });

    const galleryService = new GalleryService();
    galleryService.name = searchQuery;

    try {
      galleryService.getImages(this.state.searchQuery).then(response => {
        this.setState({
          firstPage: response.hits,
          isLoading: false,
        });

        if (response.hits.length < 12) {
          this.setState({ showBtn: false });
        }
        if (response.hits.length === 12) {
          this.setState({ showBtn: true });
        }
        if (response.hits.length === 0) {
          Notiflix.Notify.failure('No matches found!');
        }
      });
    } catch (error) {
      console.log('onSubmit say:', error.message);
    }
  };

  onNextPage = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
      isLoading: true,
    }));
  
    const galleryService = new GalleryService();
    galleryService.name = this.state.searchQuery;
    galleryService.page = this.state.page + 1;
  
    try {
      galleryService.getImages(this.state.searchQuery).then(response => {
        this.setState(prevState => ({
          firstPage: [...prevState.firstPage, ...response.hits],
          isLoading: false,
        }));
      });
    } catch (error) {
      console.log('onNextPage say:', error.message);
    }
  };

  onClickImage = url => {
    this.setState({ showModal: true, largeImageURL: url });
  };

  onModalClose = () => {
    this.setState({ showModal: false, largeImageURL: '' });
  };

  render() {
    return (
      <div className={css.container}>
        <Searchbar onSubmit={this.onSubmit} />
        <ul className={css.App}>
          <ImageGallery
            firstPage={this.state.firstPage}
            onClickImage={this.onClickImage}
          />
        </ul>
        {this.state.isLoading && <Loader />}
        {this.state.showBtn && <Button onNextPage={this.onNextPage} />}
        {this.state.showModal && (
          <Modal
            largeImageURL={this.state.largeImageURL}
            onModalClose={this.onModalClose}
          />
        )}
      </div>
    );
  }
}
