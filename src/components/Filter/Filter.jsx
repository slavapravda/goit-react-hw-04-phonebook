import PropTypes from 'prop-types'
import s from './filter.module.css'

const Filter = ({onChange}) => {
  return (
    <div>
      <label className={s.form__group}>Find contacts by name
        <input className={s.input} type="text" name="filter" placeholder="..." onChange={onChange}/>
      </label>
      </div>
  );
};

export default Filter;

Filter.propTypes = {
  onChange: PropTypes.func,
}