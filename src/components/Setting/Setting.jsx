import React, {useCallback, useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouteMatch } from 'react-router-dom';
import queryString from 'query-string';
// Store
import { toggleIsFetchingAction } from '../../store/tasks/actions';
import {
  setCategoriesSelector,
} from '../../store/filtering/selectors';
import { setCategorySaga } from '../../store/filtering/actions';
// Hooks 
import useQuery from '../../hooks/useQuery';
// Icons
import SetIcon from '../../icons/SetIcon';
import IconTemplate from '../../icons/iconTemplate';
import IconClose from '../../icons/iconClose';
// Component
import Button from '../Button';
import ModalSetting from './ModalSetting';
// Style
import './style.scss';

const Setting = () => {
  const dispatch = useDispatch();
  const {history, location } = useQuery();
  const categories = useSelector(setCategoriesSelector);
  const [ selectCategory, setSelectCategory ] = useState(0);

  const defcategory = categories.length ?  categories.find(el => el.default === true) : {};
  const category = categories.length ? categories.find(({id}) => id === selectCategory) : {};
  const preloader = useCallback(
    (data) => dispatch(toggleIsFetchingAction(data)),
    [dispatch],
  );
  const match = useRouteMatch();
  const settingSearch = queryString.parse(location.pathname) === `${match.url}setting`;
  queryString.parse(location.pathname);

  const setCategories = useCallback(
    () => dispatch(setCategorySaga()),
    [dispatch],
  );

  useEffect(() => {
    if (settingSearch) {
      setCategories();
    }
  }, [settingSearch, setCategories]);

  const changeCategory = (id) => {
    setSelectCategory(id)
  }
  return (
    <div className="container Setting main__setting">
      <div className="Setting__content-left">
        <h4 className="Setting__heading">Default Category</h4>
        <div className="Setting__icon--large">
          <Button category type="button">
            <SetIcon svg={defcategory || {}} />
          </Button>
          <span className="Setting__def-name">{defcategory ? defcategory.name : 'default'}</span>
        </div>
        <h4 className="Setting__heading">Set Categories</h4>
        <IconTemplate settingModal changeCategory={changeCategory} className="Set-categories" /> 
      </div>
      <ModalSetting 
        category={category}
        selectCategory={selectCategory}
        setSelectCategory={setSelectCategory}
      />
      <IconClose type="button" onClick={() => { history.push({ pathname: location.pathname, search: '' })}} />
    </div>
  );
};

export default Setting;
