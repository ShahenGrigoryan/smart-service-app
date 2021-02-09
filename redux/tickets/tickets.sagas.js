import {
  put, takeLatest, all, call,
} from 'redux-saga/effects';
import * as FileSystem from 'expo-file-system';
import * as Api from '../../api/tickets';
import * as TicketsActions from './tickets.actions';
import * as PageActions from '../pages/pages.actions';
import * as UserActions from '../user/user.actions';
import {
  addTicketFileSuccess,
  changeTicketStatusSuccess,
  removeTicketFileSuccess,
  updateTicketSuccess,
} from './tickets.actions';

function* getTickets({ token, filter }) {
  yield put(PageActions.startLoading());
  try {
    const tickets = yield Api.getTickets(token, filter?.params);
    yield put(TicketsActions.getTicketsSuccess(tickets.data.data));
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

function* getCurrentTicket({ token, id, filter }) {
  try {
    yield put(PageActions.startLoading());
    const currentTicket = yield Api.getCurrentTicket(token, id, filter?.params);
    const statuses = yield Api.getStatuses({ token, ticketId: id });
    yield put(TicketsActions.getCurrentTicketSuccess({
      ...currentTicket?.data?.data,
      statuses: statuses?.data?.data,
    }));
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

function* createTicketComment({ token, ticketId, comment }) {
  try {
    const newComment = yield Api.createTicketComment(token, ticketId, comment);
    yield put(TicketsActions.createTicketCommentSuccess(newComment.data.data));
  } catch (e) {
    yield put(PageActions.endLoading());
    if (e?.response?.status === 401) {
      yield put(UserActions.loginFailure('Время сессии истекло.'));
    } else {
      yield put(PageActions.pageFailure('Что-то пошло не так.'));
    }
  }
}

function* updateTicket({ token, body, id }) {
  try {
    yield put(PageActions.startLoading());
    const updatedTicket = yield Api.updateTicket({ token, body, id });
    yield put(updateTicketSuccess({ data: updatedTicket.data.data, id }));
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

function* getTicketFiles({ token, ticket_id }) {
  try {
    yield put(PageActions.startLoading());
    const files = yield Api.getTicketFiles(token, ticket_id);
    yield put(TicketsActions.getTicketFilesSuccess(files?.data?.data));
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

function* addTicketFile({ token, ticketId, file }) {
  try {
    yield put(PageActions.startLoading());
    const base64 = yield FileSystem.readAsStringAsync(file?.uri,
      { encoding: FileSystem.EncodingType.Base64 });
    const ext = file?.name.slice(file.name.indexOf('.') + 1);
    const data = JSON.stringify({
      name: file.name,
      content_type: `application/${ext}`,
      attachment: `data:application/${ext};base64,${base64}`,
      attachment_type: 1,
    });
    const newFile = yield Api.addFile({ token, ticketId, data });
    yield put(addTicketFileSuccess(newFile?.data?.data ? newFile.data.data : newFile));
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
function* removeTicketFile({ token, ticketId, fileId }) {
  try {
    yield put(PageActions.startLoading());
    yield Api.removeFile({ token, ticketId, fileId });
    yield put(removeTicketFileSuccess(fileId));
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
function* changeTicketStatus({ token, ticketId, status }) {
  try {
    yield put(PageActions.startLoading());
    const newStatus = yield Api.changeStatus({ token, ticketId, status });
    const statuses = yield Api.getStatuses({ token, ticketId });
    const statusData = newStatus?.data?.data?.status;
    yield put(changeTicketStatusSuccess({
      ticketId,
      statuses: statuses.data.data,
      newStatus: statusData,
    }));
    yield put(PageActions.endLoading('Статус изменен'));
  } catch (e) {
    yield put(PageActions.endLoading());
    if (e?.response?.status === 401) {
      yield put(UserActions.loginFailure('Время сессии истекло.'));
    } else {
      yield put(PageActions.pageFailure('Что-то пошло не так.'));
    }
  }
}

function* getTicketsStart() {
  yield takeLatest(TicketsActions.GET_TICKETS_START, getTickets);
}

function* getCurrentTicketStart() {
  yield takeLatest(TicketsActions.GET_CURRENT_TICKET_START, getCurrentTicket);
}
function* createTicketCommentStart() {
  yield takeLatest(TicketsActions.CREATE_TICKET_COMMENT_START, createTicketComment);
}

function* updateTicketStart() {
  yield takeLatest(TicketsActions.UPDATE_TICKET_START, updateTicket);
}
function* getFilesStart() {
  yield takeLatest(TicketsActions.GET_TICKET_FILES_START, getTicketFiles);
}
function* addTicketFileStart() {
  yield takeLatest(TicketsActions.ADD_TICKET_FILE_START, addTicketFile);
}
function* removeTicketFileStart() {
  yield takeLatest(TicketsActions.REMOVE_TICKET_FILE_START, removeTicketFile);
}
function* changeTicketStatusStart() {
  yield takeLatest(TicketsActions.CHANGE_TICKET_STATUS_START, changeTicketStatus);
}

function* ticketsSaga() {
  yield all([
    call(getTicketsStart),
    call(getCurrentTicketStart),
    call(createTicketCommentStart),
    call(updateTicketStart),
    call(getFilesStart),
    call(addTicketFileStart),
    call(removeTicketFileStart),
    call(changeTicketStatusStart),
  ]);
}

export default ticketsSaga;
