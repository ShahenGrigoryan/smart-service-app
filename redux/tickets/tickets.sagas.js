import {
  put, takeLatest, all, call,
} from 'redux-saga/effects';
import * as Api from '../../api/tickets';
import * as TicketsActions from './tickets.actions';
import * as PageActions from '../pages/pages.actions';
import * as UserActions from '../user/user.actions';
import { updateTicketSuccess } from './tickets.actions';

function* getTickets({ token, filter }) {
  yield put(PageActions.startLoading());
  try {
    const tickets = yield Api.getTickets(token, filter?.params);
    yield put(TicketsActions.getTicketsSuccess(tickets.data.data));
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

function* getCurrentTicket({ token, id, filter }) {
  try {
    yield put(PageActions.startLoading());
    const currentTicket = yield Api.getCurrentTicket(token, id, filter?.params);
    yield put(TicketsActions.getCurrentTicketSuccess(currentTicket?.data?.data));
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

function* createTicketComment({ token, ticketId, comment }) {
  try {
    const newComment = yield Api.createTicketComment(token, ticketId, comment);
    yield put(TicketsActions.createTicketCommentSuccess(newComment.data.data));
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

function* updateTicket({ token, body, id }) {
  try {
    yield put(PageActions.startLoading());
    const updatedTicket = yield Api.updateTicket({ token, body, id });
    yield put(updateTicketSuccess({ data: updatedTicket.data.data, id }));
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

function* getTicketsStart() {
  yield takeLatest(TicketsActions.GET_TICKETS_START, getTickets);
}

function* getCurrentTicketStart() {
  yield takeLatest(TicketsActions.GET_CURRENT_TICKET_START, getCurrentTicket);
}
function* createTicketCommentStart() {
  yield takeLatest(TicketsActions.CREATE_TICKET_COMMENT_START, createTicketComment);
}
// function* updateCheckListItemStart() {
//   yield takeLatest(TicketsActions.UPDATE_CHECKLIST_ITEM_START, updateCheckListItem);
// }
function* updateTicketStart() {
  yield takeLatest(TicketsActions.UPDATE_TICKET_START, updateTicket);
}

function* ticketsSaga() {
  yield all([
    call(getTicketsStart),
    call(getCurrentTicketStart),
    call(createTicketCommentStart),
    call(updateTicketStart),
  ]);
}

export default ticketsSaga;
