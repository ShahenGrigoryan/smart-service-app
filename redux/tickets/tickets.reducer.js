import { Toast } from 'native-base';
import {
  CHECKLIST_FAILURE,
  CREATE_TICKET_COMMENT_SUCCESS, GET_CURRENT_TICKET_START,
  GET_CURRENT_TICKET_SUCCESS,
  GET_TICKETS_SUCCESS, NULLIFY,
  UPDATE_TICKET_CHECKLIST_ITEM_START,
  UPDATE_TICKET_CHECKLIST_ITEM_SUCCESS, UPDATE_TICKET_SUCCESS,
} from './tickets.actions';

const initialState = {
  items: [],
  current_ticket: {},
  loading: false,
  checkListLoading: false,
};

const ticketsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_TICKETS_SUCCESS: {
      return { ...state, items: action.tickets };
    }
    case GET_CURRENT_TICKET_SUCCESS: {
      return { ...state, current_ticket: action.ticket, loading: false };
    }
    case GET_CURRENT_TICKET_START: {
      return { ...state, loading: true };
    }
    case CREATE_TICKET_COMMENT_SUCCESS: {
      return {
        ...state,
        current_ticket:
            {
              ...state.current_ticket,
              comments: [...state.current_ticket.comments, action.comments],
            },
      };
    }
    case UPDATE_TICKET_CHECKLIST_ITEM_START: {
      return { ...state, checkListLoading: true };
    }
    case UPDATE_TICKET_CHECKLIST_ITEM_SUCCESS: {
      const { newCheckListItem, ticketTodoId, todoItemId } = action.checkListItem;
      const newTodos = state.current_ticket.ticket_todos.map((item) => item);
      for (let i = 0; i < newTodos.length; i++) {
        if (newTodos[i].id === ticketTodoId) {
          for (let j = 0; j < newTodos[i]?.ticket_todo_items?.length; j++) {
            if (newTodos[i].ticket_todo_items[j].id === todoItemId) {
              newTodos[i].ticket_todo_items[j] = newCheckListItem;
            }
          }
        }
      }
      return {
        ...state,
        current_ticket:
            {
              ...state.current_ticket,
              ticket_todos: newTodos,
            },
        checkListLoading: false,
      };
    }
    case UPDATE_TICKET_SUCCESS: {
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
        current_ticket: {},
        loading: false,
        checkListLoading: false,
      };
    }
    default: return state;
  }
};

export default ticketsReducer;
