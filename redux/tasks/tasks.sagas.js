import {
  put, takeLatest, all, call,
} from 'redux-saga/effects';
import * as Api from '../../api/tasks';
import * as TasksActions from './tasks.actions';
import * as PageActions from '../pages/pages.actions';
import * as UserActions from '../user/user.actions';
import { updateTaskCheckListItemSuccess, updateTaskSuccess } from './tasks.actions';

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
      yield put(PageActions.pageFailure(`${e.message} getTasks`));
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

function* tasksSaga() {
  yield all([
    call(getTasksStart),
    call(getCurrentTaskStart),
    call(createTaskCommentStart),
    call(updateCheckListItemStart),
    call(updateTaskStart),
    call(getFilesStart),
  ]);
}

export default tasksSaga;
