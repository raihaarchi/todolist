import { takeEvery, call, put } from 'redux-saga/effects';
import { setTasksAction, toggleIsFetchingAction, addTaskAction, deleteTaskAction } from './actions';
import { TASK_LOAD, ADD_TASK_LOAD, DELETE_TASK_LOAD, CHANGE_TASK_LOAD, } from './types';
import { getTasks, addTask, deleteTask, changeTask } from '../../utils/Api';

function* workerTaskLoad({request}) {
  try {
    const data = yield call(getTasks,request);
    yield put(toggleIsFetchingAction(true));
    yield put(setTasksAction(data.data));
    yield put(toggleIsFetchingAction(false)); 
  } catch {
    console.error('123');
  }
}

function* workerAddTaskLoad({task, icon}) {
  try {
    const data = yield call(addTask, task);
    yield put(addTaskAction(data.data, icon));
  } catch {
    console.error('123');
  }
}

function* workerDeleteTaskLoad({id}) {
  try {
    yield call(deleteTask, id);
    yield put(deleteTaskAction(id));
  } catch {
    console.error('123');
  }
}

function* workerChangeTaskLoad({id, data, request}) {
  try {
    yield call(changeTask, id, data);
    const tasks = yield call(getTasks,request);
    yield put(setTasksAction(tasks.data));
  } catch {
    console.error('123');
  }
}

export default function* watchTaskLoad () {
  yield takeEvery(TASK_LOAD, workerTaskLoad);
  yield takeEvery(ADD_TASK_LOAD, workerAddTaskLoad);
  yield takeEvery(DELETE_TASK_LOAD, workerDeleteTaskLoad);
  yield takeEvery(CHANGE_TASK_LOAD, workerChangeTaskLoad);
};
