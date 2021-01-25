import { all, call } from 'redux-saga/effects';
import loginSaga from './user/user.sagas';
import tasksSaga from './tasks/tasks.sagas';
import ticketsSaga from './tickets/tickets.sagas';
import checksSaga from './checks/checks.sagas';
import desktopSaga from './desktop/desktop.sagas';
import queSaga from './files_que/files_que.saga';

export default function* rootSaga() {
  yield all([
    call(loginSaga),
    call(tasksSaga),
    call(ticketsSaga),
    call(checksSaga),
    call(desktopSaga),
    call(queSaga)]);
}
