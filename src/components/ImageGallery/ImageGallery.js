
import PropTypes from 'prop-types';
import css from './ImageGallery.module.css';

const ImageGallery = ({firstPage,onClickImage}) => {

    if (!firstPage){ return null};
  
    return (
      <ul className={css.imageGallery }>
        {firstPage.map(({ id, webformatURL, tags, largeImageURL }) => (
          <li className={css.galleryItem} key={id}>
            <img 
            className={css.imageGalleryItemImage}
            onClick={() => onClickImage(largeImageURL)}
            src={webformatURL} 
            alt={tags}
            largeimage={largeImageURL} />
          </li>
        ))}
      </ul>
    );
  // }
}

ImageGallery.propTypes = {
  onClickImage: PropTypes.func.isRequired,
  firstPage: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default ImageGallery;
