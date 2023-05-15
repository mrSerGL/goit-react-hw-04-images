import { Component } from 'react';
import PropTypes from 'prop-types';

import s from './Modal.module.css';

export default class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = event => {
    if (event.keyCode === 27 || event.currentTarget === event.target) {
      return this.props.onModalClose();
    }
  };

  render() {
    const { largeImageURL } = this.props;
    return (
      <div className={s.Overlay} onClick={this.handleKeyDown}>
        <div className={s.Modal}>
          <img src={largeImageURL} alt="" />
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  onModalClose: PropTypes.func,
  largeImageURL: PropTypes.string.isRequired,
};