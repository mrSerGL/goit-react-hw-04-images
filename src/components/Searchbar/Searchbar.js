import { useState } from 'react';
import css from './Searchbar.module.css';


function Searchbar ({onSubmit}){

  const [searchQuery, setSearchQuery] = useState('');


  const onChangeInput = event => {
    let inputValue = event.target.value.trim();

    if (inputValue.length === 0) {
      alert('Enter request text!');
      return;
    }
    setSearchQuery(inputValue);
    // this.setState({ searchQuery: inputValue });
  
  };

  const handleSubmit = event => {
    event.preventDefault();
    onSubmit(searchQuery);

  };

  // render() {
    return (
      <>
        <header className={css.searchbar}>
          <form className={css.form} onSubmit={handleSubmit}>
            <button
              type="submit"
              className={css.button}
              onClick={onSubmit}
            >
              <span className={css.buttonlabel}></span>
            </button>

            <input
              className={css.input}
              type="text"
              autoComplete="off"
              autoFocus
              placeholder="Search images and photos"
              onChange={onChangeInput}
              onKeyDown={event => {
                if (event.code === 'Enter') {
                  handleSubmit(event);
                }
              }}
            />
          </form>
        </header>
      </>
    );
  // }
}
export default Searchbar;
