import { Toast } from 'native-base';
import {
  CHECKLIST_FAILURE,
  CREATE_CHECK_COMMENT_SUCCESS,
  GET_CURRENT_CHECK_START,
  GET_CURRENT_CHECK_SUCCESS,
  GET_CHECKS_SUCCESS,
  NULLIFY,
  UPDATE_CHECK_CHECKLIST_ITEM_START,
  UPDATE_CHECK_SUCCESS,
  ADD_CHECK_FILE_SUCCESS,
  REMOVE_CHECK_FILE_SUCCESS,
  GET_CHECK_FILES_SUCCESS, UPDATE_CHECK_CHECKLIST_ITEM_SUCCESS, CHANGE_CHECK_STATUS_SUCCESS,
} from './checks.actions';

const initialState = {
  items: [],
  current_check: {},
  loading: false,
  files_in_que: [],
  checkListLoading: false,
};

const checksReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CHECKS_SUCCESS: {
      return { ...state, items: action.checks };
    }
    case GET_CURRENT_CHECK_SUCCESS: {
      return { ...state, current_check: action.check, loading: false };
    }
    case GET_CURRENT_CHECK_START: {
      return { ...state, loading: true };
    }
    case CREATE_CHECK_COMMENT_SUCCESS: {
      return {
        ...state,
        current_check: {
          ...state.current_check,
          comments: [...state.current_check.comments, action.comments],
        },
      };
    }
    case UPDATE_CHECK_CHECKLIST_ITEM_START: {
      return { ...state, checkListLoading: true };
    }

    case UPDATE_CHECK_SUCCESS: {
      return { ...state };
    }
    case CHECKLIST_FAILURE: {
      Toast.show({
        text: 'Что-то пошло не так!', type: 'danger', position: 'top', textStyle: { textAlign: 'center' },
      });
      return { ...state, checkListLoading: false };
    }

    case NULLIFY: {
      return {
        items: [],
        current_check: {},
        loading: false,
        checkListLoading: false,
      };
    }

    case ADD_CHECK_FILE_SUCCESS: {
      Toast.show({
        text: 'Файл успешно добавлен!', type: 'success', position: 'top', style: { top: 30 }, textStyle: { textAlign: 'center' },
      });
      const newQueFiles = state?.files_in_que?.filter((item) => item.name !== action.file.name);
      return { ...state, files_in_que: newQueFiles };
    }
    case REMOVE_CHECK_FILE_SUCCESS: {
      Toast.show({
        text: 'Файл успешно удален!', type: 'success', position: 'top', style: { top: 30 }, textStyle: { textAlign: 'center' },
      });
      const newFiles = state.current_check?.files?.filter((item) => item.id !== action.fileId);
      return { ...state, current_check: { ...state.current_check, files: newFiles } };
    }
    case UPDATE_CHECK_CHECKLIST_ITEM_SUCCESS: {
      const { newCheckListItem, checkTodoId, todoItemId } = action.checkListItem;
      const newTodos = state?.current_check?.entity_task_todos?.map((item) => item);
      for (let i = 0; i < newTodos.length; i++) {
        if (newTodos[i].id === checkTodoId) {
          for (let j = 0; j < newTodos[i]?.entity_task_todo_items?.length; j++) {
            if (newTodos[i].entity_task_todo_items[j].id === todoItemId) {
              newTodos[i].entity_task_todo_items[j] = newCheckListItem;
            }
          }
        }
      }
      return {
        ...state,
        current_check: { ...state.current_check, entity_task_todos: newTodos },
        checkListLoading: false,
      };
    }
    case CHANGE_CHECK_STATUS_SUCCESS: {
      const { newStatus, checkId } = action;
      const newChecks = state?.items
        ?.map((item) => (item.id !== checkId ? item : { ...item, status: newStatus }));
      const newCurrentTicket = newChecks
        .filter((item) => item.id === state.current_check?.id)?.[0] ?? state.current_check;
      return { ...state, items: newChecks, current_check: newCurrentTicket };
    }
    case GET_CHECK_FILES_SUCCESS: {
      return {
        ...state, current_check: { ...state.current_check, files: action.files },
      };
    }
    default: return state;
  }
};

export default checksReducer;
