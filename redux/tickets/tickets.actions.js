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
export const GET_TICKET_FILES_START = 'GET_TICKET_FILES_START';
export const GET_TICKET_FILES_SUCCESS = 'GET_TICKET_FILES_SUCCESS';
export const ADD_TICKET_FILE_START = 'ADD_TICKET_FILE_START';
export const ADD_TICKET_FILE_SUCCESS = 'ADD_TICKET_FILE_SUCCESS';
export const REMOVE_TICKET_FILE_START = 'REMOVE_TICKET_FILE_START';
export const REMOVE_TICKET_FILE_SUCCESS = 'REMOVE_TICKET_FILE_SUCCESS';
export const CHANGE_TICKET_STATUS_START = 'CHANGE_TICKET_STATUS_START';
export const CHANGE_TICKET_STATUS_SUCCESS = 'CHANGE_TICKET_STATUS_SUCCESS';

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

export const addTicketFileStart = ({ file, ticketId, token }) => ({
  type: ADD_TICKET_FILE_START,
  file,
  ticketId,
  token,
});
export const addTicketFileSuccess = (file) => ({
  type: ADD_TICKET_FILE_SUCCESS,
  file,
});
export const removeTicketFileStart = ({ ticketId, fileId, token }) => ({
  type: REMOVE_TICKET_FILE_START,
  fileId,
  ticketId,
  token,
});
export const removeTicketFileSuccess = (fileId) => ({
  type: REMOVE_TICKET_FILE_SUCCESS,
  fileId,
});
export const getTicketFilesStart = (token, ticket_id) => ({
  type: GET_TICKET_FILES_START,
  token,
  ticket_id,
});
export const getTicketFilesSuccess = (files) => ({
  type: GET_TICKET_FILES_SUCCESS,
  files,
});
export const changeTicketStatusStart = ({
  token,
  ticketId,
  status,
}) => ({
  type: CHANGE_TICKET_STATUS_START,
  token,
  ticketId,
  status,
});
export const changeTicketStatusSuccess = ({
  ticketId,
  statuses,
  newStatus,
}) => ({
  type: CHANGE_TICKET_STATUS_SUCCESS,
  ticketId,
  statuses,
  newStatus,
});
