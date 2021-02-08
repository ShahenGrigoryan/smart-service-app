import {
  put, takeLatest, all, call, takeEvery,
} from 'redux-saga/effects';
import * as FileSystem from 'expo-file-system';
import * as Api from '../../api/checks';
import * as ChecksActions from './checks.actions';
import * as PageActions from '../pages/pages.actions';
import * as UserActions from '../user/user.actions';
import {
  addCheckFileSuccess, changeCheckStatusSuccess,
  removeCheckFileSuccess,
  updateCheckCheckListItemSuccess,
  updateCheckSuccess,
} from './checks.actions';
import { addFileToQue } from '../files_que/files_que.reducer';

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

function* getChecksFiles({ token, check_id }) {
  try {
    yield put(PageActions.startLoading());
    const files = yield Api.getCheckFiles(token, check_id);
    yield put(ChecksActions.getCheckFilesSuccess(files?.data?.data));
    yield put(PageActions.endLoading());
  } catch (e) {
    yield put(PageActions.endLoading());
    if (e?.response?.status === 401) {
      yield put(UserActions.loginFailure(e.message));
    } else {
      yield put(PageActions.pageFailure(`${e.message}`));
    }
  }
}

function* addCheckFile({ token, checkId, file }) {
  try {
    yield put(PageActions.startLoading());
    const base64 = yield FileSystem
      .readAsStringAsync(file?.uri, { encoding: FileSystem.EncodingType.Base64 });
    const ext = file?.name.slice(file.name.indexOf('.') + 1);
    const data = JSON.stringify({
      name: file.name,
      content_type: `application/${ext}`,
      attachment: `data:application/${ext};base64,${base64}`,
    });
    const newFile = yield Api.addFile({ token, checkId, data });
    yield put(addCheckFileSuccess(newFile?.data?.data ? newFile.data.data : newFile));
    yield put(PageActions.endLoading());
  } catch (e) {
    yield put(PageActions.endLoading());
    if (e?.response?.status === 401) {
      yield put(UserActions.loginFailure(e.message));
    } else if ((e?.response?.status !== 400
      && e?.response?.status !== 500
      && e?.response?.status !== 401)
      || !e?.response?.status) {
      yield put(addFileToQue({ section_name: 'entity_tasks', file, id: checkId }));
      yield put(PageActions.pageFailure('Файл добавлен в очередь'));
    } else {
      yield put(PageActions.pageFailure(`${e.message}`));
    }
  }
}
function* removeCheckFile({ token, checkId, fileId }) {
  try {
    yield put(PageActions.startLoading());
    yield Api.removeFile({ token, checkId, fileId });
    yield put(removeCheckFileSuccess(fileId));
    yield put(PageActions.endLoading());
  } catch (e) {
    yield put(PageActions.endLoading());
    if (e?.response?.status === 401) {
      yield put(UserActions.loginFailure(e.message));
    } else {
      yield put(PageActions.pageFailure(`${e.message}`));
    }
  }
}

function* updateCheckCheckListItem({
  token, checkTodoId, todoItemId, completed_at,
}) {
  try {
    yield put(PageActions.startLoading());
    const newCheckListItem = yield Api.updateCheckListItem({
      token, checkTodoId, todoItemId, completed_at,
    });
    yield put(updateCheckCheckListItemSuccess({
      newCheckListItem: newCheckListItem.data.data,
      checkTodoId,
      todoItemId,
    }));
    yield put(PageActions.endLoading());
  } catch (e) {
    yield put(PageActions.endLoading());
    yield put(PageActions.pageFailure(`${e.message}`));
  }
}
function* changeCheckStatus({ token, checkId, status }) {
  try {
    yield put(PageActions.startLoading());
    const newStatus = yield Api.changeCheckStatus({ token, checkId, status });
    const statusData = newStatus?.data?.data?.status;
    yield put(changeCheckStatusSuccess({ checkId, newStatus: statusData }));
    yield put(PageActions.endLoading('Статус изменен'));
  } catch (e) {
    yield put(PageActions.endLoading());
    if (e?.response?.status === 401) {
      yield put(UserActions.loginFailure(e.message));
    } else {
      yield put(PageActions.pageFailure(`${e.message}`));
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

function* updateCheckStart() {
  yield takeLatest(ChecksActions.UPDATE_CHECK_START, updateCheck);
}

function* getFilesStart() {
  yield takeLatest(ChecksActions.GET_CHECK_FILES_START, getChecksFiles);
}
function* addCheckFileStart() {
  yield takeEvery(ChecksActions.ADD_CHECK_FILE_START, addCheckFile);
}
function* removeCheckFileStart() {
  yield takeLatest(ChecksActions.REMOVE_CHECK_FILE_START, removeCheckFile);
}
function* updateCheckCheckListItemStart() {
  yield takeLatest(ChecksActions.UPDATE_CHECK_CHECKLIST_ITEM_START, updateCheckCheckListItem);
}
function* changeCheckStatusStart() {
  yield takeLatest(ChecksActions.CHANGE_CHECK_STATUS_START, changeCheckStatus);
}

function* checksSaga() {
  yield all([
    call(getChecksStart),
    call(getCurrentCheckStart),
    call(createCheckCommentStart),
    call(updateCheckStart),
    call(getFilesStart),
    call(addCheckFileStart),
    call(removeCheckFileStart),
    call(updateCheckCheckListItemStart),
    call(changeCheckStatusStart),
  ]);
}

export default checksSaga;
