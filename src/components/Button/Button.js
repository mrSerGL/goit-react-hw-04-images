import PropTypes from 'prop-types';

import css from './Button.module.css';

const Button = onNextPage => {
  if (!onNextPage) return null;
  return (
    <button
      type="submit"
      className={css.Button}
      onClick={this.props.onNextPage}
    >
      Load more
    </button>
  );
};

Button.propTypes = {
  onNextPage: PropTypes.func,
};

export default Button;
