import { Component } from 'react';
import css from './Searchbar.module.css';
import PropTypes from 'prop-types';

export default class Searchbar extends Component {
  state = {
    searchData: '',
  };

  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.onSubmit(this.state.searchData);
  };

  handleChange = evt => {
    const { value } = evt.target;
    this.setState({ searchData: value });
  };

  render() {
    const { handleChange, handleSubmit } = this;

    return (
      <header className={css.Searchbar}>
        <form className={css.SearchForm} onSubmit={handleSubmit}>
          <button type="submit" className={css.SearchForm__button}>
            <span className={css.SearchForm__button__label}>Search</span>
          </button>

          <input
            className={css.SearchForm__input}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={handleChange}
          />
        </form>
      </header>
    );
  }
}
