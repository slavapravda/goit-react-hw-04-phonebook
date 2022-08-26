import PropTypes from 'prop-types';
import s from './contactList.module.css';

const ContactList = ({ items, removeContact }) => {
  return (
    <ul className={s.contact__list}>
      {items.map(({ id, name, number }) => (
        <li key={id} className={s.contact__item}>
          {name} : {number}
          <button
            className={s.contact__btn}
            key={id}
            onClick={() => removeContact(id)}
            type="button"
          >
            ❌
          </button>
        </li>
      ))}
    </ul>
  );
};

export default ContactList;

ContactList.defaultProps = {
  items: [],
};

ContactList.propTypes = {
  removeContact: PropTypes.func,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
};
