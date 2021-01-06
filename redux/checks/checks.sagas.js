import {
  put, takeLatest, all, call,
} from 'redux-saga/effects';
import * as Api from '../../api/checks';
import * as ChecksActions from './checks.actions';
import * as PageActions from '../pages/pages.actions';
import * as UserActions from '../user/user.actions';
import { updateCheckSuccess } from './checks.actions';

function* getChecks({ token, filter }) {
  yield put(PageActions.startLoading());
  try {
    const checks = yield Api.getChecks(token, filter?.params);
    yield put(ChecksActions.getChecksSuccess(checks.data.data));
    yield put(PageActions.endLoading());
  } catch (e) {
    yield put(PageActions.endLoading());
    if (e?.response?.status === 401) {
      yield put(UserActions.loginFailure(e.message));
    } else {
      yield put(PageActions.pageFailure(e.message));
    }
  }
}

function* getCurrentCheck({ token, id }) {
  try {
    yield put(PageActions.startLoading());
    const currentCheck = yield Api.getCurrentCheck(token, id);
    yield put(ChecksActions.getCurrentCheckSuccess(currentCheck?.data?.data));
    yield put(PageActions.endLoading());
  } catch (e) {
    yield put(PageActions.endLoading());
    if (e?.response?.status === 401) {
      yield put(UserActions.loginFailure(e.message));
    } else {
      yield put(PageActions.pageFailure(e.message));
    }
  }
}

function* createCheckComment({ token, checkId, comment }) {
  try {
    const newComment = yield Api.createCheckComment(token, checkId, comment);
    yield put(ChecksActions.createCheckCommentSuccess(newComment.data.data));
  } catch (e) {
    if (e.response.status === 401) {
      yield put(UserActions.loginFailure(e.message));
    } else {
      yield put(PageActions.pageFailure(e.message));
    }
  }
}

// function* updateCheckListItem(data) {
//   try {
//     yield put(PageActions.startLoading());
//     const newCheckListItem = yield Api.updateCheckListItem(data);
//     yield put(updateCheckListItemSuccess({
//       newCheckListItem: newCheckListItem.data.data,
//       ...data,
//     }));
//     yield put(PageActions.endLoading());
//   } catch (e) {
//     yield put(PageActions.endLoading());
//     if (e.response.status === 401) {
//       yield put(UserActions.loginFailure(e.message));
//     } else {
//       yield put(PageActions.pageFailure(e.message));
//     }
//   }
// }

function* updateCheck({ token, body, id }) {
  try {
    yield put(PageActions.startLoading());
    const updatedCheck = yield Api.updateCheck({ token, body, id });
    yield put(updateCheckSuccess({ data: updatedCheck.data.data, id }));
    yield put(PageActions.endLoading());
  } catch (e) {
    yield put(PageActions.endLoading());
    if (e?.response?.status === 401) {
      yield put(UserActions.loginFailure(e.message));
    } else {
      yield put(PageActions.pageFailure(e.message));
    }
  }
}

function* getChecksStart() {
  yield takeLatest(ChecksActions.GET_CHECKS_START, getChecks);
}

function* getCurrentCheckStart() {
  yield takeLatest(ChecksActions.GET_CURRENT_CHECK_START, getCurrentCheck);
}
function* createCheckCommentStart() {
  yield takeLatest(ChecksActions.CREATE_CHECK_COMMENT_START, createCheckComment);
}
// function* updateCheckListItemStart() {
//   yield takeLatest(ChecksActions.UPDATE_CHECKLIST_ITEM_START, updateCheckListItem);
// }
function* updateCheckStart() {
  yield takeLatest(ChecksActions.UPDATE_CHECK_START, updateCheck);
}

function* checksSaga() {
  yield all([
    call(getChecksStart),
    call(getCurrentCheckStart),
    call(createCheckCommentStart),
    // call(updateCheckListItemStart),
    call(updateCheckStart),
  ]);
}

export default checksSaga;
