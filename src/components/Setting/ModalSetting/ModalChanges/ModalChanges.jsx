import React, {useCallback, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';
import PropTypes from 'prop-types';
// Store
import {
  setCategoriesSelector,
} from '../../../../store/filtering/selectors';
import {
  changeCategorySaga, changeDefCategorySaga
} from '../../../../store/filtering/actions';
// Component
import Button from '../../../Button';
import Input from '../../../Input';
// Style
import './style.scss';


const ModalSetting = ({selectCategory, renderCategory,  setValidator, validator}) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const categories = useSelector(setCategoriesSelector);
  const [isInput, setIsInput] = useState(false);
  const [title, setTitle] = useState('');
  const [isDisabled, setIsDisabled] = useState(false);
  queryString.parse(location.pathname);

  const changeCategories = useCallback(
    (id, data) => dispatch(changeCategorySaga(id, data)),
    [dispatch],
  );
  const changeDefCategories = useCallback(
    (id, data) => dispatch(changeDefCategorySaga(id, data)),
    [dispatch],
  )
  const changeInputValue = (e) => {
    setTitle(e.target.value);
    setValidator({
      validEmpty: '',
      validLength: '',
      validCategory: '',
    })
  }

  const onChangeCategory = (path, value) => {
    setIsDisabled(true)
    if (Object.keys(renderCategory).length) {
      if (title.trim() && title.length < 15) {
        const data = {
          [path]: value,
        };
        changeCategories(selectCategory, data);
      } else if (!title.trim()) {
        setValidator({
          ...validator,
          validEmpty: 'Введите имя'
        })
      } else if (title.length > 15) {
        setValidator({
          ...validator,
          validLength: 'Слишком длинное имя'
        })
      }
    } else {
      setValidator({
        ...validator,
        validCategory: 'Выберите категорию'
      })
    }
    setIsInput(false)
    setTimeout(()=>setIsDisabled(false), 3000)
    return (e) => {
      e.preventDefault();
    }
  }
  const installDefcategory = () => {
    setIsDisabled(true)
    if (Object.keys(renderCategory).length) {
      const prevDefcategory = categories.length && categories.find((el) => el.default);
      if (prevDefcategory.id !== selectCategory){
        changeDefCategories([selectCategory, prevDefcategory.id], [{default:true}, {default:false}]);
      }
    } else {
      setValidator({
        ...validator,
        validCategory: 'Выберите категорию'
      })
    }
    setTimeout(()=>setIsDisabled(false), 3000)
  }

  const valid = () => {
    if (validator.validEmpty) {
      return validator.validEmpty;
    } if (validator.validLength) {
      return validator.validLength;
    } if (validator.validCategory) {
      return validator.validCategory;
    }
    return null;
  }
  const textValid = valid();
  
  return ( 
    <>
      <p className="Form-task__validator">{textValid}</p>
      {isInput ? (
        <form 
          className="Modal-changes__form"
          onSubmit={() => onChangeCategory('name', title)}
        >
          <Input
            onChange={changeInputValue}
            value={title}
            placeholder="введите имя категории"
            classInput={(validator.validEmpty || validator.validLength) && true}
          />
          <Button primary type="submit" className="Modal-changes__button">Переименовать</Button>
        </form>
        ) : (
          <Button onClick={() => setIsInput(true)} primary type="button" className="Modal-changes__button">Переименовать</Button>
        )}
      <Button onClick={installDefcategory} primary className="Modal-changes__button" disabled={isDisabled}>Категория по умолчанию</Button>
    </>
  );
};

ModalSetting.defaultProps = {
  renderCategory: {}
};

ModalSetting.propTypes = {
  selectCategory: PropTypes.number.isRequired,
  renderCategory: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    color: PropTypes.string,
    svg: PropTypes.string,
    default: PropTypes.bool,
    delete: PropTypes.bool,
  }),
  validator: PropTypes.objectOf(PropTypes.string).isRequired,
  setValidator: PropTypes.func.isRequired,
};

export default ModalSetting;