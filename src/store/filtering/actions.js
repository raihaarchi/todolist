import {
  SET_CATEGORIES,
  ADD_CATEGORIES,
  DELETE_CATEGORY,
  CHANGE_CATEGORY,
  CATEGORIES_LOAD,
  ADD_CATEGORY_LOAD,
  DELETE_CATEGORY_LOAD,
  CHANGE_CATEGORY_LOAD,
  CHANGE_DEF_CATEGORY_LOAD
} from './types';

export const setCategoriesAction = (data) => ({
  type: SET_CATEGORIES,
  data,
});

export const addCategoryAction = (category) => ({
  type:   ADD_CATEGORIES,
  category,
});

export const deleteCategoryAction = (id) => ({
  type: DELETE_CATEGORY,
  id,
});

export const chengeCategoryAction = (id, data) => ({
  type: CHANGE_CATEGORY,
  id,
  data,
});

export const setCategorySaga = () => ({
  type: CATEGORIES_LOAD,
});

export const changeCategorySaga = (id, obj) => ({
  type: CHANGE_CATEGORY_LOAD,
  id,
  obj
});

export const changeDefCategorySaga = (id, obj) => ({
  type: CHANGE_DEF_CATEGORY_LOAD,
  id,
  obj
})

export const addCategoriesSaga = (category) => ({
  type: ADD_CATEGORY_LOAD,
  category
});

export const deleteCategorySaga = (id) => ({
  type: DELETE_CATEGORY_LOAD,
  id,
});
