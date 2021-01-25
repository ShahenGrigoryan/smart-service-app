import {
  put, takeLatest, all, call, takeEvery,
} from 'redux-saga/effects';
import * as FileSystem from 'expo-file-system';
import { Toast } from 'native-base';
import * as Api from '../../api/tasks';
import * as TasksActions from './tasks.actions';
import * as PageActions from '../pages/pages.actions';
import * as UserActions from '../user/user.actions';
import {
  addTaskFileSuccess,
  removeTaskFileSuccess,
  updateTaskCheckListItemSuccess,
  updateTaskSuccess,
} from './tasks.actions';
import { addFileToQue, removeFileFromQue } from '../files_que/files_que.reducer';

function* getTasks({ token, filter }) {
  yield put(PageActions.startLoading());
  try {
    const tasks = yield Api.getTasks(token, filter?.params);
    yield put(TasksActions.getTasksSuccess(tasks.data.data));
    yield put(PageActions.endLoading());
  } catch (e) {
    yield put(PageActions.endLoading());
    if (e?.response?.status === 401) {
      yield put(UserActions.loginFailure(e.message));
    } else {
      yield put(PageActions.pageFailure(`${e.message} getTasks__,${filter}`));
    }
  }
}

function* getCurrentTask({ token, id }) {
  try {
    yield put(PageActions.startLoading());
    const currentTask = yield Api.getCurrentTask(token, id);
    yield put(TasksActions.getCurrentTaskSuccess(currentTask?.data?.data));
    yield put(PageActions.endLoading());
  } catch (e) {
    yield put(PageActions.endLoading());
    if (e?.response?.status === 401) {
      yield put(UserActions.loginFailure(e.message));
    } else {
      yield put(PageActions.pageFailure(`${e.message} getCurrentTask`));
    }
  }
}

function* getTaskFiles({ token, task_id }) {
  try {
    yield put(PageActions.startLoading());
    const files = yield Api.getTaskFiles(token, task_id);
    yield put(TasksActions.getTaskFilesSuccess(files?.data?.data));
    yield put(PageActions.endLoading());
  } catch (e) {
    yield put(PageActions.endLoading());
    if (e?.response?.status === 401) {
      yield put(UserActions.loginFailure(e.message));
    } else {
      yield put(PageActions.pageFailure(`${e.message} get task files`));
    }
  }
}

function* createTaskComment({ token, taskId, comment }) {
  try {
    const newComment = yield Api.createTaskComment(token, taskId, comment);
    yield Api.getTaskComments(token, taskId);
    yield put(TasksActions.createTaskCommentSuccess(newComment.data.data));
  } catch (e) {
    if (e.response.status === 401) {
      yield put(UserActions.loginFailure(e.message));
    } else {
      yield put(PageActions.pageFailure(`${e.message} createTaskComment`));
    }
  }
}

function* updateCheckListItem({
  token, taskTodoId, todoItemId, completed_at,
}) {
  try {
    yield put(PageActions.startLoading());
    const newCheckListItem = yield Api.updateCheckListItem({
      token, taskTodoId, todoItemId, completed_at,
    });
    yield put(updateTaskCheckListItemSuccess({
      newCheckListItem: newCheckListItem.data.data,
      taskTodoId,
      todoItemId,
    }));
    yield put(PageActions.endLoading());
  } catch (e) {
    yield put(PageActions.endLoading());
    yield put(PageActions.pageFailure(`${e.message} update saga error`));
  }
}

function* updateTask({ token, body, id }) {
  try {
    yield put(PageActions.startLoading());
    const updatedTask = yield Api.updateTask({ token, body, id });
    yield put(updateTaskSuccess({ data: updatedTask.data.data, id }));
    yield put(PageActions.endLoading());
  } catch (e) {
    yield put(PageActions.endLoading());
    if (e?.response?.status === 401) {
      yield put(UserActions.loginFailure(e.message));
    } else {
      yield put(PageActions.pageFailure(`${e.message} updateTask`));
    }
  }
}

function* addTaskFile({ token, taskId, file }) {
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
    const newFile = yield Api.addFile({ token, taskId, data });
    yield put(addTaskFileSuccess(newFile?.data?.data ? newFile.data.data : newFile));
    yield put(PageActions.endLoading());
    yield put(removeFileFromQue({ section_name: 'tasks', file }));
  } catch (e) {
    yield put(PageActions.endLoading());
    if (e?.response?.status === 401) {
      yield put(UserActions.loginFailure(e.message));
    } else if (e?.response?.status === 503) {
      yield put(addFileToQue({ section_name: 'tasks', file, id: taskId }));
      yield put(PageActions.pageFailure('Файл добавлен в очередь'));
    } else {
      yield put(PageActions.pageFailure(`${e.message}`));
    }
  }
}
function* removeTaskFile({ token, taskId, fileId }) {
  try {
    yield put(PageActions.startLoading());
    yield Api.removeFile({ token, taskId, fileId });
    yield put(removeTaskFileSuccess(fileId));
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

function* getTasksStart() {
  yield takeLatest(TasksActions.GET_TASKS_START, getTasks);
}

function* getCurrentTaskStart() {
  yield takeLatest(TasksActions.GET_CURRENT_TASK_START, getCurrentTask);
}
function* createTaskCommentStart() {
  yield takeLatest(TasksActions.CREATE_TASK_COMMENT_START, createTaskComment);
}
function* updateCheckListItemStart() {
  yield takeLatest(TasksActions.UPDATE_TASK_CHECKLIST_ITEM_START, updateCheckListItem);
}
function* updateTaskStart() {
  yield takeLatest(TasksActions.UPDATE_TASK_START, updateTask);
}
function* getFilesStart() {
  yield takeLatest(TasksActions.GET_TASK_FILES_START, getTaskFiles);
}
function* addTaskFileStart() {
  yield takeEvery(TasksActions.ADD_TASK_FILE_START, addTaskFile);
}
function* removeTaskFileStart() {
  yield takeLatest(TasksActions.REMOVE_TASK_FILE_START, removeTaskFile);
}

function* tasksSaga() {
  yield all([
    call(getTasksStart),
    call(getCurrentTaskStart),
    call(createTaskCommentStart),
    call(updateCheckListItemStart),
    call(updateTaskStart),
    call(getFilesStart),
    call(addTaskFileStart),
    call(removeTaskFileStart),
  ]);
}

export default tasksSaga;
