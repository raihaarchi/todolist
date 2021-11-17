import {
  SET_CATEGORIES,
  ADD_CATEGORIES,
  DELETE_CATEGORY,
  CHANGE_CATEGORY
} from './types';

const initialState = {
  categories: [],
  indexCategory: 0,
  indexCategoryInForm: 0,
};

const filteringReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CATEGORIES: {
      return { ...state, categories: [...action.data] };
    }
    case ADD_CATEGORIES: {
      return { ...state, categories: [...state.categories, action.category] }
    }
    case DELETE_CATEGORY: {
      return {...state, categories:[...state.categories.filter(({ id }) => id !== action.id)]}
    }
    case CHANGE_CATEGORY: {
      return {...state, categories:[...state.categories.map((categ) => categ.id === action.id ? action.data : categ)]}
    }
    default:
      return state;
  }
};

export default filteringReducer;
