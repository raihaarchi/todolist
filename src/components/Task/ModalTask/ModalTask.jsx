import React from 'react';
import PropTypes from 'prop-types';
// Icons
import IconClose from '../../../icons/iconClose';
// Components
import Button from '../../Button';
// Style
import './style.scss';

const ModalTask = ({
  onPostTitleTaskChange, textChangeTask, onCloseModalTaskItem, onSaveChangeTaskItem,
}) => (
  <>
    <form
      className="Modal-task Task__modal-task"
      onSubmit={onSaveChangeTaskItem}
    >
      <input
        className="Modal-task__input"
        onChange={onPostTitleTaskChange}
        value={textChangeTask}
      />
      <Button 
        onClick={onSaveChangeTaskItem} 
        secondary 
        position="Modal-task__button-save" 
        type="button"
      >
        Save
      </Button>
    </form>
    <IconClose 
      onClick={onCloseModalTaskItem} 
      type="button"
      className="Modal-task__close"
    />
  </>
);

ModalTask.propTypes = {
  onPostTitleTaskChange: PropTypes.func.isRequired,
  onCloseModalTaskItem: PropTypes.func.isRequired,
  onSaveChangeTaskItem: PropTypes.func.isRequired,
  textChangeTask: PropTypes.string.isRequired,
};

export default ModalTask;
