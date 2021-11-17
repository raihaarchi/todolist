import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
// Style
import style from './style.scss';

const cx = cn.bind(style);

const Input = ({
  value, onChange, placeholder, headering, className, classInput
}) => {
  const classSearch = cx(
    'Input__search',
    {'Input__search--valid' : classInput}
  )
  return(
    <div className={`Input ${className}`}>
      <h4>{headering}</h4>
      <input
        className={classSearch}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
      />
    </div>
)};

Input.defaultProps = {
  headering: '',
  className: '',
  classInput: false
};

Input.propTypes = {
  placeholder: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  headering: PropTypes.string,
  className: PropTypes.string,
  classInput: PropTypes.bool,
};

export default Input;
