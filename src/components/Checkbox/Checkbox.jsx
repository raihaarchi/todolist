import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
// Style
import style from './style.scss';

const cx = cn.bind(style);

const Checkbox = ({
 heading, checked, id, className, ...other 
}) => {
  const classCheckbox = cx('Checkbox',className)
  return(
    <div className={classCheckbox}>
      <h4 className="Checkbox__heading">{heading}</h4>
      <label className="Checkbox__switch" htmlFor={id}>
        <input
          className="Checkbox__input"
          checked={checked}
          type="checkbox"
          {...other}
          readOnly
          id={id}
        />
        <span className="Checkbox__slider Checkbox__round" />
      </label>
    </div>
)};

Checkbox.defaultProps = {
  className: '',
  heading: '',
  checked: false,
  onClick: () => {},
};

Checkbox.propTypes = {
  className: PropTypes.string,
  heading: PropTypes.string,
  checked: PropTypes.bool,
  onClick: PropTypes.func,
  id: PropTypes.string.isRequired,
};

export default Checkbox;
