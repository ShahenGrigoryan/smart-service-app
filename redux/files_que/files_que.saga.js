import {
  put, takeLatest, all, call,
} from 'redux-saga/effects';
import NetInfo from '@react-native-community/netinfo';
import * as PageActions from '../pages/pages.actions';
import * as UserActions from '../user/user.actions';
import { removeFileFromQue, UPLOAD_FILES_IN_QUE } from './files_que.reducer';
import { addTaskFileStart } from '../tasks/tasks.actions';
import { addTicketFileStart } from '../tickets/tickets.actions';
import { addCheckFileStart } from '../checks/checks.actions';

function* uploadFiles({ files_in_que, token }) {
  yield put(PageActions.startLoading());
  try {
    const { isConnected } = yield NetInfo.fetch();
    if (isConnected) {
      const sections = Object.keys(files_in_que);
      for (let i = 0; i < sections.length; i++) {
        for (let j = 0; j < files_in_que[sections[i]].length; j++) {
          switch (sections[i]) {
            case 'tasks': {
              const payload = { file: files_in_que[[sections[i]]][j]?.file, taskId: files_in_que[[sections[i]]][j].id, token };
              yield put(addTaskFileStart(payload));
              yield put(removeFileFromQue({ file: payload.file, section_name: 'tasks' }));
              break;
            }
            case 'tickets': {
              const payload = { file: files_in_que[[sections[i]]][j]?.file, ticketId: files_in_que[[sections[i]]][j].id, token };
              yield put(addTicketFileStart(payload));
              yield put(removeFileFromQue({ file: payload.file, section_name: 'tickets' }));
              break;
            }
            case 'entity_tasks': {
              const payload = { file: files_in_que[[sections[i]]][j]?.file, checkId: files_in_que[[sections[i]]][j].id, token };
              yield put(addCheckFileStart(payload));
              yield put(removeFileFromQue({ file: payload.file, section_name: 'entity_tasks' }));
              break;
            }
            default: {
              break;
            }
          }
        }
      }
    }
    yield put(PageActions.endLoading());
  } catch (e) {
    yield put(PageActions.endLoading());
    if (e?.response?.status === 401) {
      yield put(UserActions.loginFailure(e.message));
    } else {
      yield put(PageActions.pageFailure(`${e.message} adding file error`));
    }
  }
}

function* getFilesInQue() {
  yield takeLatest(UPLOAD_FILES_IN_QUE, uploadFiles);
}

function* queSaga() {
  yield all([
    call(getFilesInQue),
  ]);
}

export default queSaga;
