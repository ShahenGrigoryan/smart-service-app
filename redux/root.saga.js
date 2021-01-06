import { all, call } from 'redux-saga/effects';
import loginSaga from './user/user.sagas';
import tasksSaga from './tasks/tasks.sagas';
import ticketsSaga from './tickets/tickets.sagas';
import checksSaga from './checks/checks.sagas';
import desktopSaga from './desktop/desktop.sagas';

export default function* rootSaga() {
  yield all([
    call(loginSaga), call(tasksSaga), call(ticketsSaga), call(checksSaga), call(desktopSaga)]);
}
