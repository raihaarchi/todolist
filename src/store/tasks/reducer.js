import {
  SET_STATE,
  TOGGLE_IS_FETCHING,
  SET_STATE_ADD_TASK,
  SET_STATE_REMOVE_TASK,
} from './types';

const initialState = {
  tasks: [],
  isFetching: false,
};

const taskReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_STATE: {
      return {
        ...state,
        tasks: [...action.data],
      };
    }
    case SET_STATE_ADD_TASK: {
      return {
        ...state,
        tasks: [...state.tasks, action.newTask],
      };
    }
    case SET_STATE_REMOVE_TASK: {
      return {
        ...state,
        tasks: [...state.tasks.filter(({ id }) => id !== action.id)],
      };
    }
    case TOGGLE_IS_FETCHING: {
      return { ...state, isFetching: action.isFetching };
    }
    default:
      return state;
  }
};

export default taskReducer;
