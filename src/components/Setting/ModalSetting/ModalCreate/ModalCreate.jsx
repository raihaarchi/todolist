import React, { useState,useCallback } from 'react';
import { useDispatch } from 'react-redux'
import PropTypes from 'prop-types';
import { SketchPicker } from 'react-color';
// State
import { addCategoriesSaga } from '../../../../store/filtering/actions';
// Components
import Input from '../../../Input';
import Button from '../../../Button';
// Style
import './style.scss';

const ModalCreate = ({name, setName, setSelectColor, selectColor, renderNewCategory, setValidator, validator}) => {
  const dispatch = useDispatch();
  const [disabled, setDisabled] = useState(false);

  const onNameChange = (e) => {
    setName(e.target.value);
    setValidator({
      validEmpty: '',
      validLength: '',
      validCategory: '',
    })
  };

  const addCategories = useCallback(
    (data) => dispatch(addCategoriesSaga(data)),
    [dispatch]
  );

  const createCategory = () => {
    setDisabled(true)
    if (Object.keys(renderNewCategory).length){
      if (renderNewCategory.name.trim() && renderNewCategory.name.length < 10){
        setDisabled(true)
        addCategories(renderNewCategory);
        setName('');
      } else if (!renderNewCategory.name.trim()) {
        setValidator({
          ...validator,
          validEmpty: 'Введите имя'
        })
      } else if (renderNewCategory.name.length > 10) {
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
    setDisabled(false)
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
    <div className="Modal-create">
      <p className="Form-task__validator">{textValid}</p>
      <Input 
        value={name}
        onChange={onNameChange}
        placeholder="введите имя категории"
        headering="name:"
        classInput={!!((validator.validEmpty || validator.validLength))}
      />
      <span>
        <p>color:</p>
        <SketchPicker 
          color={selectColor}
          onChangeComplete={(color) => setSelectColor(color.hex)}
          className="Modal-create__pickter"
        />
      </span>
      <Button
        onClick={createCategory}
        secondary
        className="Modal-create__button"
        type="button"
        disabled={disabled}
      >
        Add category
      </Button>
        
    </div>
  );
};

ModalCreate.propTypes = {
  setName: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  setSelectColor: PropTypes.func.isRequired,
  selectColor: PropTypes.string.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  renderNewCategory: PropTypes.object.isRequired,
  validator: PropTypes.objectOf(PropTypes.string).isRequired,
  setValidator: PropTypes.func.isRequired,
};

export default ModalCreate;
