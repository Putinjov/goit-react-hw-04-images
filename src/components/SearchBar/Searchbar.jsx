import React from 'react';
import { Formik, Form, Field } from 'formik';
import PropTypes from 'prop-types';
import css from './Searchbar.module.css';

const Searchbar = ({ onSubmit }) => {
  const initialValues = {
    searchData: '',
  };

  const handleSubmit = (values, { resetForm }) => {
    onSubmit(values.searchData);
    resetForm();
  };

  const validateForm = values => {
    const errors = {};
    if (!values.searchData) {
      errors.searchData = 'Please enter a search term';
    }
    return errors;
  };

  return (
    <header className={css.Searchbar}>
      <Formik initialValues={initialValues} onSubmit={handleSubmit} validate={validateForm}>
        <Form className={css.SearchForm}>
          <button type="submit" className={css.SearchForm__button}>
            <span className={css.SearchForm__button__label}>Search</span>
          </button>

          <Field
            className={css.SearchForm__input}
            type="text"
            autoComplete="off"
            name="searchData"
            placeholder="Search images and photos"
          />
        </Form>
      </Formik>
    </header>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;
