import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import Close from '@material-ui/icons/CloseOutlined';
// Components
import Button from '../components/Button';
// Style
import style from './style.scss';

const cx = cn.bind(style);

const IconClose = ({className, onClick, type}) => {
  const classBtn = cx (
    'button__close',
    className
  )
  return(
    <Button type={type} onClick={onClick} className={classBtn}>
      <Close className='icon-close' />
    </Button>
)};

IconClose.defaultProps = {
  className: '',
  type: 'button',
  onClick: ()=>{}
};

IconClose.propTypes = {
  className: PropTypes.string,
  type: PropTypes.string,
  onClick: PropTypes.func,
};

export default IconClose;
