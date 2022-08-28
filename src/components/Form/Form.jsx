import { Component } from 'react';
import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';
import s from './form.module.css';

class Form extends Component {
  state = {
    name: '',
    number: '',
  };
  
  
  static defaultProps = {
    onSubmit: () => {},
  };
  static propTypes = {
    onSubmit: PropTypes.func,
  };

  nameId = nanoid();
  numberId = nanoid();

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.onSubmit({ ...this.state });
    this.reset();
  };

  reset = () => {
    this.setState({
      name: '',
      number: '',
    });
  };

  render() {
    const { name, number } = this.state;
    const { nameId, numberId } = this;
    const { handleSubmit, handleChange } = this;

    return (
      <>
        <form onSubmit={handleSubmit}>
          <div className={s.form__group}>
            <label htmlFor={nameId} className={s.form__label}>
              Name
            </label>
            <input
              placeholder="Vasilii Petrovich"
              id={nameId}
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
            <label htmlFor={numberId} className={s.form__label}>
              Number
            </label>
            <input
              placeholder="+380...."
              id={numberId}
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
  }
}

export default Form;
