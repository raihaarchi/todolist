import React, { useState } from 'react';
import PropTypes from 'prop-types';
// Components
import Button from '../components/Button';
// Icons
import SetIcon from './SetIcon';
import IconClose from './iconClose';
// Style
import './style.scss';

const IconCategory = ({
  settingModal,
  categ,
  classIcon,
  classSvg,
  classNameIcon,
  deleteComponent,
  multiFunction,
}) => {
  const [iconClose, setIconClose] = useState(false);
  const showDeleteIcon = () => {
    setIconClose(!iconClose);
  };
  const checkCateg = Object.keys(categ).length;
  return (
    <label
      className={classIcon}
      onMouseEnter={showDeleteIcon}
      onMouseLeave={showDeleteIcon}
      htmlFor={checkCateg && categ.id}
      key={checkCateg && categ.id}
    >
      <Button onClick={() => multiFunction(categ.id)} category type="button" id={checkCateg && categ.id}>
        <SetIcon svg={categ} classSvg={classSvg || ''} />
      </Button>
      <div className={classNameIcon}>{checkCateg ? categ.name : 'выберите категорию'}</div>
      {checkCateg && categ.delete && settingModal && iconClose ? (
        <IconClose className='button__close--icon' onClick={() => deleteComponent(categ.id)} type="button" />
      ) : ''}
    </label>
  );
};

IconCategory.defaultProps = {
  categ: null,
  classIcon: '',
  classNameIcon: '',
  deleteComponent: () => {},
  multiFunction: () => {},
  settingModal: false,
  classSvg:'',
};

IconCategory.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  categ: PropTypes.object,
  classIcon: PropTypes.string,
  classSvg: PropTypes.string,
  settingModal: PropTypes.bool,
  multiFunction: PropTypes.func,
  classNameIcon: PropTypes.string,
  deleteComponent: PropTypes.func,
};

export default IconCategory;
