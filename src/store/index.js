import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import watchTaskLoad from './tasks/sagas';
import watchCategoriesLoad from './filtering/sagas';
import tasks from './tasks';
import filtering from './filtering';

const reducer = combineReducers({
  tasks,
  filtering,
});

const sagaMiddleware = createSagaMiddleware();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducer,
  composeEnhancers(applyMiddleware(sagaMiddleware)),
);

sagaMiddleware.run(watchTaskLoad)
sagaMiddleware.run(watchCategoriesLoad)

export default store;
