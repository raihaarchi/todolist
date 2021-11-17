import React, { useState } from 'react';
import PropTypes from 'prop-types';
// Components
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';
import ModalChanges from './ModalChanges';
import ModalCreate from './ModalCreate';
// Store
import {
  setCategoriesSelector,
} from '../../../store/filtering/selectors';
// Hooks
import useValidation from '../../../hooks/useValidation';
// Icons
import IconArrow from '../../../icons/iconArrow'; 
import IconCategory from '../../../icons/iconCategory';
// Component
import Button from '../../Button';
// Style
import './style.scss';


const ModalSetting = ({selectCategory, setSelectCategory}) => {
  const location = useLocation();
  const { validator, setValidator } = useValidation();
  const [modalSetting, setModalSetting] = useState(true);
  const [selectColor, setSelectColor] = useState('#c8c8c8');
  const [name, setName] = useState('');
  const categories = useSelector(setCategoriesSelector);

  const checkCategory = categories.filter(({id}) => id === selectCategory);
  const renderCategory = categories.length && checkCategory.length ? categories.find(({ id }) => id === selectCategory) : {};
  const updateNewcategory = () => {
    if (renderCategory){
    const {id, ...rest} = renderCategory;
    return rest}
    return {}
  }
  const newCategory = updateNewcategory();
  const renderNewCategory = !modalSetting && selectCategory ? {...newCategory, color:selectColor, delete: true, name} : {};
  queryString.parse(location.pathname);

  const nextCategory = () => {
    if (selectCategory === categories.length) {
      setSelectCategory(1)
    } else {
      setSelectCategory(prev => prev + 1)
    }
    setValidator({
      ...validator,
      validCategory: ''
    })
  };

  const prevCategory = () => {
    if (selectCategory === 1) {
      setSelectCategory(categories.length)
    } else {
      setSelectCategory(prev => prev - 1)
    }
    setValidator({
      ...validator,
      validCategory: ''
    })
  };
  const changeMadalSetting = (bool) => {
    setModalSetting(bool);
    setValidator({
      validEmpty: '',
      validLength: '',
      validCategory: '',
    })
  }
  return ( 
    <div 
      className="Modal-setting"
    >
      <IconArrow onClick={prevCategory} />
      <div className="Modal-setting__buttons">
        <Button
          active={modalSetting}
          onClick={() => changeMadalSetting(true)}
          secondary
          className="Modal-setting__button"
          type="button"
        >
          Change category
        </Button>
        <Button
          active={!modalSetting}
          onClick={() => changeMadalSetting(false)}
          secondary
          className="Modal-setting__button"
          type="button"
        >
          Create category
        </Button>
      </div>
      <IconCategory 
        categ={!modalSetting && selectCategory ? renderNewCategory : renderCategory}
        classIcon='Modal-setting__category'
        classSvg="svg--exlarge"
        classNameIcon="Modal-setting__name-icon"
      />
      {modalSetting ? (
        <ModalChanges 
          selectCategory={selectCategory}
          renderCategory={renderCategory}
          validator={validator}
          setValidator={setValidator}
        />
      ) : (
        <ModalCreate 
          selectCategory={selectCategory}
          name={name}
          setName={setName}
          selectColor={selectColor}
          setSelectColor={setSelectColor}
          renderNewCategory={renderNewCategory}
          validator={validator}
          setValidator={setValidator}
        />
      )}
      <IconArrow next onClick={nextCategory} />
    </div>
  );
};

ModalSetting.propTypes = {
  selectCategory: PropTypes.number.isRequired,
  setSelectCategory: PropTypes.func.isRequired,
};

export default ModalSetting;