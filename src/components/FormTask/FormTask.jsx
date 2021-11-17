import React, { useRef, useState, useCallback } from 'react';
import cn from 'classnames';
import { useSelector, useDispatch } from 'react-redux';
import { format } from 'date-fns';
// Store
import {
  setCategoriesSelector,
} from '../../store/filtering/selectors';
import { addTaskSaga } from '../../store/tasks/actions';
// Components
import FormTaskIcon from './FormTaskIcon';
import Button from '../Button';
// Hooks
import useIconSelection from '../../hooks/useIconSelection';
import useValidation from '../../hooks/useValidation';
// Icon 
import SetIcon from '../../icons/SetIcon';
// Style
import style from './style.scss';

const cx = cn.bind(style);

const FormTask = () => {
  const inputRef = useRef(null);
  const {category, setCategory, isIconSelection, setIsIconSelection} = useIconSelection();
  const {validator, setValidator} = useValidation();
  const categories = useSelector(setCategoriesSelector);

  const dispatch = useDispatch();
  const addTask = useCallback(
    (data, icon) => dispatch(addTaskSaga(data, icon)),
    [dispatch]
  );
  const [title, setTitle] = useState('');
  const [isCheckedMark, setIsCheckedMark] = useState(false);

  const defcategory = categories.length ? categories.find(el => el.default === true) : {};
  const selectCategory = categories.length ? categories.find(el => el.id === category) : {};
  const onCloseModalIcon = () => {
    setIsIconSelection(false);
    setIsCheckedMark(false);
    setValidator({validEmpty:'', validLength:''});
    setCategory(0);
    setTitle('');
  };

  const onAddTask = (e) => {
    e.preventDefault();
    const dateOfCreat = format(new Date(), 'yyyy-MM-dd');
    if (title.trim() && title.length < 250) {
      const requestBody = {
        title: title.trim(),
        active: false,
        favorite: false,
        iconId: isCheckedMark ? category : defcategory.id,
        dateOfCreat,
      };
      const icon = isCheckedMark ? selectCategory : defcategory;
      addTask(requestBody, icon);
      setTitle('');
      onCloseModalIcon();
    } else if (!title.trim()) {
        setValidator({...validator, validEmpty: 'Введите данные'})
      } else if (title.length > 250) {
        setValidator({...validator, validLength: 'Не больше 250 символов'})
      }
  };

  const addSelectCategory = (id) => {
    setCategory(id);
  }

  const onPostChange = (e) => {
    setTitle(e.target.value);
    setValidator({validEmpty:'', validLength:''});
  };

  const classModal = cx(
    'back',
    { 'back--hide': !isIconSelection },
  );

  const valid = () => {
    if (validator.validEmpty && isIconSelection) {
      return validator.validEmpty;
    } if (validator.validLength && isIconSelection) {
      return validator.validLength;
    }
    return null;
  }
  const textValid = valid();
  return (
    <div className="Form-task">
      <p className="Form-task__validator">{textValid}</p>
      <form
        className={cx('Form-task__field main__form-task')}
        onSubmit={onAddTask}
      >
        <label className="Form-task__label" htmlFor="formtask">
          <div className="Form-task__svg">
            <SetIcon svg={selectCategory || defcategory || {}} />
          </div>
          <input
            ref={inputRef}
            className={cx('Form-task__input', {'Form-task__input--validator': isIconSelection && (validator.validEmpty || validator.validLength) })}
            onChange={onPostChange}
            value={title}
            onFocus={() => setIsIconSelection(true)}
            placeholder="Task"
            id="formtask"
          />
        </label>
        <Button onClick={onAddTask} secondary className="Form-task__button" type="submit">ADD</Button>
      </form>
      <div className={cx('Form-task__icons')}>
        {isIconSelection && (
        <>
          <FormTaskIcon
            isCheckedMark={isCheckedMark}
            addSelectCategory={addSelectCategory}
            checkMark={() => setIsCheckedMark(true)}
          />
          <div
            className={classModal}
            onClick={onCloseModalIcon}
            role="button"
          />
        </>
      )}
      </div>
    </div>
  );
};

export default FormTask;
