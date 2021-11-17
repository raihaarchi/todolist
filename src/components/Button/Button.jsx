/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
// Style
import style from './style.scss';

const cx = cn.bind(style);

const Button = ({
  active,
  primary,
  children,
  secondary,
  category,
  className,
  favorite,
  disabled,
  ...other
}) => {
  const classNames = cx(
    'button',
    className,
    { 'button--secondary': secondary },
    { 'button--secondary--dis': secondary && disabled},
    { 'button--category': category},
    { 'button--primary': primary },
    { 'button--primary--dis': primary && disabled },
    { 'button--active': active },
    { 'button--favorite--active': favorite },
  );

  return (
    <button className={classNames} type="button" disabled={disabled} {...other}>
      {children}
    </button>
  );
};

Button.defaultProps = {
  secondary: false,
  disabled: false,
  category: false,
  favorite: false,
  primary: false,
  active: false,
  className: '',
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  secondary: PropTypes.bool,
  category: PropTypes.bool,
  disabled: PropTypes.bool,
  favorite: PropTypes.bool,
  primary: PropTypes.bool,
  active: PropTypes.bool,
};

export default Button;
