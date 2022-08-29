import { useState } from 'react';

import PropTypes from 'prop-types';

import s from './form.module.css';

const Form = ({ onSubmit }) => {
  const [state, setState] = useState({
    name: '',
    number: '',
  });

  const { name, number } = state;

  const handleChange = ({ target }) => {
    const { name, value } = target;
    
    setState(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = event => {
    event.preventDefault();
    onSubmit({ ...state });
    setState({
      name: '',
      number: '',
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className={s.form__group}>
          <label className={s.form__label}>Name</label>
          <input
            placeholder="Vasilii Petrovich"
            value={name}
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            onChange={handleChange}
          />
        </div>
        <div className={s.form__group}>
          <label className={s.form__label}>Number</label>
          <input
            placeholder="+380...."
            value={number}
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
            onChange={handleChange}
          />
        </div>
        <button className={s.form__btn} type="submit">
          Add contact
        </button>
      </form>
    </>
  );
};
export default Form;

Form.propTypes = { 
  onSubmit: PropTypes.func.isRequired,
}