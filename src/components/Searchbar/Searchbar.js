import React, { Component } from 'react';
import css from './Searchbar.module.css';


class Searchbar extends Component {
  state = {
    searchQuery: '',
  };

  onChangeInput = event => {
    let inputValue = event.target.value.trim();

    if (inputValue.length === 0) {
      alert('Enter request text!');
      return;
    }
    this.setState({ searchQuery: inputValue });
  
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.onSubmit(this.state.searchQuery);

  };

  render() {
    return (
      <>
        <header className={css.searchbar}>
          <form className={css.form} onSubmit={this.handleSubmit}>
            <button
              type="submit"
              className={css.button}
              onClick={this.props.onClick}
            >
              <span className={css.buttonlabel}></span>
            </button>

            <input
              className={css.input}
              type="text"
              autoComplete="off"
              autoFocus
              placeholder="Search images and photos"
              onChange={this.onChangeInput}
              onKeyDown={event => {
                if (event.code === 'Enter') {
                  this.handleSubmit(event);
                }
              }}
            />
          </form>
        </header>
      </>
    );
  }
}
export default Searchbar;
