import React from 'react';
import classNames from 'classnames';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
// Style
import style from './style.scss';

const cx = classNames.bind(style);

const iconCheckMark = ({ isCheckedMark }) => {
  const classIcons = cx('Checked-mark');
  const classIcon = cx('Icon-check', {
    'Icon-check--completed': isCheckedMark,
  });
  return (
    <div className={classIcons}>
      <CheckCircleOutlineIcon className={classIcon} />
    </div>
  );
};
export default iconCheckMark;
