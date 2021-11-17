import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
// Store
import { setCategoriesSelector } from '../store/filtering/selectors';
import {deleteCategorySaga} from '../store/filtering/actions';
// Components
import IconCategory from './iconCategory';
// Style
import style from './style.scss';

const cx = cn.bind(style);

const IconTemplate = ({
  formModal,
  checkMark,
  settingModal,
  filterModal,
  closeIconSelection,
  changeCategory,
  addSelectCategory,
  filterByCategory,
  className,
}) => {
  const dispatch = useDispatch();
  const categories = useSelector(setCategoriesSelector);

  const deleteCategory = useCallback(
    (id) => dispatch(deleteCategorySaga(id)),
    [dispatch],
  );

  const multiFunction = (category) => {
    if (filterModal) {
      filterByCategory(category);
      closeIconSelection();
    } else if (formModal) {
      addSelectCategory(category);
      checkMark();
    } else if (settingModal) {
      changeCategory(category);
    }
  };
  const deleteComponent = (id) => {
    deleteCategory(id);
  };

  const classIcon = cx('Icon-template', {
    'Icon-template--row': filterModal,
    'Icon-template--column': formModal || settingModal,
  });

  const classNameIcon = cx('Icon-template__name', {
    'Icon-template__name--row': filterModal,
    'Icon-template__name--column': formModal || settingModal,
  });
  const icon = categories.map((categ) => (
    <IconCategory
      settingModal={settingModal}
      categ={categ}
      classIcon={classIcon}
      classNameIcon={classNameIcon}
      deleteComponent={deleteComponent}
      multiFunction={multiFunction}
      key={categ.id}
    />
  ));
  return (
    <div className={className}>
      {icon}
    </div>
  );
};

IconTemplate.defaultProps = {
  className: '',
  formModal: false,
  checkMark: ()=>{},
  filterModal: false,
  settingModal: false,
  changeCategory: ()=>{},
  filterByCategory: ()=>{},
  addSelectCategory: ()=>{},
  closeIconSelection: ()=>{},
};

IconTemplate.propTypes = {
  formModal: PropTypes.bool,
  checkMark: PropTypes.func,
  filterModal: PropTypes.bool,
  className: PropTypes.string,
  settingModal: PropTypes.bool,
  changeCategory: PropTypes.func,
  filterByCategory: PropTypes.func,
  addSelectCategory: PropTypes.func,
  closeIconSelection: PropTypes.func,
};

export default IconTemplate;
