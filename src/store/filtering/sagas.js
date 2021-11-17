import { takeEvery, call, put, all } from 'redux-saga/effects';
import { setCategoriesAction, addCategoryAction, deleteCategoryAction, chengeCategoryAction } from './actions';
import { CATEGORIES_LOAD,ADD_CATEGORY_LOAD,DELETE_CATEGORY_LOAD,CHANGE_CATEGORY_LOAD, CHANGE_DEF_CATEGORY_LOAD } from './types';
import { getCategories, changeCategories, addCategories, deleteCategories } from '../../utils/Api';

function* workerCategoriesLoad() {
  try {
    const data = yield call(getCategories);
    yield put(setCategoriesAction(data.data));
  } catch {
    console.error('123');
  }
}

function* workerAddCategoryLoad({category}) {
  try {
    yield call(addCategories, category)
    yield put(addCategoryAction(category))
  } catch {
    console.error('123');
  }
}

function* workerDeleteCategoryLoad({id}) {
  try {
    yield call(deleteCategories, id)
    yield put(deleteCategoryAction(id))
  } catch {
    console.error('123');
  }
}

function* workerChangeCategoryLoad({id, obj}) {
  try {
    const data = yield call(changeCategories, id, obj)
    yield put(chengeCategoryAction(id, data.data))
  } catch {
    console.error('123');
  }
}

function* workerChangeDefCategoryLoad({id, obj}) {
  try {
    const {defTrue, defFalse} = yield all({
      defTrue: call(changeCategories, id[0], obj[0]),
      defFalse: call(changeCategories, id[1], obj[1])
    });
    
    yield put(chengeCategoryAction(id[0], defTrue.data));
    yield put(chengeCategoryAction(id[1], defFalse.data));
  } catch (error) {
    console.error('123');
  }
}

export default function* watchCategoriesLoad() {
  yield takeEvery(CATEGORIES_LOAD, workerCategoriesLoad);
  yield takeEvery(ADD_CATEGORY_LOAD, workerAddCategoryLoad);
  yield takeEvery(DELETE_CATEGORY_LOAD, workerDeleteCategoryLoad);
  yield takeEvery(CHANGE_CATEGORY_LOAD, workerChangeCategoryLoad);
  yield takeEvery(CHANGE_DEF_CATEGORY_LOAD,workerChangeDefCategoryLoad);
}
