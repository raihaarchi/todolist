import {
  SET_STATE,
  TOGGLE_IS_FETCHING,
  SET_STATE_ADD_TASK,
  SET_STATE_REMOVE_TASK,
  TASK_LOAD,
  ADD_TASK_LOAD,
  DELETE_TASK_LOAD,
  CHANGE_TASK_LOAD,
} from './types';

export const setTasksAction = (data) => {
  return {
    type: SET_STATE,
    data,
  };
};

export const addTaskAction = (task, icon) => ({
  type: SET_STATE_ADD_TASK,
  newTask: { ...task, icon }
});

export const deleteTaskAction = (id) => ({
  type: SET_STATE_REMOVE_TASK,
  id,
});

export const toggleIsFetchingAction = (isFetching) => ({
  type: TOGGLE_IS_FETCHING,
  isFetching,
});

export const getTasksSaga = (request) => ({
  type: TASK_LOAD,
  request,
});

export const addTaskSaga = (task, icon) => ({
  type: ADD_TASK_LOAD,
  task,
  icon,
});

export const deleteTaskSaga = (id) => ({
  type: DELETE_TASK_LOAD,
  id
});

export const changeTaskSaga = (id, data, request) => ({
  type: CHANGE_TASK_LOAD,
  id,
  data,
  request
});
