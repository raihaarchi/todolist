import React, { useEffect, useCallback, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';
import Reset from 'react-infinite-scroll-component';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import PropTypes from 'prop-types';
// Store
import { tasksSelector } from '../../store/tasks/selectors';
import { setCategoriesSelector} from '../../store/filtering/selectors';
import { setCategorySaga } from '../../store/filtering/actions';
import { toggleIsFetchingAction, getTasksSaga } from '../../store/tasks/actions';
// Components
import Task from '../Task';
// Style
import './style.scss';

const pageSize = +process.env.REACT_APP_PAGE_SIZE;

const TaskList = ({ completed }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const [nextPage, setNextTasks] = useState(pageSize);
  const [hasMoreTasks, setHasMoreTasks] = useState(true);
  const tasks = useSelector(tasksSelector);
  const categories = useSelector(setCategoriesSelector);
  const sorting = queryString.parse(location.search).sort || '';
  const filtering = queryString.parse(location.search).icon;

  const preloader = useCallback(
    (data) => dispatch(toggleIsFetchingAction(data)),
    [dispatch]
  );
  const setCategories = useCallback(
    () => dispatch(setCategorySaga()),
    [dispatch]
  );
  const getTasks = useCallback(
    (data) => dispatch(getTasksSaga(data)),
    [dispatch]
  );

  useEffect(() => {
    setHasMoreTasks(true);
    setCategories();
    const requestData = {
      completed,
      sorting,
      filtering,
      nextPage,
      preloader,
    };
    getTasks(requestData);

    setNextTasks((prev) => prev + pageSize);
  }, [completed, location.search]);

  const loadsNextTasks = () => {
    // добавить условия для сортировки и фильтрации
    const requestData = {
      completed,
      sorting,
      filtering,
      nextPage,
      preloader,
    };
    if (tasks.length >= pageSize) {
      getTasks(requestData);
      setNextTasks((prev) => prev + pageSize);
    }
  };

  const itemTask = tasks.map(
    ({ id, title, active, favorite, iconId, dateOfCreat, icon }) => (
      <CSSTransition key={id} classNames="Tasks-list--animation" timeout={800}>
        <Task
          dateOfCreat={dateOfCreat}
          categories={categories}
          filtering={filtering}
          completed={completed}
          favorite={favorite}
          iconCategory={icon}
          sorting={sorting}
          active={active}
          iconId={iconId}
          title={title}
          id={id}
        />
      </CSSTransition>
    )
  );

  const loadingData = () => (
    <h3 className="Tasks-list__warning">Выберите другую категорию </h3>
  );

  const warning = !tasks.length && loadingData();
  return (
    <>
      {warning}
      <Reset
        dataLength={tasks.length}
        next={loadsNextTasks}
        hasMore={hasMoreTasks}
        style={{overflow:'none'}}
      >
        <TransitionGroup component="ul" className="Tasks-list">
          {itemTask}
        </TransitionGroup>
      </Reset>
    </>
  );
};

TaskList.defaultProps = {
  completed: false,
};

TaskList.propTypes = {
  completed: PropTypes.bool,
};

export default TaskList;
