import { Toast } from 'native-base';
import {
  CHECKLIST_FAILURE,
  CREATE_TASK_COMMENT_SUCCESS,
  GET_CURRENT_TASK_START,
  GET_CURRENT_TASK_SUCCESS, GET_TASK_FILES_SUCCESS, GET_TASKS_START,
  GET_TASKS_SUCCESS,
  NULLIFY,
  UPDATE_TASK_CHECKLIST_ITEM_SUCCESS,
  UPDATE_TASK_SUCCESS,
} from './tasks.actions';

const initialState = {
  items: [],
  current_task: {},
  loading: false,
  checkListLoading: false,
};

const tasksReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_TASKS_SUCCESS: {
      return { ...state, items: action.tasks };
    }
    case GET_CURRENT_TASK_SUCCESS: {
      return { ...state, current_task: action.task, loading: false };
    }
    case GET_CURRENT_TASK_START: {
      return { ...state, loading: true };
    }
    case CREATE_TASK_COMMENT_SUCCESS: {
      return {
        ...state,
        current_task:
            { ...state.current_task, comments: [...state.current_task.comments, action.comments] },
      };
    }
    case GET_TASK_FILES_SUCCESS: {
      console.log('files', action.files);
      return {
        ...state, current_task: { ...state.current_task, files: action.files },
      };
    }
    case GET_TASKS_START: {
      return { ...state, filter: action.filter };
    }
    case UPDATE_TASK_CHECKLIST_ITEM_SUCCESS: {
      const { newCheckListItem, taskTodoId, todoItemId } = action.checkListItem;
      const newTodos = state.current_task.task_todos.map((item) => item);
      for (let i = 0; i < newTodos.length; i++) {
        if (newTodos[i].id === taskTodoId) {
          for (let j = 0; j < newTodos[i]?.task_todo_items?.length; j++) {
            if (newTodos[i].task_todo_items[j].id === todoItemId) {
              newTodos[i].task_todo_items[j] = newCheckListItem;
            }
          }
        }
      }
      return {
        ...state,
        current_task: { ...state.current_task, task_todos: newTodos },
        checkListLoading: false,
      };
    }
    case UPDATE_TASK_SUCCESS: {
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
        current_task: {},
        loading: false,
        checkListLoading: false,
      };
    }
    default: return state;
  }
};

export default tasksReducer;
