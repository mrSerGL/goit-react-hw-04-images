import { Component } from 'react';
import PropTypes from 'prop-types';

import css from './Button.module.css';

export default class Button extends Component {
  render() {
    const { onNextPage } = this.props;
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
  }
}

Button.propTypes = {
  onNextPage: PropTypes.func,
};