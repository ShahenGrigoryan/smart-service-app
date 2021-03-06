import {
  put, takeLatest, all, call,
} from 'redux-saga/effects';
import * as PageActions from '../pages/pages.actions';
import {
  GET_DESKTOP_ITEMS_START, getDesktopItemsSuccess,
} from './desktop.actions';
import { getDesktopItems } from '../../api/desktop';
import { desktopItemsSort } from '../../utils';
import * as UserActions from '../user/user.actions';

function* getItems({ token, filter }) {
  yield put(PageActions.startLoading());
  try {
    const desktopItems = yield getDesktopItems(token, filter?.params);
    const data = desktopItems?.map((item) => item?.data?.data);
    let allItems = [];
    data.forEach((item) => {
      allItems = [...allItems, ...item];
    });
    allItems = allItems.sort(desktopItemsSort);
    yield put(getDesktopItemsSuccess(allItems));
    yield put(PageActions.endLoading());
  } catch (e) {
    yield put(PageActions.endLoading());
    if (e?.response?.status === 401) {
      yield put(UserActions.loginFailure('Время сессии истекло.'));
    } else {
      yield put(PageActions.pageFailure('Что-то пошло не так.'));
    }
  }
}

function* getDesktopItemsStart() {
  yield takeLatest(GET_DESKTOP_ITEMS_START, getItems);
}

function* desktopSaga() {
  yield all([
    call(getDesktopItemsStart),
  ]);
}

export default desktopSaga;
