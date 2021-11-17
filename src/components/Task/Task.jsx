import React, { useState, useCallback } from 'react';
import PropTypes, { bool } from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import cn from 'classnames';
// Store
import {
  toggleIsFetchingAction,
  deleteTaskSaga,
  changeTaskSaga,
} from '../../store/tasks/actions';
import { tasksSelector } from '../../store/tasks/selectors';
// Icons
import IconFavorite from '../../icons/iconFavorite';
import SetIcon from '../../icons/SetIcon';
import IconClose from '../../icons/iconClose';
// Components
import ModalTask from './ModalTask';
// Style
import style from './style.scss';


const cx = cn.bind(style);
const pageSize = Number(process.env.REACT_APP_PAGE_SIZE);

const Task = ({
  title,
  id,
  active,
  favorite,
  dateOfCreat,
  completed,
  sorting,
  filtering,
  iconCategory,
}) => {
  const [isDisabled, setIsDisabled] = useState(false);
  const dispatch = useDispatch();
  const tasks = useSelector(tasksSelector);
  const [stateModalTaskItem, setStateModalTaskItem] = useState(false);
  const [textChangeTask, setTextChangeTask] = useState(title);
  const [nextPage, setNextTasks] = useState(pageSize);

  const changeTasks = useCallback((idTask, data, request) => dispatch(changeTaskSaga(idTask, data, request)), [
    dispatch,
  ]);
  const deleteTask = useCallback(
    (idTask) => dispatch(deleteTaskSaga(idTask)),
    [dispatch]
  );
  const preloader = useCallback(
    (data) => dispatch(toggleIsFetchingAction(data)),
    [dispatch]
  );

  const onDeleteTask = () => {
    deleteTask(id);
  };

  const onChangeTask = (path, value = textChangeTask) => {
    setIsDisabled(true);
    const data = {
      [path]: value,
    };
    const request = {
      completed,
      sorting,
      filtering,
      nextPage,
      preloader,
    };
    changeTasks(id, data, request);
    setStateModalTaskItem(false);
    setNextTasks(pageSize);
    setIsDisabled(false)
  };

  const el = tasks.find((item) => item.id === id);

  const onPostTitleTaskChange = (e) => {
    setTextChangeTask(e.target.value);
  };

  const onCloseModalTaskItem = () => {
    setStateModalTaskItem(false);
  };

  const classTask = cx('Task__text', {
    'Task__text--completed': active,
  });
  const styleBack = cx('back', { 'back--hide': !stateModalTaskItem });

  const openModalTaskItem = (
    <>
      <ModalTask
        onPostTitleTaskChange={onPostTitleTaskChange}
        textChangeTask={textChangeTask}
        onSaveChangeTaskItem={() => onChangeTask('title')}
        onCloseModalTaskItem={onCloseModalTaskItem}
      />
      <div className={styleBack} onClick={onCloseModalTaskItem} role="button" />
    </>
  );

  const taskChange = stateModalTaskItem && openModalTaskItem;

  const renderIconTask = iconCategory && !active && (
    <div className={cx('Task__icon-button--sm')}>
      <SetIcon svg={iconCategory} />
    </div>
  );

  return (
    <li className="Task Tasks-list__task">
      <div className={cx('Task__content-top')}>
        {renderIconTask}
        <div className={cx('Task__checkbox')}>
          <input
            type="checkbox"
            className="checkbox"
            defaultChecked={active}
            onClick={() => onChangeTask('active', !el.active)}
            id={id}
          />
          <label htmlFor={id} />
        </div>
        <div 
          className={classTask}
          onDoubleClick={() => setStateModalTaskItem(true)}
        >
          {title}
        </div>
        {taskChange}
        <div className={cx('Task__content-left')}>
          {!active && (
            <IconFavorite
              favorite={favorite}
              onFavoriteTask={() => onChangeTask('favorite', !el.favorite)}
              disabled={isDisabled}
            />
          )}
        </div>
      </div>
      <div className={cx('Task__content-bottom')}>
        {dateOfCreat}
      </div>
      <IconClose onClick={onDeleteTask} type="button" />
    </li>
  );
};

Task.defaultProps = {
  sorting: '',
  filtering: 0,
  iconCategory: null,
};

Task.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  iconCategory: PropTypes.object,
  dateOfCreat: PropTypes.string.isRequired,
  favorite: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  active: PropTypes.bool.isRequired,
  id: PropTypes.number.isRequired,
  filtering: PropTypes.number,
  completed: bool.isRequired,
  sorting: PropTypes.string,
};

export default Task;
