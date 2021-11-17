import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
// Icon
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
// Components
import Button from '../components/Button';
// Style
import style from './style.scss';

const cx = cn.bind(style);

const IconArrow = ({next, onClick}) => {
  const classBtn = cx(
    'Modal-setting__arrow',
    {'Modal-setting__arrow--prev': !next},
    {'Modal-setting__arrow--next': next}
  )
  return (
    <Button onClick={onClick} className={classBtn}>
      <div className="arrow">
        {next ? <ArrowForwardIosIcon className="icon-arrow" /> : <ArrowBackIosIcon className="icon-arrow" />}
      </div>
    </Button>
  );
};

IconArrow.defaultProps = {
  next: false,
  onClick: ()=>{}
};

IconArrow.propTypes = {
  next: PropTypes.bool,
  onClick: PropTypes.func,
};

export default IconArrow;