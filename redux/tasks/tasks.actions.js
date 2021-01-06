export const GET_TASKS_SUCCESS = 'GET_TASKS_SUCCESS';
export const GET_TASKS_START = 'GET_TASKS_START';
export const GET_CURRENT_TASK_START = 'GET_CURRENT_TASK_START';
export const GET_CURRENT_TASK_SUCCESS = 'GET_CURRENT_TASK_SUCCESS';
export const CREATE_TASK_COMMENT_START = 'CREATE_TASK_COMMENT_START';
export const CREATE_TASK_COMMENT_SUCCESS = 'CREATE_TASK_COMMENT_SUCCESS';
export const UPDATE_TASK_CHECKLIST_ITEM_START = 'UPDATE_TASK_CHECKLIST_ITEM_START';
export const UPDATE_TASK_CHECKLIST_ITEM_SUCCESS = 'UPDATE_TASK_CHECKLIST_ITEM_SUCCESS';
export const CHECKLIST_FAILURE = 'CHECKLIST_FAILURE';
export const NULLIFY = 'NULLIFY';
export const UPDATE_TASK_START = 'UPDATE_TASK_START';
export const UPDATE_TASK_SUCCESS = 'UPDATE_TASK_SUCCESS';
export const GET_TASK_FILES_START = 'GET_TASK_FILES_START';
export const GET_TASK_FILES_SUCCESS = 'GET_TASK_FILES_SUCCESS';

export const getTasksSuccess = (tasks) => ({
  type: GET_TASKS_SUCCESS,
  tasks,
});

export const getTasksStart = (token, filter) => ({
  type: GET_TASKS_START,
  token,
  filter,
});
export const getTaskFilesStart = (token, task_id) => ({
  type: GET_TASK_FILES_START,
  token,
  task_id,
});
export const getTaskFilesSuccess = (files) => ({
  type: GET_TASK_FILES_SUCCESS,
  files,
});
export const getCurrentTaskStart = (token, id) => ({
  type: GET_CURRENT_TASK_START,
  token,
  id,
});
export const getCurrentTaskSuccess = (task) => ({
  type: GET_CURRENT_TASK_SUCCESS,
  task,
});
export const createTaskCommentStart = ({ token, taskId, comment }) => ({
  type: CREATE_TASK_COMMENT_START,
  token,
  taskId,
  comment,
});
export const createTaskCommentSuccess = (comments) => ({
  type: CREATE_TASK_COMMENT_SUCCESS,
  comments,
});
export const updateTaskCheckListItemStart = ({
  token, taskTodoId, todoItemId, completed_at,
}) => ({
  type: UPDATE_TASK_CHECKLIST_ITEM_START,
  completed_at,
  token,
  taskTodoId,
  todoItemId,
});
export const updateTaskCheckListItemSuccess = (checkListItem) => ({
  type: UPDATE_TASK_CHECKLIST_ITEM_SUCCESS,
  checkListItem,
});

export const checkListFailure = () => ({
  type: CHECKLIST_FAILURE,
});

export const updateTaskStart = ({ token, body, id }) => ({
  type: UPDATE_TASK_START,
  token,
  id,
  body,
});
export const updateTaskSuccess = (updatedTask) => ({
  type: UPDATE_TASK_SUCCESS,
  updatedTask,
});

export const nullify = () => ({
  type: NULLIFY,
});
