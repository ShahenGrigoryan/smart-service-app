import { Toast } from 'native-base';
import {
  CHECKLIST_FAILURE,
  CREATE_CHECK_COMMENT_SUCCESS, GET_CURRENT_CHECK_START,
  GET_CURRENT_CHECK_SUCCESS,
  GET_CHECKS_SUCCESS, NULLIFY,
  UPDATE_CHECK_CHECKLIST_ITEM_START,
  UPDATE_CHECKLIST_ITEM_SUCCESS, UPDATE_CHECK_SUCCESS,
} from './checks.actions';

const initialState = {
  items: [],
  current_check: {},
  loading: false,
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
    case UPDATE_CHECKLIST_ITEM_SUCCESS: {
      const { newCheckListItem, checkTodoId, todoItemId } = action.checkListItem;
      const newTodos = [...state.current_check?.check_todos];
      for (let i = 0; i < newTodos.length; i++) {
        if (newTodos[i].id === checkTodoId) {
          for (let j = 0; j < newTodos[i]?.check_todo_items?.length; j++) {
            if (newTodos[i].check_todo_items[j].id === todoItemId) {
              newTodos[i].check_todo_items[j] = newCheckListItem;
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
    default: return state;
  }
};

export default checksReducer;
