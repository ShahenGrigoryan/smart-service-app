import {
  put, takeLatest, all, call,
} from 'redux-saga/effects';
import * as UserActions from './user.actions';
import * as Api from '../../api/user';
import { setNotFirst } from '../visit/visit.actions';
import { getPayrollsSuccess, getUserSuccess, logoutSuccess } from './user.actions';
import { nullify } from '../tasks/tasks.actions';
import * as PageActions from '../pages/pages.actions';
import { nullifyFiles } from '../files_que/files_que.reducer';

function* login(action) {
  yield put(PageActions.startLoading());
  try {
    const userInfo = yield Api.login(action.user);
    yield put(setNotFirst());
    yield put(UserActions.loginSuccess(userInfo.data));
    yield put(PageActions.endLoading());
  } catch (e) {
    if (e?.response?.status === 401) {
      yield put(UserActions.loginFailure('Неправильный логин или пароль'));
    } else {
      yield put(UserActions.loginFailure('Что-то пошло не так'));
    }
    yield put(PageActions.endLoading());
  }
}

function* logout({ token }) {
  try {
    yield Api.logout(token);
    yield put(logoutSuccess());
    yield put(nullify());
    yield put(nullifyFiles());
  } catch (e) {
    yield put(nullifyFiles());
    yield put(PageActions.pageFailure('Что-то пошло не так'));
  }
}

function* getPayrolls({
  token, userId, startDate, endDate,
}) {
  try {
    yield put(PageActions.startLoading());
    const payrolls = yield Api.getPayrolls({
      token, userId, startDate, endDate,
    });
    yield put(getPayrollsSuccess(payrolls?.data?.data));
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

function* getUser({ token, user_id }) {
  yield put(PageActions.startLoading());
  try {
    const user = yield Api.getUser(token, user_id);
    yield put(getUserSuccess(user?.data?.data));
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

function* loginStart() {
  yield takeLatest(UserActions.LOGIN_START, login);
}
function* logoutStart() {
  yield takeLatest(UserActions.LOGOUT, logout);
}
function* getPayrollsStart() {
  yield takeLatest(UserActions.GET_PAYROLLS_START, getPayrolls);
}
function* getUserStart() {
  yield takeLatest(UserActions.GET_USER_START, getUser);
}

function* loginSaga() {
  yield all([call(loginStart), call(logoutStart), call(getPayrollsStart), call(getUserStart)]);
}

export default loginSaga;
