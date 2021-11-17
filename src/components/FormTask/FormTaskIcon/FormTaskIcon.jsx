import PropTypes from 'prop-types';
import React from 'react';
// Icons
import IconCheckMark from '../../../icons/iconCheckMark';
import IconTemplate from '../../../icons/iconTemplate';
// Style
import './style.scss';

const FormTaskIcon = ({ isCheckedMark, checkMark, addSelectCategory }) => (
  <div className="Form-task-icons Form-task__form-task-icons  icons">
    <IconTemplate formModal checkMark={checkMark} addSelectCategory={addSelectCategory} className="categories" />
    <IconCheckMark isCheckedMark={isCheckedMark} />
  </div>
);

FormTaskIcon.propTypes = {
  iconCheckedMark: PropTypes.bool.isRequired,
  checkMark: PropTypes.func.isRequired,
};

export default FormTaskIcon;
