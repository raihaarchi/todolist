import React, { useState, useCallback , useEffect } from 'react';
import { useDispatch } from 'react-redux';
// Store
import { toggleIsFetchingAction, getTasksSaga } from '../../../store/tasks/actions';
// Components
import Input from '../../Input';
// Style
import './style.scss';

const pageSize = +process.env.REACT_APP_PAGE_SIZE;

const FilterInput = ({category}) => {
    const dispatch = useDispatch();
    const [title, setTitle] = useState('');
    
    const preloader = useCallback(
      (data) => dispatch(toggleIsFetchingAction(data)),
      [dispatch]
    );
    const getTasks = useCallback(
      (data) => dispatch(getTasksSaga(data)),
      [dispatch]
    );
  
    useEffect(()=>{
      const like = title && `&title_like=${title}`;
      const requestData = {
        completed: false,
        sorting: '',
        filtering:category,
        nextPage: pageSize,
        preloader,
        like
      };
      getTasks(requestData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [title]);

  return (
    <div className="Filter-input">
      <Input 
        value={title}
        onChange={(e) => {setTitle(e.target.value)}}
        headering="Search"
        className="Filter-input__input"
        placeholder="введите название задания"
      />
    </div>
  );
};

export default FilterInput;