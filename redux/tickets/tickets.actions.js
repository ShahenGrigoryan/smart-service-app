export const GET_TICKETS_SUCCESS = 'GET_TICKETS_SUCCESS';
export const GET_TICKETS_START = 'GET_TICKETS_START';
export const GET_CURRENT_TICKET_START = 'GET_CURRENT_TICKET_START';
export const GET_CURRENT_TICKET_SUCCESS = 'GET_CURRENT_TICKET_SUCCESS';
export const CREATE_TICKET_COMMENT_START = 'CREATE_TICKET_COMMENT_START';
export const CREATE_TICKET_COMMENT_SUCCESS = 'CREATE_TICKET_COMMENT_SUCCESS';
export const UPDATE_TICKET_CHECKLIST_ITEM_START = 'UPDATE_TICKET_CHECKLIST_ITEM_START';
export const UPDATE_TICKET_CHECKLIST_ITEM_SUCCESS = 'UPDATE_TICKET_CHECKLIST_ITEM_SUCCESS';
export const CHECKLIST_FAILURE = 'CHECKLIST_FAILURE';
export const NULLIFY = 'NULLIFY';
export const UPDATE_TICKET_START = 'UPDATE_TICKET_START';
export const UPDATE_TICKET_SUCCESS = 'UPDATE_TICKET_SUCCESS';

export const getTicketsSuccess = (tickets) => ({
  type: GET_TICKETS_SUCCESS,
  tickets,
});

export const getTicketsStart = (token, filter) => ({
  type: GET_TICKETS_START,
  token,
  filter,
});
export const getCurrentTicketStart = (token, id, filter) => ({
  type: GET_CURRENT_TICKET_START,
  token,
  id,
  filter,
});
export const getCurrentTicketSuccess = (ticket) => ({
  type: GET_CURRENT_TICKET_SUCCESS,
  ticket,
});
export const createTicketCommentStart = ({ token, ticketId, comment }) => ({
  type: CREATE_TICKET_COMMENT_START,
  token,
  ticketId,
  comment,
});
export const createTicketCommentSuccess = (comments) => ({
  type: CREATE_TICKET_COMMENT_SUCCESS,
  comments,
});
export const updateCheckListItemStart = ({
  token, ticketTodoId, todoItemId, completed_at,
}) => ({
  type: UPDATE_TICKET_CHECKLIST_ITEM_START,
  completed_at,
  token,
  ticketTodoId,
  todoItemId,
});
export const updateCheckListItemSuccess = (checkListItem) => ({
  type: UPDATE_TICKET_CHECKLIST_ITEM_SUCCESS,
  checkListItem,
});

export const checkListFailure = () => ({
  type: CHECKLIST_FAILURE,
});

export const updateTicketStart = ({ token, body, id }) => ({
  type: UPDATE_TICKET_START,
  token,
  id,
  body,
});
export const updateTicketSuccess = (updatedTicket) => ({
  type: UPDATE_TICKET_START,
  updatedTicket,
});

export const nullify = () => ({
  type: NULLIFY,
});
