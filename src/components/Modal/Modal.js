import { useEffect } from 'react';
import PropTypes from 'prop-types';

import s from './Modal.module.css';

const Modal = ({ largeImageURL, onModalClose }) => {
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleKeyDown = event => {
    if (event.keyCode === 27 || event.currentTarget === event.target) {
      return onModalClose();
    }
  };

  return (
    <div className={s.Overlay} onClick={handleKeyDown}>
      <div className={s.Modal}>
        <img src={largeImageURL} alt="" />
      </div>
    </div>
  );
};

Modal.propTypes = {
  onModalClose: PropTypes.func,
  largeImageURL: PropTypes.string.isRequired,
};

export default Modal;
