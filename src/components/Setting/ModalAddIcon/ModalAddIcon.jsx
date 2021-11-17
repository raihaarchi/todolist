import React, { useState,useCallback, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import PropTypes from 'prop-types';
import { SketchPicker } from 'react-color';
// State
import { addCategoriesSaga } from '../../../store/filtering/actions';
import {
  setCategoriesSelector,
} from '../../../store/filtering/selectors';
// Components
import IconCategory from '../../../icons/iconCategory';
import Input from '../../Input';
import Button from '../../Button';
// Style
import './style.scss';

const ModalAddIcon = ({selectCategory, setSelectCategory}) => {
  const fileInput = useRef(null);
  const [file, setFile] = useState(null)
  const handleSubmit = (event) => {
    // highlight-range{3}
    event.preventDefault();
    setFile(fileInput.current.files[0].name)
    alert(
      `Selected file - ${fileInput.current.files[0].name}`
    );
  }

  return (
    <div className="Modal-add-icon Setting__modal-add-icon">
      {/* <IconCategory 
        categ={selectCategory ? renderNewCategory : renderCategory}
        classIcon='Modal-setting__category'
        classSvg="svg--exlarge"
        classNameIcon="Modal-setting__name-icon"
      /> */}
      <form onSubmit={handleSubmit}>
        <label htmlFor="input-file">
          Upload file:
          <input 
            type="file"
            ref={fileInput}
            id="input-file"
          />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

ModalAddIcon.propTypes = {
};

export default ModalAddIcon;