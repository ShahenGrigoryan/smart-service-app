export const GET_CHECKS_SUCCESS = 'GET_CHECKS_SUCCESS';
export const GET_CHECKS_START = 'GET_CHECKS_START';
export const GET_CURRENT_CHECK_START = 'GET_CURRENT_CHECK_START';
export const GET_CURRENT_CHECK_SUCCESS = 'GET_CURRENT_CHECK_SUCCESS';
export const CREATE_CHECK_COMMENT_START = 'CREATE_CHECK_COMMENT_START';
export const CREATE_CHECK_COMMENT_SUCCESS = 'CREATE_CHECK_COMMENT_SUCCESS';
export const UPDATE_CHECK_CHECKLIST_ITEM_START = 'UPDATE_CHECK_CHECKLIST_ITEM_START';
export const UPDATE_CHECK_CHECKLIST_ITEM_SUCCESS = 'UPDATE_CHECKLIST_ITEM_SUCCESS';
export const CHECKLIST_FAILURE = 'CHECKLIST_FAILURE';
export const NULLIFY = 'NULLIFY';
export const UPDATE_CHECK_START = 'UPDATE_CHECK_START';
export const UPDATE_CHECK_SUCCESS = 'UPDATE_CHECK_SUCCESS';
export const GET_CHECK_FILES_START = 'GET_CHECK_FILES_START';
export const GET_CHECK_FILES_SUCCESS = 'GET_CHECK_FILES_SUCCESS';
export const ADD_CHECK_FILE_START = 'ADD_CHECK_FILE_START';
export const ADD_CHECK_FILE_SUCCESS = 'ADD_CHECK_FILE_SUCCESS';
export const REMOVE_CHECK_FILE_START = 'REMOVE_CHECK_FILE_START';
export const REMOVE_CHECK_FILE_SUCCESS = 'REMOVE_CHECK_FILE_SUCCESS';

export const getChecksSuccess = (checks) => ({
  type: GET_CHECKS_SUCCESS,
  checks,
});

export const getChecksStart = (token, filter) => ({
  type: GET_CHECKS_START,
  token,
  filter,
});
export const getCurrentCheckStart = (token, id) => ({
  type: GET_CURRENT_CHECK_START,
  token,
  id,
});
export const getCurrentCheckSuccess = (check) => ({
  type: GET_CURRENT_CHECK_SUCCESS,
  check,
});
export const createCheckCommentStart = ({ token, checkId, comment }) => ({
  type: CREATE_CHECK_COMMENT_START,
  token,
  checkId,
  comment,
});
export const createCheckCommentSuccess = (comments) => ({
  type: CREATE_CHECK_COMMENT_SUCCESS,
  comments,
});
export const updateCheckCheckListItemStart = ({
  token, checkTodoId, todoItemId, completed_at,
}) => ({
  type: UPDATE_CHECK_CHECKLIST_ITEM_START,
  completed_at,
  token,
  checkTodoId,
  todoItemId,
});
export const updateCheckCheckListItemSuccess = (checkListItem) => ({
  type: UPDATE_CHECK_CHECKLIST_ITEM_SUCCESS,
  checkListItem,
});

export const checkListFailure = () => ({
  type: CHECKLIST_FAILURE,
});

export const updateCheckStart = ({ token, body, id }) => ({
  type: UPDATE_CHECK_START,
  token,
  id,
  body,
});
export const updateCheckSuccess = (updatedCheck) => ({
  type: UPDATE_CHECK_START,
  updatedCheck,
});

export const nullify = () => ({
  type: NULLIFY,
});

export const addCheckFileStart = ({ file, checkId, token }) => ({
  type: ADD_CHECK_FILE_START,
  file,
  checkId,
  token,
});
export const addCheckFileSuccess = (file) => ({
  type: ADD_CHECK_FILE_SUCCESS,
  file,
});
export const removeCheckFileStart = ({ checkId, fileId, token }) => ({
  type: REMOVE_CHECK_FILE_START,
  fileId,
  checkId,
  token,
});
export const removeCheckFileSuccess = (fileId) => ({
  type: REMOVE_CHECK_FILE_SUCCESS,
  fileId,
});
export const getCheckFilesStart = (token, check_id) => ({
  type: GET_CHECK_FILES_START,
  token,
  check_id,
});
export const getCheckFilesSuccess = (files) => ({
  type: GET_CHECK_FILES_SUCCESS,
  files,
});
