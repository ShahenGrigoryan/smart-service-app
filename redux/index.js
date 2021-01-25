import { combineReducers, createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';
import userReducer from './user/user.reducer';
import pagesReducer from './pages/pages.reducer';
import visitReducer from './visit/visit.reducer';
import tasksReducer from './tasks/tasks.reducer';
import rootSaga from './root.saga';
import ticketsReducer from './tickets/tickets.reducer';
import checksReducer from './checks/checks.reducer';
import desktopReducer from './desktop/desktop.reducer';
import filesQueReducer from './files_que/files_que.reducer';

const reducers = combineReducers({
  user: userReducer,
  pages: pagesReducer,
  visit: visitReducer,
  desktop: desktopReducer,
  tasks: tasksReducer,
  tickets: ticketsReducer,
  checks: checksReducer,
  files_in_que: filesQueReducer,
});
const persistConfig = {
  key: 'state',
  storage: AsyncStorage,
};
const pReducer = persistReducer(persistConfig, reducers);
const sagaMiddleware = createSagaMiddleware();
export const store = createStore(pReducer, applyMiddleware(sagaMiddleware));
export const persistor = persistStore(store);
sagaMiddleware.run(rootSaga);
