import { Formik, Form, Field } from 'formik';
import { BsSearch } from 'react-icons/bs';

export const Searchbar = ({ onSubmit }) => {
  const handleSubmit = async (value, actions) => {
    const corectValue = value.search.trim();
    await onSubmit(corectValue);
    actions.setSubmitting(false);
    actions.resetForm();
  };
  return (
    <header className="Searchbar">
      <Formik initialValues={{ search: '' }} onSubmit={handleSubmit}>
        <Form className="SearchForm">
          <button type="submit" className="SearchForm-button">
            <BsSearch />
            <span className="SearchForm-button-label">Search</span>
          </button>

          <Field
            className="SearchForm-input"
            name="search"
            type="text"
            placeholder="Search images and photos"
          />
        </Form>
      </Formik>
    </header>
  );
};
